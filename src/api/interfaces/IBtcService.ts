export interface IBtcService {
	getBTCToUAHExchange(): Promise<{ sell: number; buy: number }>;
}
