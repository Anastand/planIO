import { Server } from "socket.io";
import { Redis } from "ioredis";
import { json } from "stream/consumers";
/* 
  this file is used to initialize the socket io 
  _io --> instance variable 
*/
const valredis_aiven_URl =
  "rediss://default:AVNS_L4h1ca1mG9TQm_KgqlK@valkeyredis-7ab8ed8-knownindie-ab24.e.aivencloud.com:13056";
const pub = new Redis(valredis_aiven_URl);
const sub = new Redis(valredis_aiven_URl);

class socketService {
  // class allows to create new instance without writting the same code
  private _io: Server; // this _io is used to do handle realtime comms , is listens and broadcasts the message to everyone on the server
  constructor(io: Server) {
    console.log("new server initailzied");
    this._io = io;
    sub.subscribe("message");
  }

  get io() {
    // aslo a getter fucntion
    // this is so that private vairabele _io can be accessed  outside and also by other fucntions  , TODO: what more benifit is still unkonwn
    return this._io;
  }

  public listnerInit() {
    const io = this.io;
    console.log("init listener available >>>...");
    io.on("connect", (socket) => {
      // 'socket' is specific to the newly- uniqe -connected client
      console.log(`new socket connection established `, socket.id);
      socket.on(
        "event:message",
        async (data: { message: string; username: string }) => {
          // Properly relay both fields
          console.log(`New Message`, data);
          await pub.publish("message", JSON.stringify(data));
        }
      );
    });

    sub.on("message", (channel, message) => {
      if (channel == "message") {
        io.emit("message", message);
      }
    });
  }
}
/*

  
*/

export default socketService;
