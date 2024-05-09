const fs = require("fs");

function readTripsFromFile() {
    const demo_data = fs.readFileSync('demo-data.json', 'utf8')
    return JSON.parse(demo_data).trips
}

module.exports = {
    readTripsFromFile: readTripsFromFile
}
