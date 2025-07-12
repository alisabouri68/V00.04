// webpack.config.js
const path = require('path');

module.exports = {
    // other configurations...

    resolve: {
        alias: {
            'COMPs': path.resolve(__dirname, 'src/COMPs'),
            'MWDGs': path.resolve(__dirname, 'src/MWDGs'),
        },
    },
};
