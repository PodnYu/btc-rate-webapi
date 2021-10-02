const amqp = require('amqplib');
require('dotenv').config();

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || '5672';
const exchange = process.env.EXCHANGE_NAME || 'logs_exchange';
const severities = JSON.parse(process.env.SEVERITY_LEVELS) || ['info'];

let disconnect = null;

async function connect() {
	let connection = null;
	try {
		console.log(`connecting to ${host}:${port}...`);
		let tryCount = 10;

		while (
			(connection = await amqp
				.connect(`amqp://${host}:${port}`)
				.catch(() => null)) === null
		) {
			if (tryCount === 0) throw new Error('unable to connect to RabbitMQ');
			console.log(`failure, reconnection: ${--tryCount}`);

			await new Promise((res) => setTimeout(res, 1500));
		}

		console.log(`connected to ${host}:${port}`);

		const channel = await connection.createChannel();

		channel.assertExchange(exchange, 'direct', { durable: false });

		severities.forEach((severity) => {
			channel.assertQueue('', { exclusive: true }).then((q) => {
				channel.bindQueue(q.queue, exchange, severity);

				console.log(
					`listening for messages with [${severity.toUpperCase()}] severity...`
				);
				channel.consume(q.queue, (msg) => {
					console.log(
						`[${severity.toUpperCase()}]: ${msg.content.toString()} <- ${exchange}`
					);

					channel.ack(msg);
				});
			});
		});
	} catch (err) {
		console.error(err);
	} finally {
		return connection?.close.bind(connection);
	}
}

connect().then((closeFn) => (disconnect = closeFn));

process.on('SIGINT', () => {
	disconnect && disconnect();
	process.exit(0);
});
