const router = require('express').Router();
const { Trips, Users, Images, Comments} = require('../models');
const withAuth = require('../utils/auth');

// Use withAuth middleware to prevent access to route
router.get('/', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Comments, Images, through: Trips}],
    });
    console.log(userData);
    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {res.status(500).json(err)};
});

// Route to view another Users Profile
router.get('/:id', async (req, res) => {
    try {
        // If the Users id matches the requested id than the User is redirected to their editable profile
        if (req.params.id === req.session.user_id) {
            window.replace('/');
        } else {
            // Find the User based on the req params whether user or frontend initiated
            const userData = await Users.findByPk(req.params.id, {
                attributes: { exclude: ['password'] },
                include: [{ model: Comments, Images, through: Trips }],
            });
        
            const user = userData.get({ plain: true });
        
            res.render('profile', {
                ...user,
                logged_in: req.session.logged_in 
            });
        }
    } catch (err) {res.status(500).json(err)};
  });

module.exports = router;