window.onload 		= function() {}
//this variable is needed for the google map
var 	map;
//this variable is needed for everything map related
var 	markers 		= [];
//this variable is for making the info windows
var 	infoWindow;
//this image is used or the pins
const image 			="https://cdn.jsdelivr.net/gh/familybrandsllc/Maps@main/Markers/Local%20Market%20Pin.png";
//this variable is to prevent the cluster from redrawing itself over and over. see below
var 	clus 				= 0;
//
//
//
//
//Initializes the map. this is where you can create the map, center the map, and style the map to your choosing
function initMap()
{
		//create variable Home to use varable as map center
    var home = {lat: 35.904038, lng: -83.956548 };
    //this places the map in the div id in your HTML called "map"
    map = new google.maps.Map(document.getElementById("map"),
    	{
          //center the map in the "home" variable created above
          center: home,
          //sets the zoom level to 5 to display large area. Smaller numbers are further away
          zoom: 5,
          //this sets the map base layer to display as roads. You can change the maptype to 
          mapId: 'e4c443e4c7c0441a',
          //this disables the street view drag and drop for the end user
          streetViewControl: false,
          //this disables the map type options button for the end user
          mapTypeControl: false,
          //this disables the button allowing them to enter full screen mode, since this will not allow them to search for stores
          fullscreenControl: false,
    	}
    );
    //initialize the infoWindow
    infoWindow = new google.maps.InfoWindow();
    //run the search stores function to give the user data without them interracting with the map
    searchStores(); 
    //run the function to hide the search again button
    hideSearchDiv();
    //run the function to hide the no stores message. can not use the function because there is a delay
    document.getElementById("noStores").classList.add('hide');
    
}
//
//
//
//
//this function shows the new search button
function hideSearchDiv() 
{
	//add the shrink class to make it disappear
  document.getElementById("searchDiv").classList.add('shrink');
}
//
//
//
//
//this function hides the new search button
function showSearchDiv() 
{
	//remove the shrink class to make it appear
  document.getElementById("searchDiv").classList.remove('shrink');
}
//
//
//
//
//This function shows the "no stores found" message
function showNoStoresMessage() 
{
	//remove the hide class to make it appear
  document.getElementById("noStores").classList.remove('hide');
}
//
//
//
//
//this function hides the "no stores found" Message
function hideNoStoresMessage() 
{
	//wait 2700 miliseconds to add the hide class to make it disappear
  setTimeout(function() { document.getElementById("noStores").classList.add('hide'); }, 2700);
}
//
//
//
//
//this function is to create the cluster icons

//
//
//
//


