const { GoogleGenerativeAI } = require("@google/generative-ai");

class GeminiService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
  }

  async generateContent(prompt, type = 'story') {
    const context = {
      story: "Write a creative story following this prompt:",
      character: "Create a detailed character profile with background, traits, and motivations:",
      plot: "Develop a plot outline with key story beats and character arcs:",
      dialogue: "Generate natural dialogue for a scene with these characters:",
      suggestion: "Provide writing suggestions and improvements for this content:"
    };

    try {
      const result = await this.model.generateContent(`${context[type]}\n${prompt}`);
      return result.response.text();
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw error;
    }
  }
}

module.exports = new GeminiService();