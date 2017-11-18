// load dependencies
const express    = require('express');
const bodyParser = require('body-parser');
const common     = require('./common.js')
const http       = require('http')
const urlLib     = require('url');
const winston    = require('winston');
const logger     = require('morgan');

// load all routers
let aeroports       = require('./aeroports');
//let compagnies      = require('./compagnies');
//let infra           = require('./infra');

const app = express();

// create a file logger
let loggerFile = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({
            filename: 'trace.log',
            level: 'debug'
        })
    ]
});

// set the console logger
logger.token('shortURL', function (req, res) {
    return urlLib.parse(req.originalUrl || req.url).pathname;
});
 // we use the predefined tokens of morgan which are good enough
 app.use(logger(':method :shortURL - Remote addr :  :remote-addr - :date[clf] - Status : :status - :response-time ms - :res[content-length] bytes'));

// parse application/x-www-form-urlencoded
app.use( bodyParser.urlencoded( { extended: false } ));
// parse application/json
app.use(bodyParser.json());

// we say the app to use our customs middlewares
app.use(common.middlewares.methodReceivedLogMiddleware(loggerFile));

// disable powered by header
app.disable('x-powered-by');

aeroports(app, loggerFile);
//compagnies(app, loggerFile);
//infra(app, loggerFile);


// middleware which catch 404
app.use(common.middlewares.catch404(loggerFile));

// middleware which catch 500
app.use(common.middlewares.catch500());

// Start the service
let server = http.createServer(app).listen(common.LOCAL_PORT, function () {
    console.log('started a http service on localhost: ' + common.LOCAL_PORT);
    console.log('PID is ' + process.pid);
});
