const Story = require('../models/Story');
const { generateStoryContent } = require('../services/geminiService');

exports.createStory = async (req, res) => {
    try {
        const { title, prompt } = req.body;
        const generatedContent = await generateStoryContent(prompt);

        const story = new Story({
            title,
            prompt,
            content: generatedContent,
            author: req.user.userId
        });

        await story.save();
        res.status(201).json(story);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getStories = async (req, res) => {
    try {
        const stories = await Story.find({ author: req.user.userId });
        res.json(stories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getStoryById = async (req, res) => {
    try {
        const story = await Story.findById(req.params.id);
        if (!story) return res.status(404).json({ error: 'Story not found' });

        res.json(story);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateStory = async (req, res) => {
    try {
        const { title, content } = req.body;
        const story = await Story.findById(req.params.id);

        if (!story) return res.status(404).json({ error: 'Story not found' });

        if (story.author.toString() !== req.user.userId)
            return res.status(403).json({ error: 'Unauthorized' });

        story.title = title || story.title;
        story.content = content || story.content;
        await story.save();

        res.json(story);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteStory = async (req, res) => {
    try {
        const story = await Story.findById(req.params.id);
        if (!story) return res.status(404).json({ error: 'Story not found' });

        if (story.author.toString() !== req.user.userId)
            return res.status(403).json({ error: 'Unauthorized' });

        await story.remove();
        res.json({ message: 'Story deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
