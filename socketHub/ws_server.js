var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({ port: 9090 });
var express = require('express');
var app = express();

var boardClientsInfo = {};

wss.on('connection', function (client) {
    client.send("hello from qoco socket hub server");
    client.on('message',function(data){
      var info = data.split(';');
      var group = info[0];
      var id = info[1];
      
      // if client is the device itself
        if(!boardClientsInfo[group]){
          boardClientsInfo[group] = {};
        }
          boardClientsInfo[group][id] = client;
          console.log(boardClientsInfo);
        
    });         
 });

// Start REST server on port 8081
var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Websocket event broadcaster REST API listening on http://%s:%s", host, port);
});
 
// Broadcast updates to all WebSocketServer mobile clients
app.get('/alert', function (req, res) {
   var id = req.query["id"];
   var group = req.query["group"];
   //var ctype = req.query["type"];

  if(boardClientsInfo[group]){
      
      //broadcast to all clients from the same group
      for(var key in boardClientsInfo[group]){
          if(boardClientsInfo[group] && key == id){
                  boardClientsInfo[group][key].send(id);
          }
      }
  }
   res.sendStatus(200);
});

