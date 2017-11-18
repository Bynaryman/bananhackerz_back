/**
 * Created by Binaryman on 18/11 
 */

const express    = require('express');
const common     = require('./common');

module.exports = function (app, loggerFile) {
    
    // add routes to the app
    const router = express.Router();

    const travels = {
       'V4286': {
            'dest_label': 'Dubaï',
            'from_label': 'Paris-Roisy',
            'dest_coords': [25.2654963,55.350845],
            'from_coords': [48.9967588,2.5227196],
            'travel_time': '25h32',
            'departure_time': '2018-02-26 : 00h00',
            'arrival_time': '2018-02-27 : 01:32' 
        },
        'RY1337': {
            'dest_label': 'Londres',
            'from_label': 'New-York',
            'dest_coords': [51.518505,-0.6681292],
            'from_coords': [40.6741303,-74.0976932],
            'travel_time': '2h37',
            'departure_time': '2018-04-16 : 00h00',
            'arrival_time': '2018-04-26 : 02:37'
        }
    }

    // we say the main app to use the community router
    app.use('/compagnies', router);

    // the mock route to get a travel infos
    router.get(
	'/:name',
	function (req, res) {
            
            const name = req.params.name;
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
