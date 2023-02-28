const router = require('express').Router();
const { Images } = require('../../models');
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
    const newImage = await Images.create(
      ...req.body
    );

    res.status(200).json(newImage);
  } catch (err) {res.status(400).json(err)};
});

// UPDATE an Image
router.put('/:id', async (req, res) => {
  try {
    const imageData = await Images.update(req.body,
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