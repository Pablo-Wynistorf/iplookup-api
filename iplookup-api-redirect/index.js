const express = require('express');
const app = express();
const redirect = express();
const requestIp = require('request-ip');
const cors = require('cors');
const redirectUrl = 'https://hub.docker.com/r/pablo06/iplookup-api';

redirect.use(function(request, response, next) {
  if (process.env.NODE_ENV != 'development' && !request.secure) {
     return response.redirect("https://" + request.headers.host + request.url);
  }
  next();
})

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

app.get('/ip', function(request, response) {
  const clientIp = requestIp.getClientIp(request);
  const ipv4Address = extractIPv4(clientIp);

  response.json({ ipv4: ipv4Address });
});

redirect.listen(80);
app.listen(443);
