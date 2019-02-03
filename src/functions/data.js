import RSSParser from 'rss-parser'
const parser = new RSSParser()

exports.handler = function (event, context, callback) {
    parser.parseURL('http://www.lcwc911.us/lcwc/lcwc/incidents.xml', function (err, parsed) {
        if (err) {
            callback(null, {
                statusCode: 500,
                body: 'Something went wrong...'
            })
            return
        }

        let entries = [];

        parsed.items.forEach((entry) => {
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
            body: JSON.stringify(entries)
        })
    })
}

function hasVehicleName(data) {
    return new RegExp("ENGINE|MEDIC|AMBULANCE|QRS|BRUSH|TRAFFIC|POLICE").test(data);
}

function hasStreetName(data) {
    return new RegExp("RD|ST|ALY|CT|CIR|AVE|LN|PIKE|DR|ROUTE|RAMP").test(data)
}