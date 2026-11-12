# Uncle Ray's — Add a Store Location

This uses **GitHub Actions only**. No GitHub Pages, Cloudflare, paid API, or GitHub personal access token required.

## Install (once)

In the `familybrandsllc/Maps` repository on the `main` branch, add these two files **at the exact paths**:

- `.github/workflows/add-store-location.yml`
- `scripts/add_store.py`

Use **Add file → Create new file** on GitHub and paste the contents, including the folder names as part of the new file name. Commit both to `main`.

If commits fail with a permissions error, check **Settings → Actions → General → Workflow permissions**. Organization policy may restrict write permissions for `GITHUB_TOKEN`.

## Add a store

1. Open the repo's **Actions** tab.
2. Click **Add Store Location** on the left.
3. Click **Run workflow** (choose branch **main**).
4. Fill in the required **Store name**, **Full address** and **ZIP code**. **Phone** is optional.
5. For accurate storefront coordinates, search the address in [Google Maps](https://www.google.com/maps/search/?api=1), right-click the pin and click the coordinates at the top of the context menu to copy them. Paste directly into the single **Coordinates** field as `44.68246710996858, -104.60100879999999`. Or leave the field blank for automatic US Census lookup. The workflow automatically splits the pasted value and writes GeoJSON in **[longitude, latitude]** order.
6. Click the green **Run workflow** button.
7. Open the run to verify success. The workflow commits the new store to `Maps Data/UR-Locations-13.js`.

The existing website loads the updated JS file from jsDelivr after the CDN cache refreshes.

## Notes

- The geocoder is the free **US Census Geocoder**, which does not require an API key. It may fail for new, rural, or incomplete addresses; the workflow then stops without changing anything. You can retry using manual coordinates.
- The geocoder estimates a position for an address; inspect the coordinates when precise storefront placement is important.
- A matching normalized address and ZIP is rejected to avoid accidental duplicates.
- The script validates the existing JSON array and the resulting JSON array before writing.
- The workflow must be present on the default branch for the manual Run workflow button to appear.
- No arbitrary file upload is supported: each run adds exactly one Feature.

## Google Maps link limitation

The GitHub Actions form is static: it cannot turn the typed address into a clickable search URL before submission. Open Google Maps separately, or paste the address into its search bar. A custom GitHub Pages form would be needed for a live address-specific Google Maps link.
