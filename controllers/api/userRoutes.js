const router = require('express').Router();
const { Users } = require('../../models');
const remoteConnect = require('../../utils/remoteConnect');

// User Creation Routes
// Create User
router.post('/', async (req, res) => {
  try {
    // The image variable is a placeholder for our uploaded image.
    const { body, image } = req;

    let result = await remoteConnect.saveFile(image);

    // Assuming the body uses our naming conventions
    let newUser = {
      name: body.name,
      username: body.username,
      email: body.email,
      profile_image: result.file_id,  // Use this in the src for img tag
      image_name: result.filename,    // Use this for alt description in img tag
      password: body.password,
    };

    const userData = await Users.create(newUser);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Login User
router.post('/login', async (req, res) => {
  try {
    const userData = await Users.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// Logout User
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// User Data Routes
// GET all Users
router.get('/', async (req, res) => {
  try {
    const userData = await Users.findAll();
    const users = userData.map((user) => user.get({plain: true}));

    res.status(200).json(users);
  } catch (err) {return res.status(404).json(err), console.log(err)};
})

// GET User by id
router.get('/:id', async (req, res) => {
  try {
    const userData = await Users.findByPk(req.params.id);

    if (!userData) { return res.status(404).json({ message: 'No User found with that id!' }); };

    res.status(200).json(userData);
  } catch (err) {return res.status(404).json(err)};
})

// UPDATE a User
router.put('/:id', async (req, res) => {
  try {
    // The image variable is a placeholder for our uploaded image.
    const { body, image } = req;

    let result = await remoteConnect.saveFile(image);

    // Assuming the body uses our naming conventions
    let newUser = {
      name: body.name,
      username: body.username,
      email: body.email,
      profile_image: result.file_id,  // Use this in the src for img tag
      image_name: result.filename,    // Use this for alt description in img tag
      password: body.password,
    };

    const UserData = await Users.update(newUser,
    {
        where: {id: req.params.id}
    });

    if (!userData) { return res.status(404).json({ message: 'No User found with that id!' }); };

    res.status(200).json(userData);
  } catch (err) {res.status(404).json(err)};
})

// DELETE a User
router.delete('/:id', async (req, res) => {
  try {
    const userData = await Users.destroy({
      where: {id: req.params.id}
    });

    if (!userData) { return res.status(404).json({ message: 'No User found with this id!' }); };

    res.status(200).json(userData);
  } catch (err) {res.status(500).json(err)};
});

module.exports = router;
