import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyBBOjSwwb4XtDk_z5HeN8L2_zruaJacSUk'); // Hardcoded API key

export const generateStory = async (prompt) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  const result = await model.generateContent(prompt);
  return result.response.text();
};

export const generateCharacter = async (prompt) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  const result = await model.generateContent(`Create a detailed character profile: ${prompt}`);
  return result.response.text();
};

export const generatePlot = async (prompt) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  const result = await model.generateContent(`Generate a plot outline: ${prompt}`);
  return result.response.text();
};
export const generateDialogue = async (prompt) => {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(`Generate a dialogue based on the following scene or characters: ${prompt}`);
    return result.response.text();
  };
  
  export const inferPlotFromWriter = async (writerName) => {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(`Infer a plot in the style of the writer: ${writerName}`);
    return result.response.text();
  };