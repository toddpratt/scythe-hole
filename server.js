
const express = require('express');
const irc = require('irc');

const app = express();

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/messages", (req, res, next) => {
  res.json(messages);
});

app.listen(3000);
