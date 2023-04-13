import Socket from "./socket";
import { getSocketIo } from "src/io";
import { Server, Socket as SS } from "socket.io";
import pockerService from "src/service/pocker-service";
import { TableInfo, TABLE_STATUS, PLAYER_STATUS, SeatId } from "src/types";
const crypto = require('crypto');

export default class Engine {
  hallSocket: Socket
  chatSocket: Socket
  io: Server;
  constructor() {
    this.hallSocket = new Socket('/hall');
    this.chatSocket = new Socket('/chat');
  }
  initHall() {
    const tables: Array<TableInfo> = new Array(5).fill(0).map(item => ({
      id: crypto.randomUUID(),
      status: TABLE_STATUS.WAITING,
      players: []
    }))
    pockerService.updateTableList(tables);
    this.hallSocket.ns.on('connection', (socket: SS) => {
      socket.on('join', (arg, callback) => {
        const {roomId, userId, seatId} = arg as {roomId: string, userId: string, seatId: SeatId};
        this.hallSocket.joinRoom(roomId, socket.id); 
        const table = pockerService.getTableById(roomId);
        const player = pockerService.getUserById(userId);
        table.players.push({...player, ...{seatId, status: PLAYER_STATUS.SEATED}});       
        const tableList = pockerService.getTableList();
        this.hallSocket.emit('update', tableList);
      });
      socket.on('ready', (arg, callback) => {
        const {roomId, userId} = arg as {roomId: string, userId: string, seatId: SeatId};
        const table = pockerService.getTableById(roomId);
        const player = table.players.find(player => player.id === userId);
        player.status = PLAYER_STATUS.READY;
        const allReady = table.players.length === 3 && table.players.every(player => player.status === PLAYER_STATUS.READY);
        if(allReady) {
          table.status = TABLE_STATUS.IN_GAME;
        }
        const tableList = pockerService.getTableList();
        this.hallSocket.emit('update', tableList);
      });
      socket.on('cancel', (arg) => {
        const {roomId, userId} = arg as {roomId: string, userId: string, seatId: SeatId};
        const table = pockerService.getTableById(roomId);
        const player = table.players.find(player => player.id === userId);
        player.status = PLAYER_STATUS.SEATED;
        const tableList = pockerService.getTableList();
        this.hallSocket.emit('update', tableList);
      });
      socket.on('leave', (arg) => {
        const {roomId, userId} = arg as {roomId: string, userId: string, seatId: SeatId};
        const table = pockerService.getTableById(roomId);
        const playerIndex = table.players.findIndex(player => player.id === userId);
        table.players.splice(playerIndex, 1);
        const tableList = pockerService.getTableList();
        this.hallSocket.emit('update', tableList);
      });
    })
    
  }
  initChat() {
    this.chatSocket.ns.on('connection', (socket: SS) => {
      socket.on('new', (arg, callback) => {

      })
    })
  }
}