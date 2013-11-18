$(function(){
  var onDrop = function(source, target, piece, newPos, oldPos, orientation) {
    ws.send(source + target);
  };

  var board = new ChessBoard('board', {
    draggable: true,
    // dropOffBoard: 'trash',
    // sparePieces: true
    position: "start",
    onDrop: onDrop,
  });

  var host = location.origin.replace(/^http/, 'ws')
  var ws = new WebSocket(host);
  ws.onmessage = function (event) {
    console.log(event.data);
    board.position(event.data);
  };
});