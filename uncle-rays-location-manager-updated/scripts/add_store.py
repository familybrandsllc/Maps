#!/usr/bin/env python3
"""Safely append exactly one GeoJSON Feature to the existing JS stores array."""

import json
import math
import os
import re
import sys
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import Request, urlopen

DATA_FILE = Path('Maps Data/UR-Locations-13.js')
JS_PREFIX = re.compile(r'^\s*(?:let|var|const)\s+stores\s*=\s*', re.DOTALL)


def fail(message):
    print(f'ERROR: {message}', file=sys.stderr)
    raise SystemExit(1)


def required_env(key):
    value = os.getenv(key, '').strip()
    if not value:
        fail(f'{key} is required.')
    return value


def parse_coordinate(text, label, low, high):
    try:
        num = float(text)
    except ValueError:
        fail(f'{label} must be a number.')
    if not math.isfinite(num) or not low <= num <= high:
        fail(f'{label} must be between {low} and {high}.')
    return round(num, 7)


def geocode(address):
    # Free US Census Geocoder; no API key needed. It may not resolve rural/new addresses.
    endpoint = 'https://geocoding.geo.census.gov/geocoder/locations/onelineaddress'
    params = urlencode({'address': address, 'benchmark': 'Public_AR_Current', 'format': 'json'})
    request = Request(f'{endpoint}?{params}', headers={'User-Agent': 'UncleRaysLocationManager/1.0'})
    try:
        with urlopen(request, timeout=25) as response:
            data = json.load(response)
    except (HTTPError, URLError, TimeoutError, ValueError) as exc:
        fail(f'Address lookup failed ({exc}). Re-run and paste Google Maps coordinates.')
    matches = data.get('result', {}).get('addressMatches', [])
    if not matches:
        fail('Address was not found by the US Census geocoder. Verify address or re-run with Google Maps coordinates.')
    if len(matches) > 1:
        fail('Address lookup returned multiple matches. Re-run with Google Maps coordinates for accuracy.')
    match = matches[0]
    coords = match.get('coordinates') or {}
    lat = parse_coordinate(str(coords.get('y', '')), 'Latitude', -90, 90)
    lon = parse_coordinate(str(coords.get('x', '')), 'Longitude', -180, 180)
    print(f'Geocoded to: {match.get("matchedAddress", address)}')
    print(f'Coordinates: latitude={lat}, longitude={lon}')
    return lon, lat


def key(value):
    return re.sub(r'[^a-z0-9]', '', value.casefold())


def main():
    name = required_env('STORE_NAME')
    address = required_env('STORE_ADDRESS')
    zipcode = required_env('STORE_ZIP')
    phone = os.getenv('STORE_PHONE', '').strip()
    coordinates_input = os.getenv('STORE_COORDINATES', '').strip()
    if len(zipcode) not in (5, 10) or not re.fullmatch(r'\d{5}(?:-\d{4})?', zipcode):
        fail('ZIP must be 5 digits or ZIP+4 (e.g. 65803 or 65803-1234).')

    if not DATA_FILE.is_file():
        fail(f'Cannot find {DATA_FILE}. Check repository path.')
    content = DATA_FILE.read_text(encoding='utf-8-sig')
    prefix = JS_PREFIX.match(content)
    if prefix is None:
        fail('Unexpected JavaScript format: expected let stores = [...]. No changes made.')
    # File is JavaScript holding a JSON array, rather than an actual .geojson file.
    array_text = content[prefix.end():].strip()
    if array_text.endswith(';'):
        array_text = array_text[:-1].rstrip()
    try:
        existing = json.loads(array_text)
    except json.JSONDecodeError as exc:
        fail(f'Existing data is not valid JSON: {exc}. No changes made.')
    if not isinstance(existing, list):
        fail('Expected stores to be a JSON array.')

    for feature in existing:
        props = feature.get('properties', {}) if isinstance(feature, dict) else {}
        # Same address + ZIP is considered a duplicate even if the store name differs.
        if key(str(props.get('Address', ''))) == key(address) and key(str(props.get('Zip', ''))) == key(zipcode):
            fail(f'Duplicate address already exists: {props.get("Name", "unnamed store")} — {props.get("Address", "")}')

    if coordinates_input:
        parts = [part.strip() for part in coordinates_input.split(',')]
        if len(parts) != 2 or not all(parts):
            fail('Coordinates must be pasted as latitude, longitude (example: 44.682467, -104.601009).')
        lat = parse_coordinate(parts[0], 'Latitude', -90, 90)
        lon = parse_coordinate(parts[1], 'Longitude', -180, 180)
        print('Using manually provided Google Maps coordinates (latitude, longitude).')
    else:
        lon, lat = geocode(address)

    feature = {
        'type': 'Feature',
        'geometry': {'type': 'Point', 'coordinates': [lon, lat]},
        'properties': {'Name': name, 'Phone': phone, 'Address': address, 'Zip': zipcode},
    }

    # Insert immediately before the final closing bracket, preserving everything else.
    tail = re.search(r'\]\s*;?\s*$', content)
    if tail is None:
        fail('Could not find end of stores array; no changes made.')
    before = content[:tail.start()].rstrip()
    after = content[tail.start():]
    if not before.endswith('[') and not before.endswith('}'):
        fail('Unexpected content before end of array; no changes made.')
    pretty_feature = json.dumps(feature, ensure_ascii=False, indent=2)
    spacer = ',\n  ' if existing else '\n  '
    updated = before + spacer + pretty_feature.replace('\n', '\n  ') + '\n' + after
    # Validate the complete resulting JS data before changing the file.
    new_prefix = JS_PREFIX.match(updated)
    candidate = updated[new_prefix.end():].strip().rstrip(';').rstrip()
    try:
        parsed = json.loads(candidate)
    except json.JSONDecodeError as exc:
        fail(f'Generated data validation failed ({exc}). No changes made.')
    if len(parsed) != len(existing) + 1:
        fail('Generated data unexpectedly altered the number of records.')

    DATA_FILE.write_text(updated, encoding='utf-8')
    print(f'SUCCESS: Added {name} in {zipcode}. Total stores: {len(parsed)}.')
    print('Changes are ready for Git commit.')


if __name__ == '__main__':
    main()
