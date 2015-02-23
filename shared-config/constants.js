var winston = require('winston');
        
//constants
var c = {

    port: {

        'mongodb' : 27017,
        'explore' : 3000,
        'admin' : 3001,
        'sys-admin' : 3002
    },

    db: {
        
        fatalities: 'test-fatalities'
    },
    
    collection: {
        
        fatalities: 'test-fatalities'
    },
    
    url: {}
};

c.url.mongo = 'mongodb://localhost:' + c.port.mongodb + '/';



/*
 * @param location {array}
*/

var FILE_SEP = '.',
    LOGS_DIR = __dirname + '/../log/';

var logger = new (winston.Logger)({

    levels: {

        trace: 0,
        input: 1,
        verbose: 2,
        prompt: 3,
        debug: 4,
        info: 5,
        data: 6,
        help: 7,
        warn: 8,
        error: 9
    },

    colors: {

        trace: 'magenta',
        input: 'grey',
        verbose: 'cyan',
        prompt: 'grey',
        debug: 'blue',
        info: 'green',
        data: 'grey',
        help: 'cyan',
        warn: 'yellow',
        error: 'red'
    }
});

logger.add( winston.transports.Console, {

    level: 'trace',
    prettyPrint: true,
    colorize: true,
    silent: false,
    timestamp: false
});

logFileName = getLogFileName();

logger.add( winston.transports.File, {

    prettyPrint: false,
    level: 'trace',
    silent: false,
    timestamp: true,
    filename: logFileName,
    maxsize: 40000,
    maxFiles: 10,
    json: false
});

function getLogFileName () {

    var today = new Date(),
        d = today.getDate(),
        d = d < 10 ? '0' + d : d,
        m = today.getMonth() + 1,
        m = m < 10 ? '0' + m : m,
        y = today.getFullYear();
    
    return LOGS_DIR + y + '' + m + '' + d + '.log'
}

c.log = function (type, msg, data) {

    data = data ? data : '';
    
    return logger.log(type, msg, data);
};

c.getLog = function (log, location) {
    
    return function (type, msg, data) {
        
        data = data || {};
        data.location =location;
        
        log(type, msg, data);
    }
}

module.exports = c;