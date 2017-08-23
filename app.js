const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const app = express();

app.use(express.static("public"))
app.use("/lib", express.static("node_modules/socket.io-client/dist"))
app.use("/lib", express.static("node_modules/jquery/dist"))

app.get("/answer/:question/:answer", function (req, res) {
  console.log(req.param("question"), " -> ", req.param("answer"));
  res.send(200);
});

const server = http.createServer(app);
const io = socketio(server);

io.on('connection', function(client){
  client.on('event', function(data){});
  client.on('disconnect', function(){});
});

server.listen(3000, function () {
  console.log("Listening on port 3000");
});
