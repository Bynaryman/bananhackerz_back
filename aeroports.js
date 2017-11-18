/**
 * Created by Binaryman on 18/11
 */

const express    = require('express');
const common     = require('./common');

module.exports = function (app, loggerFile) {

    // add routes to the app
    const router = express.Router();
    
    const airports = {
        1: {
            shops: {

            },
            guichets: {

            },
            toilettes: {

            },
            restaurants: {

            }
        },
        2: {
            shops: {

            },
            guichets: {

            },
            toilettes: {

            },
            restaurants: {

            }
        },
        3: {
            shops: {

            },
            guichets: {

            },
            toilettes: {

            },
            restaurants: {

            }
        },
        4: {
            shops: {

            },
            guichets: {

            },
            toilettes: {

            },
            restaurants: {

            }
        }
    }

    // we say the main app to use the community router
    app.use('/aeroports', router);

    // the mock route to get the shops of an airport
    router.get(
        '/:id(\\d+)/',
        function (req, res) {

            const id = req.params.id;
            
            if (airports.hasOwnProperty(id)) {
                res.status(200).send(airports[id]);
                res.end();
            }
            else {
                res.status(404).send(common.ERROR_404);
                res.end();
            }
        });
}
