import { setItem, getItem } from "src/utils/storage";
import { TableInfo, Player } from "src/types";
const crypto = require('crypto');

class PockerService {
  register = (userName) => {
    const users = getItem('users') || [];
    const user = {
      id: crypto.randomUUID(),
      name: userName,
      icon: 'blue'
    }
    users.push(user);
    setItem('users', users);
    return user.id;
  }
  getTableList = (): Array<TableInfo> => {
    return getItem('tableList')
  }
  updateTableList = (tableList: Array<TableInfo>) => {
    setItem('tableList', tableList)
  }
  getTableById = (id: string): TableInfo => {
    const tableList = this.getTableList();
    return tableList.find(table => table.id === id);
  }
  getUsers = ():Array<Player> => {
    return getItem('users');
  }
  getUserById = (id: string): Player => {
    const users = this.getUsers();
    return users.find(user => user.id === id);
  }
}
export default new PockerService();