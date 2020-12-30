// Carregando a localização do usuário pelo IP

localizacao = L.layerGroup();

var user_location = document.addEventListener('DOMContentLoaded', function(){

    navigator.geolocation.getCurrentPosition(function(position) {

        var latitude   = position.coords.latitude;
        var longitude  = position.coords.longitude;
        map.setView(new L.LatLng(latitude,longitude), 18);
        return new L.CircleMarker([latitude,longitude], {radius: 10})
        .bindPopup('Esta é sua localização.')
        .addTo(map)
        .addTo(localizacao)
    });
});

//Carregando o layer das imagens estaticas

var gstreets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: 'Google'
});

googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3'],
    attribution: 'Google Satelite'
});

//Carregando o layer das lojas

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
	layers: [gstreets, googleSat]
});

// Criando o controle de layers

var baseLayers = {
    "Google Streets": gstreets,
    "Google Satélite": googleSat,
};

var overlays = {
    "Lojas": nearbyshops,
    "Localizacao": localizacao
};

L.control.layers(baseLayers, overlays).addTo(map);

// Criando a barra de escala
var scale = L.control.scale()
scale.addTo(map)