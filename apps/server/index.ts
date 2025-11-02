import { createServer } from "http";
import { Server } from "socket.io";

const PORT = process.env.PORT || 8080;
const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: " * ",
    methods: ["GET", "POST"],
  },
});
httpServer.listen(PORT, () => {
  console.log(`server is running at PORT: ${PORT} from apps/server/index.ts`);
});
