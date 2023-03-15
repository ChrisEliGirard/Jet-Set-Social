const router = require('express').Router();
const { Trips, Users, Images, Comments, Tagged} = require('../models');
const withAuth = require('../utils/auth');

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
                { model: Comments, include: { model: Users, attributes: { exclude: ['password'] } } },
                { model: Images, right: true }
            ],
        });

        const trip = tripData.get({ plain: true });

        const trippie = tripData.map((trips) => trips.get({ plain: true }));
        // let triped = trippie[0];
        console.log(trip);
        console.log(trippie);

        // Should find a way to implement this with sequelize ORM
        if (trip.comments.length > 0) {
            for (let i = 0; i < trip.comments.length; i++) {
                let comment = trip.comments[i];
                comment.isAllowed = comment.user_id === req.session.user_id;
            }
        }

        console.log(trip);
        // console.log(req.session);
        
        res.render('Trip', {
            ...trip,
            logged_in: req.session.logged_in,
            full_name: req.session.full_name,
            profile_url: req.session.profile_url,
            profile_alt: req.session.profile_alt,
        });
    } catch (err) { res.status(500).json(err), console.log(err); };
});

module.exports = router;
