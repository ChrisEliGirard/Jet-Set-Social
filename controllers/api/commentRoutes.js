const router = require('express').Router();
const { Comments } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all Comments
router.get('/', async (req, res) => {
  try {
    const commentData = await Comments.findAll();
    const comments = commentData.map((comment) => comment.get({plain: true}));

    res.status(200).json(comments);
  } catch (err) {return res.status(404).json(err)};
})

// GET Comment by id
router.get('/:id', async (req, res) => {
    try {
      const commentData = await Comments.findByPk(req.params.id);
  
      if (!commentData) {return res.status(404).json({message: 'No Location found with that id!'})};
  
      res.status(200).json(commentData);
    } catch (err) {return res.status(404).json(err)};
  })
  
  // CREATE a new Comment
  router.post('/', async (req, res) => {
    try {
      const newComment = await comments.create(
        ...req.body
      );
  
      res.status(200).json(newComment);
    } catch (err) {res.status(400).json(err)};
  });
  
  // UPDATE a Comment
  router.put('/:id', async (req, res) => {
    try {
      const commentData = await Comments.update(req.body,
      {
          where: {id: req.params.id}
      });
  
      if (!commentData) {return res.status(404).json({ message: 'No Location found with that id!' })};
  
      res.status(200).json(commentData);
    } catch (err) {res.status(404).json(err)};
  })
  
  // DELETE a Comment
  router.delete('/:id', async (req, res) => {
    try {
      const commentData = await Comments.destroy({
        where: {id: req.params.id}
      });
  
      if (!commentData) {return res.status(404).json({ message: 'No Location found with this id!' })};
  
      res.status(200).json(commentData);
    } catch (err) {res.status(500).json(err)};
  });
  
  module.exports = router;
  