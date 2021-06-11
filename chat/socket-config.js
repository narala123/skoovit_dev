

class SocketConfig {
    constructor(http) {         
        
        this.socketInit(http);
    }
    socketInit(http){
        const { Server } = require("socket.io");
         const socket = new Server(http,{ origins: "*:*" });
         let io = socket.of("/chat");
         io.on("connection",this.clientConfiguration)
    }
    async clientConfiguration(socket){
        socket.on("pong",(data)=>{
            console.log("this is from client",data)
            socket.emit("ping","hello from server");
       });
    }
} 

module.exports = SocketConfig;