const path = require('path')

module.exports = {
    mode: 'development',
    entry: './src/map.js',
    output: {
        filename: 'map.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        proxy: {
            '/.netlify': {
                target: 'http://localhost:9000',
                pathRewrite: { '^/.netlify/functions': '' }
            }
        }
    }
}