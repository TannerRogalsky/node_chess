$(function(){
  console.log("test");

  var x = 3;
  var y = 3;
  var grid = new Array(x);
  for (var i = grid.length - 1; i >= 0; i--) {
    grid[i] = new Array(y);
  };

  var $tiles_parent = $("#tiles_parent");
  for (var i = 0; i < grid.length; i++) {
    var row = grid[i];
    for (var j = 0; j < row.length; j++) {
      $tiles_parent.append('<div class="tile" data-x="' + i + '" data-y="' + j + '"></div>');
    };
  };

  // var host = location.origin.replace(/^http/, 'ws')
  // var ws = new WebSocket(host);
  // ws.onmessage = function (event) {
  //   var li = document.createElement('li');
  //   li.innerHTML = JSON.parse(event.data);
  //   document.querySelector('#pings').appendChild(li);
  // };
});