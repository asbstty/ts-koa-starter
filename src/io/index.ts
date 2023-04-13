import { Server } from "socket.io";
let io: Server = null;
export default function initSocket(httpServer):Server {
  if(!io) {
    io = new Server(httpServer, { /* options */ })
  }
  return io;
}

export function getSocketIo():Server {
  return io;
}
