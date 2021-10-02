import Koa from 'koa';
import koaBodyParser from 'koa-bodyparser';
import koaCors from '@koa/cors';
import { router } from './api/routes';
import dotenv from 'dotenv';
import { RabbitLogger } from './api/services/RabbitLogger';
dotenv.config();

const app = new Koa();

app.use(koaCors());
app.use(koaBodyParser());

app.use(router.routes()).use(router.allowedMethods());

// logger test
app.use(async (ctx, next) => {
	if (ctx.url === '/') {
		console.log('got GET /');
		const logger = new RabbitLogger();
		logger.info('infoing rabbit');
		logger.debug({ test: 'testx' });
		ctx.status = 200;
		ctx.body = { ok: true };
	}

	next();
});

export default app;
