var gstreets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: 'google'
});

var nearbyshops_style = {
    fillColor: '#FF8C00',
    weight: 3,
    opacity: 1,
    color: '#FF8C00',
    fillOpacity: 0.2
};

var nearbyshops = L.geoJson([], {
    style: nearbyshops_style,
    pointToLayer: function (feature, latlng) {
        return new L.CircleMarker(latlng, {radius: 10});
    },
    });

var nearbyshops_url = $("#shops_dataset").val();

$.getJSON(nearbyshops_url, function (data) {
    // Add GeoJSON layer
    nearbyshops.addData(data);
});

var map = L.map('map', {
    center: [25.761681, -80.191788],
	zoom: 15,
	layers: [gstreets]
});

var baseLayers = {
	"Google Streets": gstreets,
};

var overlays = {
    "Lojas": nearbyshops,
};

L.control.layers(baseLayers, overlays).addTo(map);