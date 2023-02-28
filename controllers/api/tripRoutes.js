const router = require('express').Router();
const { Trips } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all Trips
router.get('/', async (req, res) => {
  try {
    const tripData = await Trips.findAll();
    const trips = tripData.map((trip) => trip.get({plain: true}));

    res.status(200).json(trips);
  } catch (err) {return res.status(404).json(err)};
})

// GET Trip by id
router.get('/:id', async (req, res) => {
  try {
    const tripData = await Trips.findByPk(req.params.id);

    if (!tripData) {return res.status(404).json({message: 'No Trips found with that id!'})};

    res.status(200).json(tripData);
  } catch (err) {return res.status(404).json(err)};
})

// CREATE a new Trip
router.post('/', withAuth, async (req, res) => {
  try {
    const newTrip = await Trips.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newTrip);
  } catch (err) {res.status(400).json(err)};
});

// UPDATE a Trip
router.put('/:id', async (req, res) => {
  try {
    const TripData = await Trips.update(req.body,
    {
        where: {id: req.params.id}
    });

    if (!TripData) {return res.status(404).json({ message: 'No Location found with that id!' })};

    res.status(200).json(TripData);
  } catch (err) {res.status(404).json(err)};
})
// DELETE a Trip
router.delete('/:id', async (req, res) => {
  try {
    const TripData = await Trips.destroy({where: {id: req.params.id}});

    if (!TripData) {return res.status(404).json({ message: 'No Trip found with this id!' })};

    res.status(200).json(TripData);
  } catch (err) {res.status(500).json(err)};
});

module.exports = router;
