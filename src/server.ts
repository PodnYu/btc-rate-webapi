import dotenv from 'dotenv';
dotenv.config();
import app from './app';
import { connect as connectToRabbitMQ } from './api/bootstrap/connectRabbitMQ';

const PORT = process.env.PORT || 5007;

const start = async () => {
	await connectToRabbitMQ();

	app.listen(PORT, () => {
		console.log(`listening on 127.0.0.1:${PORT}...`);
	});
};

start();
