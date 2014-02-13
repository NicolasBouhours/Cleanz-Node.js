// # Cleanz bootloader
// Orchestrates the loading of Ghost
// When run from command line.


function startCleanz(app) {
        var cleanz = require('./server');
        cleanz(app);
}

module.exports = startCleanz;