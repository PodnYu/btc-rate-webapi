require('dotenv').config();
const Koa = require('koa');
const koaCors = require('@koa/cors');
const koaBodyParser = require('koa-bodyparser');
const { router } = require('./routes');

const PORT = process.env.PORT || 5008;

const app = new Koa();

app.use(koaCors());
app.use(koaBodyParser());

router.prefix('/api');
app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => {
	console.log(`litening on 127.0.0.1:${PORT}...`);
});
