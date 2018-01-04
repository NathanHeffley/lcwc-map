const express = require('express');
const path = require('path');
const parser = require('rss-parser');

const app = express();
app.set('view engine', 'pug');
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    let entries = [];

    parser.parseURL('http://www.lcwc911.us/lcwc/lcwc/incidents.xml', function (err, parsed) {
        if (err) {console.log(err);}
        parsed.feed.entries.forEach(function (entry) {
            let [township, ...meta] = entry.content.split(';');

            let location ="", vehicles = "";

            if (hasVehicleName(meta[0]) && !hasStreetName(meta[0])) {
                vehicles = meta[0];
            } else {
                location = meta[0];
                vehicles = meta[1];
            }

            entries.push({
                title: entry.title,
                township: township.trim().toLowerCase(),
                location: location.trim().toLowerCase(),
                vehicles: vehicles.trim().toLowerCase().replace('qrs', 'QRS'),
            });
        });

        if (typeof parsed !== 'undefined') {
            res.render('index', { title: parsed.feed.title, entries: entries });
        } else {
            return 'Error loading LCWC data...';
        }
    });
});

app.listen(3000, () => console.log('LCWC RSS Feeder listening on port 3000'));

function hasVehicleName(data) {
    return new RegExp("ENGINE|MEDIC|AMBULANCE|QRS|BRUSH").test(data);
}

function hasStreetName(data) {
    return new RegExp("RD|ST|CT|CIR|AVE|LN|PIKE|DR").test(data)
}