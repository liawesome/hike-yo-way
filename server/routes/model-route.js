import ollama from 'ollama'
import express from 'express'
import fs from 'fs/promises'
import path from 'path'
import parseResponseToJson from '../controllers/parse_response.js'

const router = express.Router()

const responsesDir = path.join(process.cwd(), 'responses')

try {
    await fs.mkdir(responsesDir, { recursive: true })
} catch (err) {
    console.error('Error creating responses directory:', err)
}

router.post('/ask-query', async (req, res) => {
    const { query, sessionId } = req.body;
    
    if (!sessionId) {
        return res.status(400).json({ error: 'Session ID is required' });
    }

    const sessionFile = path.join(responsesDir, `seed_${sessionId}.json`)
    try {
        let messages = []
        try {
            const data = await fs.readFile(sessionFile, 'utf8')
            messages = JSON.parse(data)
        } catch (err) {
        }

        messages.push({ role: 'user', content: query })

        console.log('Sending request to Ollama');
        const response = await ollama.chat({
            model: 'hiker',
            messages: messages
        });

        const reply = response.message.content;
        const modifiedReply = parseResponseToJson(reply)
        console.log('We got the response!');
        res.json({reply: modifiedReply});
        messages.push({ role: 'assistant', content: modifiedReply });
        await fs.writeFile(sessionFile, JSON.stringify(messages, null, 2))

    } catch (err) {
        console.error('Error processing query:', err);
        res.status(500).json({ error: 'Error processing query', details: err.message });
    }
});

export default router;

