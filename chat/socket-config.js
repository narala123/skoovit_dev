

class SocketConfig {
    constructor(http) {         
        
        this.socketInit(http);
    }
    socketInit(http){
        const  socket = require("socket.io")(http, {cors: {
            origin: '*',
          }
        });
        // const socket = new Server();
         let io = socket.of("/chat");
         io.on("connection",this.clientConfiguration)
    }
    async clientConfiguration(socket){
       //console.log(JSON.parse(socket.handshake.query.data));
        let obj = JSON.parse(socket.handshake.query.data)
        socket.userId = obj.userId;
        socket.join(obj.userId);
        socket.on("SEND_MESSAGE",(message)=>{ 
            socket.to(message["msg_toId"]).emit("RECEVIE_MESSAGE",message);
            socket.to(message["msg_fromId"]).emit("RECEVIE_MESSAGE_ACK",message);

        })
        socket.on("pong",(data)=>{
           socket.to(socket.user).emit()
            socket.emit("ping","hello from server");
       });

    }
} 

module.exports = SocketConfig;