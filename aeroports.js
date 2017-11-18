/**
 * 
 */

const express    = require('express');
const common     = require('./common');

module.exports = function (app, loggerFile) {
    
    // add routes to the app
    const router = express.Router();

    const travels = {
       'V4286': {
            'dest': 'test',
            'from': 'paris'
        },
        'RY1337': {

        }
    }

    // we say the main app to use the community router
    app.use('/aeroports', router);

    // the mock route to get a travel infos
    router.get(
	'/:name',
	function (req, res) {
            
            const name = req.params.name;
            console.log(name);
            if (travels.hasOwnProperty(name)) {
	        res.status(200).send(travels[name]);
                res.end();
            }
            else {
                res.status(404).send(common.ERROR_404);
                res.end();
            }
	});
}
