export interface IToast {
	subject?: string;
	message: string;
	type: 'success' | 'error' | 'info' | 'warning' | 'notification';
	duration?: number;
	id?: number;
}
