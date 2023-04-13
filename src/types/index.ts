export type Player = {
  id: string;
  name: string;
  icon?: string;
}
export enum CardType {
  Spades,
  Hearts,
  Diamonds,
  Clubs,
  SmallJoker,
  BigJoker,
}
export type CardName = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A' | 'JOKER';

export type Card = {
  cardType: CardType;
  cardName: CardName;
}
export enum TABLE_STATUS {
  WAITING = 0,
  IN_GAME,
}
export enum PLAYER_STATUS {
  HANGING = 0,
  SEATED,
  READY,
  IN_GAME,
  BILLING,
}
export type TableInfo = {
  id: string;
  status: TABLE_STATUS;
  players: Array<Player & {seatId:SeatId} & {status: PLAYER_STATUS}>;
}
export enum GAME_STATUS {
  CALLING = 0,  //等待中
  IN_GAME,
  BILLING,
}
export enum PLAYER_ROLE {
  HOST = 0,
  SLAVE,
}
export type SeatId = 1 | 2 | 3;
export type GamePlayer = Player & {role: PLAYER_ROLE} & {seatId:SeatId};
export type GameItem = {
  player: Player & PLAYER_ROLE & SeatId,
  cards: Array<Card>
}
export type CallScore = 0 | 1 | 2 | 3;
export type GameInfo = {
  id: string;
  status: GAME_STATUS;
  pockerStack: Array<GameItem>; //出牌的序列
  players: Array<GameItem>;
  curPlayer: string;
  curCntDown: number;
  totalCntDown: number;
  roundIndex: number;
  bottomDecks: Array<Card>;  //底牌
}

type getTableList = () => Array<TableInfo>;
/**
 * 用户注册
 * @argument username, icon
 * @returns userid
 */
type register = (username: string, icon?: string) => string;

/**
 * 加入牌桌
 * @argument userId, roomId, seatId
 * @returns joinSuccess
 */
type join = (userId: string, roomId: string, seatId: number) => boolean;

/**
 * 玩家准备
 * @argument userId, roomId
 * @returns readySuccess
 */
type ready = (userId: string, roomId: string) => boolean;

/**
 * 玩家取消
 * @argument userId, roomId
 * @returns cancelSuccess
 */
type cancel = (userId: string, roomId: string) => boolean;

/**
 * 玩家离开
 * @argument userId, roomId
 * @returns leaveSuccess
 */
type leave = (userId: string, roomId: string) => boolean;

/**
 * 获取游戏信息
 * @argument userId, gameId
 * @returns GameInfo
 */
type getGameInfo = (userId: string, gameId: string) => GameInfo;

/**
 * 叫分(不叫0分，后面的人只能比前面的人叫更高分，3分直接开始)
 * @argument userId, gameId, score
 * @returns GameInfo
 */
type call = (userId: string, gameId: string, score: CallScore) => boolean;

/**
 * 打牌
 * @argument userId, gameId, cards
 * @returns dropSuccess
 */
type dropCard = (userId: string, gameId: string, cards: Array<Card>) => boolean;