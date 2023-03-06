const router = require('express').Router();
const { Trips, Users, Images, Comments, Tagged} = require('../models');
const withAuth = require('../utils/auth');

// Use withAuth middleware to prevent access to route

// Route to view another Trip Page
router.get('/:id', async (req, res) => {
    try {
        // If the Users id matches the requested id than the User is redirected to their editable profile
        // Find the User based on the req params whether user or frontend initiated
        const tripData = await Trips.findByPk(req.params.id, {
            include: [
                {all: true}, 
                {model: Users, attributes: {exclude: ['password']}},
                {model: Tagged, right: true, 
                    attributes: {exclude:['trip_id', 'id']},
                    include: {model: Users, attributes: {exclude: ['password']}}
                }
            ],
            attributes: {exclude: ['taggedId', 'commentId']}
        });
        const trip = tripData.get({plain: true});
        
        console.log(trip);
        console.log(trip.taggeds[0].user)
        res.render('Trip', {
            ...trip,
            logged_in: req.session.logged_in 
        });
    } catch (err) {res.status(500).json(err), console.log(err)};
  });

module.exports = router;