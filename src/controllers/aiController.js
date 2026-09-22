const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// @desc  Improve note content using AI (more professional, clearer, grammatically correct)
// @route POST /api/ai/improve-note
const improveNote = async (req, res, next) => {
  try {
    const { content } = req.body;

    if (!content || !content.trim()) {
      res.status(400);
      throw new Error("Content is required");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `Rewrite the following note to be more professional, clearer, and grammatically correct. Only return the improved text, with no extra commentary or quotation marks.\n\nNote:\n${content}`;

    const result = await model.generateContent(prompt);
    const improvedContent = result.response.text().trim();

    res.status(200).json({ success: true, data: { improvedContent } });
  } catch (err) {
    next(err);
  }
};

module.exports = { improveNote };
