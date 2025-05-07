const express = require('express');
const app = express();
const PORT = process.env.PORT || 80;

app.use(express.json());

// Optional homepage check
app.get('/', (req, res) => {
  res.send("✅ Webhook server is running");
});

// Webhook verification
app.get('/webhook', (req, res) => {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token && mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log("✅ Webhook verified!");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Receiving webhook events
app.post('/webhook', (req, res) => {
  console.log("📥 Webhook event received:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});
