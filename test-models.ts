import { GoogleGenAI } from '@google/genai';
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
async function run() {
  try {
    const list = await ai.models.list();
    console.log(list);
    for await (let model of ai.models.list()) {
      console.log(model.name);
    }
  } catch(e) {
    console.error(e.message);
  }
}
run();
