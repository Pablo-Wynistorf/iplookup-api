const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({
    origin: '*'
}));

const redirectUrl = 'https://hub.docker.com/r/pablo06/iplookup-api';

app.get('/', (res) => {
  res.redirect(301, redirectUrl);
});

app.get('/ip', (req, res) => {
  const xForwardedFor = req.get('X-Forwarded-For');

  res.json({ 'ipv4': xForwardedFor });
});

app.listen(80);
