const router = require('express').Router();
const { Trips, Users, Images, Comments, Tagged} = require('../models');
const withAuth = require('../utils/auth');

// Route to view a Trip Page
router.get('/:id', async (req, res) => {
    try {
        // Find the Trip based on the req params whether user or frontend initiated
        const tripData = await Trips.findByPk(req.params.id, {
            include: [ 
                {model: Users, attributes: {exclude: ['password']}},
                {model: Tagged, right: true, 
                    include: {model: Users, attributes: {exclude: ['password']}},
                },
                {model: Images, right: true},
                {model: Comments, required: false,
                    include: {model: Users, attributes: {exclude: ['password']}},
                },
            ],
        });

        const trip = tripData.get({plain: true});
        console.log(trip);

        res.render('Trip', {
            ...trip,
            // owner,
            // editor,
            logged_in: req.session.logged_in 
        });
    } catch (err) {res.status(500).json(err), console.log(err)};
  });

module.exports = router;
