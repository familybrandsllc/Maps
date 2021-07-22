var map;window.onload=function(){};var infoWindow,markers=[];const image="https://cdn.jsdelivr.net/gh/familybrandsllc/Maps@main/Markers/ElmHIll_pin2.png";var clus=0;function initMap(){map=new google.maps.Map(document.getElementById("map"),{center:{lat:35.904038,lng:-83.956548},zoom:5,mapId:"abdbe66e943379c5",streetViewControl:!1,mapTypeControl:!1,fullscreenControl:!1}),infoWindow=new google.maps.InfoWindow,searchStores(),hideSearchDiv(),document.getElementById("noStores").classList.add("hide")}function hideSearchDiv(){document.getElementById("searchDiv").classList.add("shrink")}function showSearchDiv(){document.getElementById("searchDiv").classList.remove("shrink")}function showNoStoresMessage(){document.getElementById("noStores").classList.remove("hide")}function hideNoStoresMessage(){setTimeout(function(){document.getElementById("noStores").classList.add("hide")},2700)}function clusterStores(){mcOptions={maxZoom:9,styles:[{height:40,url:"https://cdn.jsdelivr.net/gh/familybrandsllc/Maps@main/Markers/m1111.png",width:40,anchorText:[8,0],textSize:22,textColor:"#000000",fontWeight:"bold",maxZoom:14},{height:48,url:"https://cdn.jsdelivr.net/gh/familybrandsllc/Maps@main/Markers/m2222.png",width:48,anchorText:[12,0],textSize:22,textColor:"#ffffff",fontWeight:"bold"},{height:56,url:"https://cdn.jsdelivr.net/gh/familybrandsllc/Maps@main/Markers/m3333.png",width:56,anchorText:[16,0],textSize:20,textColor:"#ffffff",fontWeight:"bold"},{height:80,url:"https://cdn.jsdelivr.net/gh/familybrandsllc/Maps@main/Markers/m4444.png",width:80,anchorText:[28,0],textSize:22,textColor:"#ffffff",fontWeight:"bold"},{height:90,url:"https://cdn.jsdelivr.net/gh/familybrandsllc/Maps@main/Markers/m5555.png",width:90,anchorText:[34,0],textSize:22,textColor:"#ffffff",fontWeight:"bold"}]};var e=new MarkerClusterer(map,markers,mcOptions);1==clus&&e.clearMarkers(),clus=1}function clearCluster(){clus=1,clusterStores()}function newSearch(){searchStores(document.getElementById("zip-code-input").value=""),document.querySelector(".stores-list").innerHTML=null}function searchStores(){var e=[],t=document.getElementById("zip-code-input").value,n=99;if(hideSearchDiv(),t){for(var o of(n=0,stores))o.properties.Zip==t&&(e.push(o),n++);0==n?(e=stores,showSearchDiv(),document.getElementById("zip-code-input").value="",showNoStoresMessage(),hideNoStoresMessage()):(displayStores(e.slice(0,60)),showSearchDiv(),document.getElementById("zip-code-input").value="")}else e=stores;document.getElementById("zip-code-input").value="",clearLocations(),showStoresMarkers(e),setOnClickListener(),clusterStores()}function clearLocations(){infoWindow.close();for(var e=0;e<markers.length;e++)markers[e].setMap(null);markers=[]}function setOnClickListener(){document.querySelectorAll(".store-container").forEach(function(e,t){e.addEventListener("click",function(){console.log("list Clicked"),new google.maps.event.trigger(markers[t],"click")})})}function displayStores(e){var t="";for(var[n,o]of e.entries()){var s=o.properties.Name,r=o.properties.Street,i=o.properties.City,a=o.properties.State,c=o.properties.Zip;t+=`\n            <a href="${"https://www.google.com/maps/search/?api=1&query="+new google.maps.LatLng(o.geometry.coordinates[1],o.geometry.coordinates[0])}" target="_blank" class="store-container">\n            \n              <div class="store-container-background">\n                <div class="store-info-container">\n                \t<div class="store-info-name">\n          \t\t\t\t\t${s}\n        \t\t\t\t\t</div>\n                  <div class="store-address">\n                    <span>${r}</span>\n                    <span>${i}, ${a} ${c}</span>\n                  </div>\n               \t</div>\n              </div>\n            \n            </a>\n    `,document.querySelector(".stores-list").innerHTML=t}}function showStoresMarkers(e){var t=new google.maps.LatLngBounds;for(var[n,o]of e.entries()){var s=new google.maps.LatLng(o.geometry.coordinates[1],o.geometry.coordinates[0]),r=o.properties.Name,i=o.properties.Street,a=o.properties.City,c=o.properties.State,l=o.properties.Zip;t.extend(s),createMarker(s,r,i,a,c,l)}e.length<2?(map.setZoom(10),map.setCenter(s)):map.fitBounds(t)}function createMarker(e,t,n,o,s,r){var i=`\n      <div class="store-info-window">\n        <div class="store-info-name">\n          ${t}\n        </div>\n       \t\t\n        <div class="store-info-address">\n          ${n}\n        </div>\n        <div class="store-info-address">\n          ${o}, ${s} ${r}\n        </div>\n        \t\t<a href="${"https://www.google.com/maps/search/?api=1&query="+e}" target="_blank" class="circle">\n        \t\t\t\n            \t\t\t<i class="fas fa-location-arrow"></i>\n          \t\t\n            </a>  \n      </div>\n  \t`,a=new google.maps.Marker({icon:image,map:map,position:e,animation:google.maps.Animation.DROP});google.maps.event.addListener(a,"click",function(){infoWindow.setContent(i),infoWindow.open(map,a)}),google.maps.event.addListener(map,"click",function(){infoWindow.close()}),markers.push(a)}document.getElementById("zip-code-input").onkeydown=function(e){13==e.keyCode&&searchStores(document.getElementById("zip-code-input").value)};var intervalId=window.setInterval(function(){0==markers.length&&searchStores(document.getElementById("zip-code-input").value="")},2e3);