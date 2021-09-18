import KoaRouter from 'koa-router';
import { BtcController } from '../controllers/BtcController';
import AuthMiddleware from '../middleware/AuthMiddleware';
import extractJWTPayload from '../middleware/extractJWTPayload';
import { LocalBtcService } from '../services/LocalBtcService';
import { RemoteBtcService } from '../services/RemoteBtcService';
import { exceptionCatcher } from '../utils/controllerUtils';

const btcController = new BtcController(
	process.env.NODE_ENV === 'container'
		? new RemoteBtcService()
		: new LocalBtcService()
);

export default function (router: KoaRouter) {
	router.get(
		'/btcRate',
		extractJWTPayload,
		AuthMiddleware.requireUser,
		exceptionCatcher(btcController.getBtcRate)
	);
}
