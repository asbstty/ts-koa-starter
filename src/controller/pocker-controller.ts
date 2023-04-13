import pockerService from "src/service/pocker-service";

class PockerController {
  register = async ctx => {
    const {userName} = ctx.request.body;
    ctx.body = pockerService.register(userName);
  };

  getTableList = async ctx => {
    const tableList = pockerService.getTableList();
    console.log('tableList>>>>', tableList);
    ctx.body = {
      data: tableList
    }
  }
}

export default new PockerController();
