const express = require('express');
const fs = require('fs')
const helmet = require("helmet");
const https = require('https')
var sslOptions = {
key: fs.readFileSync('key.pem'),
cert: fs.readFileSync('cert.pem'),
passphrase: 'rtyu'
};

var app = express();
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://code.highcharts.com/highcharts.js","https://maps.googleapis.com", "https://code.jquery.com", "https://cdnjs.cloudflare.com", "https://stackpath.bootstrapcdn.com", "https://fonts.googleapis.com"],
      connectSrc: ["'self'", "http://localhost:5000", "mongodb+srv://your-mongodb-url"],
      frameAncestors: ["'none'"],
      "Cross-Origin-Embedder-Policy": "require-corp",
      imgSrc: ["'self'", "data:"],
      styleSrc: ["'self'","https://maxcdn.bootstrapcdn.com", "https://stackpath.bootstrapcdn.com", "https://fonts.googleapis.com", "'unsafe-inline'"],
      fontSrc: ["'self'", "https://maxcdn.bootstrapcdn.com","https://stackpath.bootstrapcdn.com","https://fonts.gstatic.com", "https://fonts.googleapis.com", "data:"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: []
    },
    reportOnly: false
  }
}));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const port = 3000;
const base = `${__dirname}/public`;
app.use(express.static('public'));

var server = https.createServer(sslOptions, app).listen(port, function(){
  console.log("Express server listening on port " + port);
  });
  app.get('/', function (req, res) {
    res.sendFile(`${base}/welcome.html`);
  });
  app.get('/Add_device', function (req, res) {
    res.sendFile(`${base}/Add_device.html`);
  });
  app.get('/monitor_Dev', function (req, res) {
    res.sendFile(`${base}/monitor_Dev.html`);
  });
  app.get('/dev_preference', function (req, res) {
    res.sendFile(`${base}/dev_preference.html`);
  });
  app.get('/remove_Dev', function (req, res) {
    res.sendFile(`${base}/remove_Dev.html`);
  });
  app.get('/lighting', function (req, res) {
    res.sendFile(`${base}/lighting.html`);
  });
  app.get('/airc', function (req, res) {
    res.sendFile(`${base}/airc.html`);
  });
  app.get('/security', function (req, res) {
    res.sendFile(`${base}/security.html`);
  });

