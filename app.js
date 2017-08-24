const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const pad = require("pad");
var colors = require('colors');

const app = express();

app.use(express.static("public"))
app.use("/lib", express.static("node_modules/socket.io-client/dist"))
app.use("/lib", express.static("node_modules/jquery/dist"))

const w = 20;
var score = 0;

app.get("/answer/:question/:answer", function (req, res) {
  var question = parseInt(req.params.question);
  var answer = parseInt(req.params.answer);

  var text = pad((1 + question).toString(), w) + pad(quiz[question].answers[answer], w) + quiz[question].answers[quiz[question].correct];

  if (quiz[question].correct == answer) {
    score++;
    console.log(text.green);
  } else {
    console.log(text.red);
  }

  if (question == 9) {
    console.log(("Correct: " + score).rainbow);
    score = 0;
  }

  res.sendStatus(200);
});

const server = http.createServer(app);
const io = socketio(server);

io.on('connection', function(client){
  client.on('event', function(data){});
  client.on('disconnect', function(){});
});

server.listen(80, "0.0.0.0", function () {
  console.log(pad("Question", w) + pad("Answer", w) + "Correct")
});

quiz = [
  {
    question: "Vad heter ABBs tvåarmade robot som är designad att jobba tillsammans med människor?",
    answers: ["Frida", "Quasimodo", "YuMi"],
    correct: 2
  }, {
    question: "Hur många år var Wall-E den enda kvarvarande roboten på jorden?",
    answers: ["100", "300", "700"],
    correct: 2
  }, {
    question: "Vad är ursprungsbetydelsen av ordet robot?",
    answers: ["Slav", "Maskin", "Monster"],
    correct: 0
  }, {
    question: "Vilket år kom den första serietillverkade industriroboten?",
    answers: ["1951", "1961", "1971"],
    correct: 1
  }, {
    question: "Vad heter författaren till robottrilogin “Jag, robot”?",
    answers: ["Isaac Asimov", "George Orwell", "George Lucas"],
    correct: 0
  }, {
    question: "Hur många robotlagar finns det?",
    answers: ["3", "5", "7"],
    correct: 0
  }, {
    question: "Vad utmärker HAL 9000?",
    answers: ["Hans stora kropp", "Hans mörka röst", "Hans röda öga"],
    correct: 2
  }, {
    question: "Vad heter Skynets huvudmotståndare?",
    answers: ["Terminator", "John Connor", "Kyle Reese"],
    correct: 1
  }, {
    question: "Vad heter robotföreningen vid Linköpings Universitet?",
    answers: ["FIA", "IDA", "ANNA"],
    correct: 0
  }, {
    question: "I vilket land arrangerades robot-VM i år där Linköpings Universitet deltog i fotbollsgrenen?",
    answers: ["Tyskland", "Kina", "Japan"],
    correct: 2
  }
];
