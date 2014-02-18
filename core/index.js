// ## Cleanz bootloader

function startCleanz(app) {
        var cleanz = require('./server');
        cleanz(app);
}

module.exports = startCleanz;