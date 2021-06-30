

class SocketConfig {
    constructor(http) {         
        
        this.socketInit(http);
    }
    socketInit(http){
     const Server = require("socket.io");
     const socketServer = new Server(http, { origins: "*:*" });
         let io = socketServer.of("/chat");
         io.on("connection",this.clientConfiguration)
    }
    async clientConfiguration(clientsocket){
       console.log("client has been connected");
        console.log("socket",clientsocket.id);
        try{
        clientsocket.on("SEND_MESSAGE",(message)=>{ 
            clientsocket.to(message["msg_toId"]).emit("RECEVIE_MESSAGE",message);
            clientsocket.to(message["msg_fromId"]).emit("RECEVIE_MESSAGE_ACK",message);

        })
        clientsocket.on("hello",(data)=>{
            console.log(data);
            clientsocket.emit("ping","hello from server");
       });
       clientsocket.on("test",(data)=>{
        console.log(data);
        clientsocket.emit("ping","hello from server");
   });
       clientsocket.on("pong",(data)=>{
        console.log(data);
        clientsocket.emit("ping","hello from server");
   });
    }catch(err){
        console.log("err",err)
    }

    }
} 

module.exports = SocketConfig;
