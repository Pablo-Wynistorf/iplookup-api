const express = require('express');
const app = express();
const requestIp = require('request-ip');
const cors = require('cors');
const fs = require('fs');
const redirectUrl = 'https://hub.docker.com/r/pablo06/iplookup-api';

app.get('/', (req, res) => {
  res.redirect(301, redirectUrl);
});

app.use(cors({
  origin: '*'
}));

function extractIPv4(ip) {
  const ipv6Regex = /^::ffff:(\d+\.\d+\.\d+\.\d+)$/;
  const match = ipv6Regex.exec(ip);
  return match ? match[1] : null;
}

function logRequest(req, res, next) {
  const clientIp = requestIp.getClientIp(req);
  const ipv4Address = extractIPv4(clientIp);

  const logMessage = `${new Date().toISOString()} - Request from ip: ${ipv4Address}\n`;
  fs.appendFile('/app/log/log.txt', logMessage, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    }
  });

  next();
}

app.get('/ip', logRequest, function (req, res) {
  const clientIp = requestIp.getClientIp(req);
  const ipv4Address = extractIPv4(clientIp);

  res.json({ ipv4: ipv4Address });
});

app.listen(80);
