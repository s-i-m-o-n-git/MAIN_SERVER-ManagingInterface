
const express = require('express');
const app = express();
const PORT = 4000;

app.use(express.json());

let statusStore = [];

// Endpoint pour recevoir l’état depuis les serveurs
app.post('/report', (req, res) => {
  const { id, state } = req.body;
  const index = statusStore.findIndex(m => m.id === id);
  if (index !== -1) {
    statusStore[index] = { id, state, online: true };
  } else {
    statusStore.push({ id, state, online: true });
  }
  res.sendStatus(200);
});

// Endpoint pour que l’interface récupère les données
app.get('/status', (req, res) => {
  res.json(statusStore);
});

// Reset automatique de l’état à offline toutes les 15 secondes
setInterval(() => {
  statusStore = statusStore.map(m => ({ ...m, online: false }));
}, 15000);

app.listen(PORT, () => {
  console.log(`🌐 Main Serveur démarré sur http://localhost:${PORT}`);
});
