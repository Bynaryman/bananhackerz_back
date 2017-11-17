// load dependencies
const express    = require('express');
const bodyParser = require('body-parser');

// load all routers
let aeroports       = require('./aeroports');
let compagnies      = require('./compagnies');
let infra           = require('./infra');

const app = express();

// parse application/x-www-form-urlencoded
app.use( bodyParser.urlencoded( { extended: false } ));
// parse application/json
app.use(bodyParser.json());

// disable powered by header
app.disable('x-powered-by');

aeroports(app);
compagnies(app);
infra(app);

// Start the service
let server = http.createServer(app).listen(common.LOCAL_PORT, function () {
    console.log('started a http service on localhost: ' + common.LOCAL_PORT);
    console.log('PID is ' + process.pid);
});
