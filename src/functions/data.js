exports.handler = function(event, context, callback) {
    let entries = [];

    let parser = require('rss-parser')
    parser.parseURL('http://www.lcwc911.us/lcwc/lcwc/incidents.xml', function (err, parsed) {
        if (err) {
            callback(null, {
                statusCode: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: err,
            })
            return
        }

        parsed.feed.entries.forEach(function (entry) {
            let [township, ...meta] = entry.content.split(';')

            let location = '', vehicles = ''

            if (hasVehicleName(meta[0]) && !hasStreetName(meta[0])) {
                vehicles = meta[0]
            } else {
                location = meta[0]
                vehicles = meta[1]
            }

            entries.push({
                title: entry.title,
                township: township.trim().toLowerCase(),
                location: location.trim().toLowerCase(),
                vehicles: vehicles.trim().toLowerCase().replace('qrs', 'QRS'),
            })
        })

        callback(null, {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            body: entries,
        })
    })
}