//
//
//
//
//clearn the search box and return to all locations
function newSearch ()
{
	//create zip code variable that is empty and also empties the search container
	var noZip = document.getElementById('zip-code-input').value = '';
  //search stores with the zip code created above (empty value)
	searchStores(noZip);
  document.querySelector('.stores-list').innerHTML = null;
  
}
//
//
//
//
//this function is to let the search store function run when the enter key is pressed
//take what is in the zip-code-input box and do something when variable e is pressed
document.getElementById('zip-code-input').onkeydown = function(e){
		//if variable e is key number 13 (the key of the enter button)
   	if(e.keyCode == 13){
    	//create variable ziCode from the pressed enter button and what is in zip-code-input
     	var zipCode = document.getElementById('zip-code-input').value;
      //run the searchStores function with the zip code input
     	searchStores(zipCode);
   	}
};
//
//
//
//
function searchStores()
{
	//creates array to hold the stores that match the user input
  var foundStores = [];
  //this variable takes in the user input from the zip-code-input search box
  var zipCode = document.getElementById('zip-code-input').value;
  //sets the check value to greater than one to know when there is no search input
  var check = 99;
  //hide the button to search Stores
  hideSearchDiv();
  //check if the zip code input matches any of the store's zip codes
  if(zipCode)
    { 
    	//this sets the number to 0 to differentiate and empty search 
    	check = 0;
    	//checking each store value in the stores array
      for (var store of stores)
      {
     		//creates postal variable that contains the Zip value in the geoJSON
        var postal = store['properties']['Zip'];
        //check to see if the user input matches the geoJSON zip code
        if(postal == zipCode)
        {
        	//pushes the matched stores to the "foundStores" array
          foundStores.push(store);
          check ++; 
       	}
    	}
      //run this if statemtnt to check if the zip code input matches any of your zip codes
      //if the variable "check" equals zero then no searches were complete in the above FOR loop
      //therefor, run the following
      if(check == 0)
      {	
      	foundStores = stores;
        //displayStores(foundStores.slice(0, 60));
        showSearchDiv();
        var noZip = document.getElementById('zip-code-input').value = '';
        showNoStoresMessage();
        hideNoStoresMessage();

      }
      //if the "check" variable is anything other than 0, then there was at least 1 complete search and run the following
      else
      {
      	displayStores(foundStores.slice(0, 60));
        showSearchDiv();
        var noZip = document.getElementById('zip-code-input').value = '';
        
      	//this just continues on to after the following else statement to display FoundStores
      }
    }
    //if no stores in search box (shoud be run as clear stores button)
    else    
    {
    	//sets the found stores array equal to the stores array
      foundStores = stores;
		}
    var noZip = document.getElementById('zip-code-input').value = '';
  	clearLocations();
  	//to increase laod speeds, the list is limited to the top 100 locations in the list
  	//displayStores(foundStores.slice(0, 60));
    //display all of the markers in the foundStores variable
  	showStoresMarkers(foundStores);
  	setOnClickListener();  
}
//
//
//
//
//clears the store locations so that now windows or markers ar dislayed after the search
function clearLocations()
{
		
   infoWindow.close();
    		//loop through each of the markers in the "markers" array and preform the following function
        for (var i = 0; i < markers.length; i++)
        {
        		//clears each element from the map in the "markers" array created at the top
            markers[i].setMap(null);
        }
    //this empties the markers array creeated at the top
    markers = [];
}
//
//
//
//
//this function is to make the stores in the store list container clickable, and if you click it, the store inforation with 
//the respective marker will pop up
function setOnClickListener()
{
		//if clicks the "store-container"
    var storeElements = document.querySelectorAll('.store-container');
    //selects the respective store you are clicking in the container so that it can reference the marker click function
    storeElements.forEach(function(element, index)
    {
    		//if the store container is clicked, then do the following
        element.addEventListener('click', function()
        {
        console.log("list Clicked");
        //pass the above parameters into a function as if you clicked a google maps marker
        //by passing the above variables into the below function
        new google.maps.event.trigger(markers[index], 'click');
        }                       
        												)
    }                   
    										)
}
//
//
//
//
//this function is where the stores are displayed in the "store container"
function displayStores(stores)
{
    var storesHtml ='';
    //this function will loop through create a variable called storesHtml with information from the array you are importing
    //make sure that if you add any more data to be displayed here, that there is a class created to be styled
    for(var [index, store] of stores.entries())
    {
    		//add variables used in the store information div
        //very easy to reverse engineer
        var name = store['properties']['Name'];
        var street = store['properties']['Street'];
        var city = store['properties']['City'];
        var state = store['properties']['State'];
        var zip = store['properties']['Zip'];
        var latlng = new google.maps.LatLng(store["geometry"]['coordinates'][1],store["geometry"]['coordinates'][0]);
        //this variable is to create a link for the HREF in the stores list container
        var divLink = "https://www.google.com/maps/search/?api=1&query="+latlng;
        //if you would like to create a number that coordinates with option numbers on the map markers, use the variable <<see Below>>
        //${index+1} 
        //as the store number and it will coordinate with the optional marker numbers.
        //see the showStoreMarkers() and createMarker() functions comments for more on this.
        //console.log("Display Stores function run");
        storesHtml += `
            <a href="${divLink}" target="_blank" class="store-container">
            
              <div class="store-container-background">
                <div class="store-info-container">
                	<div class="store-info-name">
          					${name}
        					</div>
                  <div class="store-address">
                    <span>${street}</span>
                    <span>${city}, ${state} ${zip}</span>
                  </div>
               	</div>
              </div>
            
            </a>
    `
    //this places the above variables created within the "stores-list"in the HTML
    document.querySelector('.stores-list').innerHTML = storesHtml;
    }
}
//
//
//
//
//this function is where all of the variables and markers are created for each object
function showStoresMarkers(stores)
{
		//console.log("Start Loading Markers");
    var bounds = new google.maps.LatLngBounds();
    for(var [index, store] of stores.entries())
    {
    		//createsthe latlng variable used for positioning the marker
        var latlng = new google.maps.LatLng(store["geometry"]['coordinates'][1],store["geometry"]['coordinates'][0]);
        //creates all of the variables needed to fill in the information
        var name = store['properties']['Name'];
        var street = store['properties']['Street'];
        var city = store['properties']['City'];
        var state = store['properties']['State'];
        var zip = store['properties']['Zip'];
        //extends the bounds of the map to contain the object
        bounds.extend(latlng);
        //pass all the variables to the marker and created the marker with the createMarker function
        //if you would like the store to have a number on the marker that coordinates with the stores in the store list <<next line>>
        //insert "index+1" to the end of the function parameters <<example Below>>
        //createMarker(latlng, name, street, city, state, zip, index+1)
        createMarker(latlng, name, street, city, state, zip)
    }
  		
      //make sure that when there is only one location, that the map does not zoom in too close
      //when using map.fitBounds(bounds);
      //when stores is less than 2 (or equal to one)
    	if (stores.length < 2)
    	{
      		//make the maps zoom to 10
    	  	map.setZoom(10);
          //set the center to the only point in latlng because if the length of the array is one, you only have one value to work with
          map.setCenter(latlng);
    	}
      //if there is more than one location in the array passed by the search function
    	else
    	{	
      		//fit the map bounds to contain the points passed in the array for searching for stores
    			map.fitBounds(bounds);
    	}
     
}
//
//
//
//
//this function makes the markers on the map, along with their respective info windows for the windows that pop up on click
//if you would like the markers to have a number coordinating with the stores loaded, add "index" at the end of the function parameters <<see Below>>
//EXAMPLE----- function createMarker(latlng, name, street, city, state, zip, index)
function createMarker(latlng, name, street, city, state, zip)
	{
  	//this variable is t create an HREF link for the infoWindow
  	var link = "https://www.google.com/maps/search/?api=1&query="+latlng;
	
		//this created a variable called html to show the information you would like the user to see upon clicking on the marker. 
  	//this can be styled in the stylesheet as well
  	var html = `
      <div class="store-info-window">
        <div class="store-infoWindow-name">
          ${name}
        </div>
       		
        <div class="store-info-address">
          ${street}
        </div>
        <div class="store-info-address">
          ${city}, ${state} ${zip}
        </div>
        		<a href="${link}" target="_blank" class="circle">
        			
            			<i class="fas fa-location-arrow"></i>
          		
            </a>  
      </div>
  	`
  	//this created the google maps marker with the information provided by the array
		var marker = new google.maps.Marker(
    {				
    	icon: image,
    	//this placed the marker in the map called "map"
			map: map,
			//this sets the position of the marker to the "latlng" variable in the array
			position: latlng,
      animation : google.maps.Animation.DROP
    }
		);

		//this is to allow the info window to pop up upon clicking on the marker on the map
		google.maps.event.addListener(marker, 'click', function()
		{
			//this created the info window with the information provided by the "html" variable created above
			infoWindow.setContent(html);
			//uppon clicking, this opens the info window with the information in the "marker" variable
			infoWindow.open(map, marker);
		}
		);
		//this is so that when the user clicks outside of the marker with the infoWindow open, the info window closes
		google.maps.event.addListener(map, 'click', function() 
		{
			//if the map is clicked, close the open info window.
			infoWindow.close();
		}
		);
    //this places the marker created above into the "markers" array created at the top of the page
    //using this array will help implement the clustering function provided by google.
    markers.push(marker);
}
//
//
//
//
//this is to check and make sure that there are markers on the map
var intervalId = window.setInterval(function()
	{
  	if (markers.length == 0)
  	{
  		var noZip = document.getElementById('zip-code-input').value = '';
  		//search stores with the zip code created above (empty value) to refresh page
			searchStores(noZip);
  	}
  	//if there are markers there, then
  	else
  		{
  			//do nothing
  		}
	}, 
2000);
