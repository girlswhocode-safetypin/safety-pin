 let express = require('express');
 let app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
app.use(express.static('resources'))
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	socket.on('disconnect', function(){
    console.log('user disconnected');
  });

	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
    console.log('message: ' + msg);
  });
  console.log('a user connected');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});