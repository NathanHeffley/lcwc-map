'use strict';

const platform = new H.service.Platform({
    'app_id': 'eFS3M5T0uIHDfkRQ63eI',
    'app_code': '0C6fpsJ_85YIozuEgnQrhQ',
    'useHTTPS': true
})

const pixelRatio = devicePixelRatio > 1 ? 2 : 1;
let defaultLayers = platform.createDefaultLayers({
    tileSize: 256 * pixelRatio
})
const layers = platform.createDefaultLayers({
    tileSize: 256 * pixelRatio,
    ppi: pixelRatio > 1 ? 320 : 72
})

let map = new H.Map(
    document.getElementById('map'),
    defaultLayers.normal.map,
    {
        pixelRatio,
        center: { lat: 40.044437, lng: -76.306229 },
        zoom: 13
    }
)

new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

let ui = H.ui.UI.createDefault(map, layers)
ui.removeControl('mapsettings')
ui.removeControl('zoom')

window.addEventListener('resize', function() {
    map.getViewPort().resize()
})

fetch('/.netlify/functions/data').then((response) => {
    return response.json()
}).then(function (data) {
    setEventEntries(data)
})

function setEventEntries(eventEntries) {
    for (var key in eventEntries) {
        var geocodingParams = {
            searchText: `${eventEntries[key].location}, ${eventEntries[key].township}, PA`
        };

        let eventIcon;
        if (eventEntries[key].title.includes('MEDICAL EMERGENCY') || eventEntries[key].title.includes('ROUTINE TRANSFER')) {
            eventIcon = {icon: icons['medical']};
        } else if (eventEntries[key].title.includes('FIRE') || eventEntries[key].title.includes('AUTO ALARM')) {
            eventIcon = {icon: icons['fire']};
        } else {
            eventIcon = {};
        }

        var onResult = function(result) {
            if (result.Response.View.length > 0) {
                var locations = result.Response.View[0].Result,
                    position,
                    marker;
                for (var i = 0; i < locations.length; i++) {
                    position = {
                        lat: locations[i].Location.DisplayPosition.Latitude,
                        lng: locations[i].Location.DisplayPosition.Longitude
                    };
                    marker = new H.map.Marker(position, eventIcon);
                    map.addObject(marker);
                }
            }
        };

        var geocoder = platform.getGeocodingService();

        geocoder.geocode(geocodingParams, onResult, function(e) {
            console.log(e);
        });
    }
}