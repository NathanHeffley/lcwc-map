const path = require('path')

module.exports = {
    mode: 'production',
    entry: './src/map.js',
    output: {
        filename: 'map.js',
        path: path.resolve(__dirname, 'dist')
    }
}