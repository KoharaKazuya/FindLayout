const fs = require('fs');
const reducer = require('../src/reducers');
const { JOIN_ROOM, UPDATE_ROOM, CANVAS_UPDATE, BOXES_UPDATE } = require('../src/actionTypes');

const server = require('http').createServer((req, res) => {
  // /js/app.js へのアクセスはフロント用 JS を返すように
  if (req.url === '/js/app.js') {
    res.writeHead(200, { 'Content-Type': 'text/javascript' });
    res.end(fs.readFileSync('./build/bundle.js'));
    return;
  }
  if (req.url === '/css/app.css') {
    res.writeHead(200, { 'Content-Type': 'text/css' });
    res.end(fs.readFileSync('./build/bundle.css'));
    return;
  }

  res.writeHead(200, {
    'Content-Type': 'text/html',
  });
  res.end(fs.readFileSync('./lib/index.html'));
}).listen(8888);

const io = require('socket.io').listen(server);

// roomId と作業部屋内の状態を対応させたマップ
const roomStateMap = {};

io.sockets.on('connection', socket => {
  let roomId = '';

  // アクション
  socket.on('action', action => {
    // actionType によって行う特殊な処理
    switch (action.type) {
      case JOIN_ROOM:
        roomId = action.roomId;
        socket.join(roomId);

        socket.emit('action', {
          type: UPDATE_ROOM,
          roomId,
        });

        break;
      default:
        // no-op
    }

    const prevState = roomStateMap[roomId];
    const currState = reducer(prevState, action);
    roomStateMap[roomId] = currState;

    // アクションによって変更された状態を全クライアントへ通知
    io.to(roomId).emit('action', {
      type: BOXES_UPDATE,
      boxes: currState.editor.boxes,
      boxesOrder: currState.editor.boxesOrder,
    });
    io.to(roomId).emit('action', {
      type: CANVAS_UPDATE,
      canvas: currState.editor.canvas,
    });
  });
});
