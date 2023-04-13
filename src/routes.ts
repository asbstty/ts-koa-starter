import pockerController from "./controller/pocker-controller";

export default [
  {
    path: '/register',
    method: 'post',
    action: pockerController.register
  },
  {
    path: '/getTableList',
    method: 'get',
    action: pockerController.getTableList
  }
];
