const winston = require('winston');
// require('winston-mongodb'); // temp. commented out to focus on integration test
require('express-async-errors');


module.exports = function () {
    winston.exceptions.handle(
        new winston.transports.Console({ colorize: true, prettyPrint: true }),
        new winston.transports.File({ filename: 'uncaughtExceptions.log' })
    )

    process.on('unhandledRejection', (ex) => {
        throw ex;
    });

    winston.configure({ transports: [new winston.transports.File({ filename: 'logfile.log' })] });

    // winston.configure(winston.transports.MongoDB, {
    //     db: 'mongodb://localhost/vidly',
    //     level: 'info'
    // });  // See comment on line 2 and the verbose flag in package.json "scripts" "test"
}
