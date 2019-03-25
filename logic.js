// initial map attributes
var Coords = [40, -100];
var mapZoomLevel = 4;

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

// Function to determine circle size based on magnitude
function circleSize(m) {
    return m * 13000;
  }

// Function to determine circle color based on magnitude
function circleColor(m2) {
    return m2 > 5 ? '#db1200' :
           m2 > 4  ? '#db5300' :
           m2 > 3  ? '#db9200' :
           m2 > 2  ? '#dbcc00' :
           m2 > 1   ? '#c1db00' :
                      '#57db00';
}


// Get request to query the url
d3.json(url, function(response) {
    var earthquakeFeatures = response.features;
    console.log(earthquakeFeatures[0]);
    // Initialize an array to hold earthquake markers
    var earthquakeMarkers = [];
    // Loop through the array
    for (var i = 0; i < earthquakeFeatures.length; i++) {  
    // For each event, create a marker and bind a popup with the name
        var mag = earthquakeFeatures[i].properties.mag;
        earthquakeMarkers.push(
        L.circle([earthquakeFeatures[i].geometry.coordinates[1], earthquakeFeatures[i].geometry.coordinates[0]],{
            color: 'black',
            fillColor: circleColor(mag),
            weight: 1,
            opacity: 1,
            fillOpacity: .7,
            radius: circleSize(mag)
        })
        .bindPopup("<h1>" + "Location: " + earthquakeFeatures[i].properties.place + "<br>" + "Magnitude: " + mag + "</h1>").addTo(myMap)
        );
    }
})

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (myMap) {

    var div = L.DomUtil.create('div', 'info legend'),
        magnitude = [0, 1, 2, 3, 4, 5],
        labels = [];

    for (var i = 0; i < magnitude.length; i++) {
        div.innerHTML +=
            '<i style="background:' + circleColor(magnitude[i] + 1) + '"></i> ' +
            magnitude[i] + (magnitude[i + 1] ? '&ndash;' + magnitude[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(myMap);