import { Server } from "socket.io";

/* 
  this file is used to initialize the socket io 
  _io --> instance variable 
*/

class socketService {
  // class allows to create new instance without writting the same code
  private _io: Server; // this _io is used to do handle realtime comms , is listens and broadcasts the message to everyone on the server
  constructor(io: Server) {
    console.log("new server initailzied");
    this._io = io;
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
      socket.on("event:message", async ({ message }: { message: String }) => {
        // now a event listener is esatblished for the uniqe connected client
        console.log(`New Message, ${message}`);
      });
    });
  }
}
/*
  TODO : 1. get fronend here 
  TODO : 2. add more comments to explain what was done
  TODO : 3. 
  
*/

export default socketService;
