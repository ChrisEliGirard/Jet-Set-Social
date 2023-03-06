const router = require('express').Router();
const { Trips, Images, Tagged } = require('../../models');
const withAuth = require('../../utils/auth');
const remoteConnect = require('../../utils/remoteConnect');
const multer = require('multer');
const upload = multer();

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
router.post('/', upload.any(), async (req, res) => {
  try {
    // files is a standard variable that comes in the request.
    const { body, files } = req;
    let result = await remoteConnect.saveFiles(files); 

    // Assuming the body uses our naming conventions
    let newTrip = {
      name: `${body.tripName}`,
      description: `${body.tripDescription}`,
      user_id: `${req.session.user_id}`
    }

    const tripData = await Trips.create(newTrip);
    let tags =
      {
        user_id: 4,
        trip_id: tripData.id
      };
    const tagData = await Tagged.create(tags)
    let images = []
    for (let i = 0; i < result.length; i++) {
      let imageData = {
        image: `https://drive.google.com/uc?export=view&id=${result[i].file_id}`,
        image_name: result[i].filename,
        user_id: req.session.user_id,
        trip_id: tripData.id,
      }
      let image = await Images.create(imageData);
      images.push(image)
    }
    console.log(newTrip);
    res.status(200).json(newTrip);
  } catch (err) {res.status(400).json(err), console.log(err)};
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
