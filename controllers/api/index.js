const router = require('express').Router();
const userRoutes = require('./userRoutes');
const tripRoutes = require('./tripRoutes');
const commentRoutes = require('./commentRoutes');
const locationRoutes = require('./locationRoutes')

router.use('/users', userRoutes);
router.use('/trips', tripRoutes);
router.use('/comments', commentRoutes);
router.use('/locations', locationRoutes);

module.exports = router;
