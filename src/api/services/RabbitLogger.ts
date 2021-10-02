import { ILogger } from '../interfaces/ILogger';
import { RabbitMQService } from './RabbitMQService';

export type Severity = 'info' | 'warn' | 'debug' | 'error';
type Msg = { date: Date; msg?: string; [k: string]: any };

export class RabbitLogger implements ILogger {
	constructor() {
		if (!RabbitMQService.connected()) throw new Error('RabbitMQ not connected');
	}

	info(obj: any): void {
		console.log('info');
		const msg = this.format(obj);
		RabbitMQService.sendMessage(msg, 'info');
	}

	debug(obj: any): void {
		console.log('debug');
		const msg = this.format(obj);
		RabbitMQService.sendMessage(msg, 'debug');
	}

	warn(obj: any): void {
		console.log('warn');
		const msg = this.format(obj);
		RabbitMQService.sendMessage(msg, 'warn');
	}

	error(obj: any): void {
		console.log('error');
		const msg = this.format(obj);
		RabbitMQService.sendMessage(msg, 'error');
	}

	private format(obj: any): string {
		let msgObj: Msg = { date: new Date() };

		if (typeof obj === 'string' || typeof obj === 'number') {
			msgObj.msg = obj.toString();
		}

		if (typeof obj === 'object') {
			msgObj = { ...msgObj, ...obj };
		}

		return this.stringify(msgObj);
	}

	private stringify(obj: Msg): string {
		return JSON.stringify(obj);
	}
}
