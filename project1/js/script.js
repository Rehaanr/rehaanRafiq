var mymap = L.map('mapid').setView([52.3555, 1.1743], 5);

var Stadia_OSMBright = L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(mymap);

var polygon = L.polygon([
    [55.3781, 3.4360],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(mymap);