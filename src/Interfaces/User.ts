export interface User {
	id: number;
	name: string;
	email: string;
	password: string;
	accountType: number;
}

export interface NewUser {
	name: string;
	email: string;
	password: string;
	accountType: number;
}
