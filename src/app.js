const Koa = require('koa');
const koaBodyParser = require('koa-bodyparser');
const koaCors = require('@koa/cors');
const { router } = require('./api/routes');
require('dotenv').config();

const app = new Koa();

app.use(koaCors());
app.use(koaBodyParser());

app.use(router.routes()).use(router.allowedMethods());

module.exports = app;
