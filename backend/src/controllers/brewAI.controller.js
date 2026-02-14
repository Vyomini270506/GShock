const { GoogleGenerativeAI } = require('@google/generative-ai');
const Menu = require('../models/menu.model');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function brewAIRecommendation(req, res) {
  try {
    const { mood, taste, timeOfDay } = req.body;
    // Database check: products available hone chahiye
    const menuItems = await Menu.find({ isAvailable: true });
    
    if (menuItems.length === 0) {
      return res.status(404).json({ message: "No menu items available to recommend." });
    }

    const menuContext = menuItems.map(item => 
      `${item.name}: ${item.description} (Price: ₹${item.price})`
    ).join('\n');

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: "You are the Rabuste Brew AI. Based on Mood, Taste, and Time, pick ONE menu item. Return ONLY JSON: {\"itemName\": \"Name\", \"reason\": \"1-sentence funky reason\", \"matchPercentage\": 95}"
    });

    const prompt = `Match a drink for: Mood: ${mood}, Taste: ${taste}, Time: ${timeOfDay}. \nMenu Data:\n${menuContext}`;
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // FIXED: Extracting only the JSON part from the response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("AI outputted invalid format");
    }

    const recommendation = JSON.parse(jsonMatch[0]);
    const fullItem = menuItems.find(i => i.name === recommendation.itemName);

    res.status(200).json({ ...recommendation, itemData: fullItem });
  } catch (error) {
    console.error("Brew AI Error:", error);
    res.status(500).json({ message: "Brewing error", error: error.message });
  }
}

module.exports = { brewAIRecommendation };