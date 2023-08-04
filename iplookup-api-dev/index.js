const express = require('express');
const app = express();
const requestIp = require('request-ip');
const cors = require('cors');

function extractIPv4(ip) {
  const ipv6Regex = /^::ffff:(\d+\.\d+\.\d+\.\d+)$/;
  const match = ipv6Regex.exec(ip);
  return match ? match[1] : null;
}

app.use(cors({
  origin: '*'
}));

app.get('/ip', function(request, response) {
  const clientIp = requestIp.getClientIp(request);
  const ipv4Address = extractIPv4(clientIp);

  response.json({ ipv4: ipv4Address });
});

app.listen(80);
