const express = require('express');
const router = express.Router();
const Story = require('../models/Story');
const auth = require('../middleware/auth');
const GeminiService = require('../services/geminiService'); // Import GeminiService

// Generate AI-powered content
router.post('/generate', auth, async (req, res) => {
  try {
    const { prompt, type } = req.body;

    // Generate content using Gemini API
    const generatedContent = await GeminiService.generateContent(prompt, type);

    res.json({ content: generatedContent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
// Create a new story
router.post('/', auth, async (req, res) => {
  try {
    const { title, content, characters, outline } = req.body;

    const story = new Story({
      title,
      content,
      author: req.user._id,
      characters,
      outline
    });

    await story.save();
    res.status(201).json(story);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all stories
router.get('/', auth, async (req, res) => {
  try {
    const stories = await Story.find({ author: req.user._id });
    res.json(stories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;