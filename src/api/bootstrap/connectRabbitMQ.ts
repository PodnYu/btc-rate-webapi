import { RabbitMQService } from '../services/RabbitMQService';

export async function connect() {
	const host = process.env.RABBITMQ_HOST || 'localhost';
	const port = +(process.env.RABBITMQ_PORT || '5672');
	const exchange = {
		name: process.env.RABBITMQ_EXCHANGE_NAME || 'logs_exchange',
	};

	let tryCount = 10;

	while (
		(await RabbitMQService.connect({ host, port, exchange })
			.then(() => true)
			.catch(() => false)) === false
	) {
		if (tryCount === 0) throw new Error('unable to connect to RabbitMQ');
		console.log(`failure, reconnection: ${--tryCount}`);

		await new Promise((res) => setTimeout(res, 1500));
	}
}
