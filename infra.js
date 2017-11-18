const express    = require('express');
const common     = require('./common');
const request    = require('request');

module.exports = function (app, loggerFile) {

    // add routes to the app
    const router = express.Router();

    // 
    app.use('/infra', router);

    router.get('/aiports/:id(\\d+)', function(req, res) {
            
            request(
            {
                 method: 'GET',
                 uri: "http://localhost/airports/" + req.params.id
            },
            function(err, resR) {
                res.status(resR.statusCode).send(resR.body);
                res.end();
            })
    });

    router.get('/travel-info/:name', 
        function(req, res) {
            
            request(
            {
	         method: 'GET',
		 uri: "http://localhost/compagnies/" + req.params.name
            },
            function(err, resR) {
                res.status(resR.statusCode).send(resR.body);
                res.end();
            })
    });

}
