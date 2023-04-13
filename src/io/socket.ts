import { Namespace } from "socket.io";
import { getSocketIo } from ".";

export default class Socket {
  ns: Namespace;
  constructor(namespace) {
    const io = getSocketIo();
    this.ns = io.of(namespace);
    this.ns.on('connection', socket => {
      console.log(`${socket.id} connect with ${namespace}`)
    })
  }
  joinRoom(roomName, socketId) {
    this.ns.in(socketId).socketsJoin(roomName);
  }
  leaveRoom(roomName, socketId) {
    this.ns.in(socketId).socketsLeave(roomName);
  }
  emit(eventName, content, roomName = '', socket = null) {
    if(socket) {
      socket.emit(eventName, content);
    } else {
      if(roomName) {
        this.ns.in(roomName).emit(eventName, content)
      } else {
        this.ns.emit(eventName, content)
      }
    }
  }
}