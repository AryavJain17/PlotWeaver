const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const storyController = require('../controllers/storyController');

router.post('/', auth, storyController.createStory);
router.get('/', auth, storyController.getStories);
router.get('/:id', auth, storyController.getStoryById);
router.put('/:id', auth, storyController.updateStory);
router.delete('/:id', auth, storyController.deleteStory);

module.exports = router;
