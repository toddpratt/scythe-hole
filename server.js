
const express = require('express');
const bodyParser = require('body-parser ');
const request = require('request');


class MessageList {
  constructor() {
    this.messages = [];
  }

  add(nick, message) {
    var timestamp = new Date();
    this.messages.push({nick, message, timestamp});
    if(this.messages.length > 10) {
      this.messages = this.messages.slice(this.messages.length - 10);
    }
  }
};

var channels = {};
const app = express();

// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/:id", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/", function (req, res) {
  if(req.params.id) {
    channels[req.params.id] = new MessageList();
  }
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/messages/:id", (req, res, next) => {
  var id = res.params.id;
  if(!id || !channels[id]) {
    res.status(500).send("channel not found");
    return;
  }
  res.send(channels[id].messages);
});

app.post("/message/:id", (req, res, next) => {
  var id = res.params.id;
  if(!req.body.nick || req.body.nick.length < 1) {
    res.status(500).send("no nickname specified");
  } else if(!req.body.message || req.body.message.length < 1) {
    res.status(500).send("no message specified");
  } else if(!channels[id]) {
    res.status(500).send("no message specified");
  } else {
    if(!id) {
      channels[id] = new MessageList();
    }
    channels[id].add(req.body.nick, req.body.message);
    res.status(200).send("message received");
  }
});

app.listen(3000);
