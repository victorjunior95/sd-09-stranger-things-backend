require('dotenv').config();
const express = require('express');
const cors = require('cors');

const strangerThingsDataset = require('./data/dataset/stranger-things-characters.json');
const StrangerThingsRepository = require('./data/repository/StrangerThings');
const StrangerThingsService = require('./services/StrangerThings');

const app = express();

const { PORT = 3000, UPSIDEDOWN_MODE } = process.env;

const strangerThingsRepository = new StrangerThingsRepository(
  strangerThingsDataset,
);
const strangerThingsService = new StrangerThingsService(
  strangerThingsRepository,
);

app.use(cors());

const hereIsTheUpsideDown = /^true$/.test(UPSIDEDOWN_MODE);

app.get('/', (req, res) => {
  const characters = strangerThingsService.search(
    req.query,
    hereIsTheUpsideDown,
  );

  res.status(200).json({ characters, PORT, hereIsTheUpsideDown });
});

app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
});
