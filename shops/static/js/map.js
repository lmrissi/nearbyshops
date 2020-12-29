// Carregando a localização do usuário pelo IP

var user_location = document.addEventListener('DOMContentLoaded', function(){

    navigator.geolocation.getCurrentPosition(function(position) {

        var latitude   = position.coords.latitude;
        var longitude  = position.coords.longitude;
        return new L.CircleMarker([latitude,longitude], {radius: 10})
        .bindPopup('Esta é sua localização.')
        .addTo(map)
    });
});

//Carregando o layer das imagens estaticas

var gstreets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: 'Google'
});

//Carregando o layer das lojas e das imagens estaticas

var nearbyshops_style = {
    fillColor: '#FF8C00',
    weight: 3,
    opacity: 1,
    color: '#FF8C00',
    fillOpacity: 0.2
};

var nearbyshops_url = $("#shops_dataset").val();

$.getJSON(nearbyshops_url, function (data) {
    // Add GeoJSON layer
    nearbyshops.addData(data);
});

var nearbyshops = L.geoJson([], {
    style: nearbyshops_style,
    pointToLayer: function (feature, latlng) {
        return new L.CircleMarker(latlng, {radius: 10})
        .bindPopup(feature.properties.name)
        .addTo(map);
    },
    });

// Criando o mapa

var map = L.map('map', {
    center: [25.761681, -80.191788],
	zoom: 15,
	layers: [gstreets]
});

// Criando o controle de layers

var baseLayers = {
	"Google Streets": gstreets,
};

var overlays = {
    //"Localização": user_location,
    "Lojas": nearbyshops,
};

L.control.layers(baseLayers, overlays).addTo(map);

var scale = L.control.scale()
scale.addTo(map)