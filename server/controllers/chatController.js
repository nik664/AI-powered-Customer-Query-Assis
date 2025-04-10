const axios = require('axios');

exports.handleChat = async (req, res) => {
  const { message } = req.body;

  console.log('User message received:', message);

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openrouter/openai/gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
      }
    );

    const reply = response.data.choices?.[0]?.message?.content || 'No valid response';
    res.json({ message: reply });

  } catch (error) {
    console.error('OpenRouter error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Something went wrong with OpenRouter API.' });
  }
};
