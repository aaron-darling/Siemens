const express = require('express');
const templatesFilePath = require('./data/templates.json');
const cors = require("cors");

const app = express();

app.use(cors());

app.get('/api/templates', (req, res) => {
  res.json(templatesFilePath);
});

app.listen(5000, () => {
  console.log('Viewer has started on port 5000');
});