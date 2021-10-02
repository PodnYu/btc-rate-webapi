import amqp from 'amqplib';

export type ExchangeType = 'direct' | 'fanout' | 'topic' | 'headers';

export class RabbitMQService {
	private static host: string;
	private static port: number;

	private static connection: amqp.Connection | null = null;
	private static channel: amqp.Channel;
	private static exchange: string;

	public static async connect(config: {
		host: string;
		port: number;
		exchange: { name: string };
	}) {
		this.host = config.host;
		this.port = config.port;
		this.exchange = config.exchange.name;

		console.log(`connecting to ${this.host}:${this.port}...`);
		try {
			this.connection = await amqp.connect(
				`amqp://${config.host}:${config.port}`
			);
			this.channel = await this.connection.createChannel();

			this.channel.assertExchange(this.exchange, 'direct', {
				durable: false,
			});

			console.log(`RabbitMQ connected successfully: ${this.host}:${this.port}`);
		} catch (err) {
			console.error(err);
			throw err;
		}
	}

	public static sendMessage(msg: string, severity: string): void {
		this.channel?.publish(this.exchange, severity, Buffer.from(msg));
	}

	public static connected(): boolean {
		return this.connection !== null;
	}

	public static async disconnect(): Promise<void> {
		await this.channel?.close();
		await this.connection?.close();
		this.connection = null;
	}
}
