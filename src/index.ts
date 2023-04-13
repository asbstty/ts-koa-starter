import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import { PORT } from './config';
import AppRoutes from './routes';
import initSocket from './io';
import Engine from './io/engine';
const { createServer } = require("http");
const koaStatic = require('koa-static');
const path = require('path');

const app = new Koa();
const router = new Router();

app.use(koaStatic(
  path.join( __dirname,  './static')
))

//路由
AppRoutes.forEach(route => router[route.method](route.path, route.action));

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());
const httpServer = createServer(app.callback());
initSocket(httpServer);
const engine = new Engine();
engine.initHall();
httpServer.listen(PORT)

console.log(`应用启动成功 端口:${PORT}`);
