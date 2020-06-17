const winston = require('winston');


module.exports = function (err, req, res, next) {
    winston.error(err.message, err);

    // Standard logging errors:
    // error
    // warn
    // info
    // verbose
    // debug
    // silly

    res.status(500).send('Something went terribly wrong and failed mate.');
}