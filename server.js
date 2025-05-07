const express = require('express');
const app = express();
const PORT = process.env.PORT || 80;

app.use(express.json());

// Vérification du webhook (GET)
app.get('/webhook', (req, res) => {
  const VERIFY_TOKEN = "dare123";

  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token && mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log("✅ Webhook vérifié !");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Réception des messages (POST)
app.post('/webhook', (req, res) => {
  console.log("📥 Webhook reçu :", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur en écoute sur http://localhost:${PORT}`);
});
