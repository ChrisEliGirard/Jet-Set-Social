const router = require('express').Router();
const { Images } = require('../../models');
const remoteConnect = require('../../utils/remoteConnect');
const withAuth = require('../../utils/auth');

// GET all Images
router.get('/', async (req, res) => {
  try {
    const imageData = await Images.findAll();
    const images = imageData.map((image) => image.get({plain: true}));

    res.status(200).json(images);
  } catch (err) {return res.status(404).json(err), console.log(err)};
})

// GET Images by id
router.get('/:id', async (req, res) => {
  try {
    const imageData = await Images.findByPk(req.params.id);

    if (!imageData) {return res.status(404).json({message: 'No Image found with that id!'})};

    res.status(200).json(imageData);
  } catch (err) {return res.status(404).json(err)};
})

// CREATE a new Image
router.post('/', async (req, res) => {
  try {
    // The image variable is a placeholder for our uploaded image.
    const { body, image } = req;

    let result = await remoteConnect.saveFile(image);

    // Assuming the body uses our naming conventions
    let imageData = {
      image: result.file_id,          // Use this in the src for img tag
      image_name: result.filename,    // Use this for alt description in img tag
      description: body.description,
      user_id: body.user_id,
      trip_id: body.trip_id,
    };

    const newImage = await Images.create(
      ...imageData
    );

    res.status(200).json(newImage);
  } catch (err) {res.status(400).json(err)};
});

// UPDATE an Image
router.put('/:id', async (req, res) => {
  try {
    // The image variable is a placeholder for our uploaded image.
    const { body, image } = req;

    let result = await remoteConnect.saveFile(image);

    // Assuming the body uses our naming conventions
    let newImage = {
      image: result.file_id,          // Use this in the src for img tag
      image_name: result.filename,    // Use this for alt description in img tag
      description: body.description,
      user_id: body.user_id,
      trip_id: body.trip_id,
    };

    const imageData = await Images.update(newImage,
    {
        where: {id: req.params.id}
    });

    if (!imageData) {return res.status(404).json({ message: 'No Image found with that id!' })};

    res.status(200).json(imageData);
  } catch (err) {res.status(404).json(err)};
})

// DELETE an Image
router.delete('/:id', async (req, res) => {
  try {
    const imageData = await Images.destroy({
      where: {id: req.params.id}
    });

    if (!imageData) {return res.status(404).json({ message: 'No Location found with this id!' })};

    res.status(200).json(imageData);
  } catch (err) {res.status(500).json(err)};
});

module.exports = router;