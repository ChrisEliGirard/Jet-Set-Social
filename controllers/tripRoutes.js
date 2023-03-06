const router = require('express').Router();
const { Trips, Users, Images, Comments, Tagged} = require('../models');
const withAuth = require('../utils/auth');

// Use withAuth middleware to prevent access to route

// Route to view another Trip Page
router.get('/:id', async (req, res) => {
    try {
        // If the Users id matches the requested id than the User is redirected to their editable profile
        // Find the User based on the req params whether user or frontend initiated
        //const tripData = await Trips.findByPk(req.params.id, {
        const tripData = await Trips.findAll({
            where: {id: req.params.id},
            include: [ 
                {model: Users, attributes: {exclude: ['password']}},
                {model: Tagged, right: true, 
                    include: {model: Users, attributes: {exclude: ['password']}}
                },
                {model: Images, right: true}
            ],
        });

        trippie = tripData.map((trips) => trips.get({plain: true}));
        trip = trippie[0];
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
