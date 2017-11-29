'use strict';

const platform = new H.service.Platform({
    'app_id': 'eFS3M5T0uIHDfkRQ63eI',
    'app_code': '0C6fpsJ_85YIozuEgnQrhQ'
});

const pixelRatio = devicePixelRatio > 1 ? 2 : 1;
let defaultLayers = platform.createDefaultLayers({
    tileSize: 256 * pixelRatio
});
const layers = platform.createDefaultLayers({
    tileSize: 256 * pixelRatio,
    ppi: pixelRatio > 1 ? 320 : 72
});

let map = new H.Map(
    document.getElementById('mapContainer'),
    defaultLayers.normal.map,
    {
        pixelRatio,
        center: new H.geo.Point(40.04, -76.34),
        zoom: 11
    }
);

const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
let ui = H.ui.UI.createDefault(map, layers);
ui.removeControl('mapsettings');

window.addEventListener('resize', function() {
    map.getViewPort().resize();
});

for (var key in eventEntries) {
    var geocodingParams = {
        searchText: `${eventEntries[key].location}, ${eventEntries[key].township}, PA`
    };

    let eventIcon;
    if (eventEntries[key].title == "MEDICAL EMERGENCY") {
        eventIcon = {icon: icons['medicalEmergency']};
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

/*
let provider = new H.datalens.Provider({
    data: eventEntries,
    dataToFeatures: (data) => {
        let features = [];
        let row = null;
        let feature = null;

        for (let i = 1, l = data.length; i < l; i++) {
            row = data[i];
            feature = {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [Number(row[3]), Number(row[2])]
                },
                'properties': {
                    'facility': row[0],
                    'address': row[1],
                    'SUBahn': row[8],
                    'type':  row[11]
                }
            };
            features.push(feature);
        }
        return features;
    },
    featuresToRows: (features) => {
        let rows = [], feature;
        for (let i = 0, l = features.length; i < l; i++) {
            feature = features[i];
            rows.push([{
                    lat: feature.geometry.coordinates[1],
                    lng: feature.geometry.coordinates[0]
                },
                feature.properties.facility,
                feature.properties.address,
                feature.properties.SUBahn,
                feature.properties.type
            ]);
        }
        return rows;
    }
});

let layer = new H.datalens.ObjectLayer(provider, {
    pixelRatio: window.devicePixelRatio,

    // accepts data row and returns map object
    rowToMapObject: function (data) {
        let coordinates = data[0];
        let facility = data[1];
        return new H.map.Marker(coordinates);
    },

    rowToStyle: function (data, zoom) {
        if (!venueIcons[data[4]]) { return }
        let icon = H.datalens.ObjectLayer.createIcon(venueIcons[data[4]],
            {size: 30 * pixelRatio});
        return {icon};
    }
});

map.addLayer(layer);

// show info bubble on hover
const format = d3.format('.2f');
let hoveredObject;
let infoBubble = new H.ui.InfoBubble({lat: 0, lng: 0}, {});
infoBubble.addClass('info-bubble');
infoBubble.close();
ui.addBubble(infoBubble);

map.addEventListener('pointermove', (e) => {
    if (hoveredObject && hoveredObject !== e.target) {
        infoBubble.close();
    }

    hoveredObject = e.target;
    if (hoveredObject.icon) {
        let row = hoveredObject.getData();
        if (row) {
            let facility = row[1];
            let address = row[2];
            let SUBahn = row[3];

            let pos = map.screenToGeo(
                e.currentPointer.viewportX,
                e.currentPointer.viewportY);
            infoBubble.setPosition(pos);
            infoBubble.setContent(`
                <div class="info-bubble-title">${facility}</div>
                <div class="info-bubble-label">
                    ${address} <br />
                    ${SUBahn}
                </div>`);
            infoBubble.open();
        }
    }
});
*/