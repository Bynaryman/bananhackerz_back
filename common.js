const urlLib     = require('url');
const request    = require('request');


exports.LOCAL_PORT = 80;

// Custom JSON object/message when 404 error
exports.ERROR_404 = {
    status: 404,
    error: "Not found"
};

// Custom JSON object/message when 500 error
exports.ERROR_500 = {
    status: 500,
    error: "Internal error, server rebooting..."
};

// Custom JSON object/message when 400 error
exports.ERROR_400 = {
    status: 400,
    error: "Bad Request"
};

exports.middlewares = {

    /**
     * This function add headers to allow cross domain requests (between front-end and back-end)
     * @param req
     * @param res
     * @param next
     */
    allowCrossDomain: function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Cache-Control, Access-Control-Allow-Origin, Access-Control-Allow-Headers');
        // catch the preflights requests
        if ('OPTIONS' === req.method) {
            res.status(200);
            res.end();
        } else {
            next();
        }
    },

    /**
     * Middleware to put in trace the method received on which url
     * @param logger
     * @returns {Function}
     */
    methodReceivedLogMiddleware: function (logger) {
        return function (req, res, next) {
            logger.debug(req.method, 'on', urlLib.parse(req.originalUrl || req.url).pathname);
            next();
        }
    },

    /**
     * Middleware to catch 404, url not found
     * @param logger
     * @returns {Function}
     */
    catch404: function ( logger ) {
        return function (req, res, next) {
            logger.info("someone tried to access a non existing route : ", urlLib.parse(req.originalUrl || req.url).pathname);
            res.status(404).send(exports.ERROR_404);
            res.end();
        }
    },

    catch500: function() {
        return function (err, req, res, next) {
            console.error(err.stack);
            res.status(500).send(exports.ERROR_500);
            res.end();
        }
    }
}
