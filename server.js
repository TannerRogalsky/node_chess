var WebSocketServer = require('ws').Server
  , http = require('http')
  , express = require('express')
  , app = express()
  , port = process.env.PORT || 5000;

app.use(express.static(__dirname + '/public'));

var server = http.createServer(app);
server.listen(port);

console.log('http server listening on %d', port);

function convertToMoveObject(move) {
  if (typeof move == 'object') {
    return move;
  }
  var result = {};
  result.from = move.substring(0, 2);
  result.to = move.substring(2, 4);
  if (move.length > 4) {
    result.promotion = move.substring(4);
  }
  return result;
}

var wss = new WebSocketServer({server: server});
console.log('websocket server created');
wss.on('connection', function(ws) {
    var UCI = require('uci').UCI;
    var uci = new UCI();
    var os = require('os');
    var Chess = require('chess.js').Chess;
    var game = new Chess();

    console.log('websocket connection open');

    // UCI start
    // uci.on('ready', function(){
    //   uci.startNewGame(uci.getAvailableEngines()[0], 'black', 10, uci.getAvailableBooks()[0]);
    // });
    // uci.on('newgame', function () {
      console.log(game.fen());
      ws.send(game.fen());
    // });

    // uci.on('moved', function (move) {
    //   game.move(move);
    //   ws.send(game.fen());
    // });

    // uci.on('error', function (message) {
    //   console.log('Error:' + message);
    // }).on('exit', function (message) {
    //   console.log('Exiting:' + message);
    // }).on('gameends', function (result, reason) {
    //   console.log('Game ends with result ' + result + ' because ' + reason);
    //   uci.shutdown();
    //   process.exit();
    // });

    // ws.on('message', function(message){
    //   console.log(message);
    //   var move = convertToMoveObject(message);
    //   game.move(move);
    //   uci.move(move);
    // });

    // ws.on('error', function(error){
    //   console.log(error);
    // });

    // ws.on('close', function() {
    //   console.log('websocket connection close');
    // });
});

wss.on("error", function(error){
  console.log(error);
});