// initial map attributes
var Coords = [10, 10];
var mapZoomLevel = 3;

// initializes map
var myMap = L.map("map-id", {
    center: Coords,
    zoom: mapZoomLevel
  });

// Create the tile layer that will be the background of our map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: mapZoomLevel,
    id: "mapbox.streets",
    accessToken: API_KEY
    }).addTo(myMap);

// url link to USGS earthquake data (all month) 
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

// Get request to query the url
d3.json(url, function(response) {
    var earthquakeFeatures = response.features;
    console.log(earthquakeFeatures[0]);
    // Initialize an array to hold earthquake markers
    var earthquakeMarkers = [];
    // Loop through the array
    for (var i = 0; i < earthquakeFeatures.length; i++) {  
    // For each event, create a marker and bind a popup with the name
        earthquakeMarkers.push(
        L.marker([earthquakeFeatures[i].geometry.coordinates[1], earthquakeFeatures[i].geometry.coordinates[0]]).bindPopup("<h1>" + "Location: " + earthquakeFeatures[i].properties.place + "<br>" + "Magnitude: " + earthquakeFeatures[i].properties.mag + "</h1>").addTo(myMap)
        );
    }
})


