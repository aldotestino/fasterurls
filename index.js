const express = require('express');
const cors = require('cors');
const { nanoid } = require('nanoid');
const path = require('path');
const { getURL, createURL } = require('./db/urls');

const app = express();
app.use(express.static(path.join(__dirname, 'client', 'dist')));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to fasturls ⚡'
  });
});

app.get('/:alias', async (req, res, next) => {
  try {
    const { alias } = req.params;
    const url = await getURL(alias);
    res.redirect(url.url);
  } catch (err) {
    next(err);
  }
});

app.post('/urls', async (req, res, next) => {
  try {
    const url = req.body;
    if (!url.alias) {
      url.alias = nanoid(5);
    }
    url.alias = url.alias.toLowerCase();
    const inserted = await createURL(url);
    res.status(201);
    res.json(inserted);
  } catch (err) {
    next(err);
  }
});

/* eslint-disable no-unused-vars */
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: err.message
  });
});

const PORT = process.env.PORT || 4444;
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
