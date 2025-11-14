import { createServer } from "http";
import { Server } from "socket.io";
import socketService from "./services/sokcet.js";

const PORT = process.env.PORT || 8080;
const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: " * ",
    methods: ["GET", "POST"],
  },
});
const socketServices = new socketService(); // initializing the server with http
socketServices.io.attach(httpServer); // attaching http server method above
httpServer.listen(PORT, () => {
  console.log(`server is running at PORT: ${PORT} from apps/server/index.ts`);
});
