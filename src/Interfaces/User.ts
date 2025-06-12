export interface User {
	id: number;
	name: string;
	email: string;
	password: string;
	accountType: AccountType;
}

export interface NewUser {
	name: string;
	email: string;
	password: string;
	accountType: AccountType;
}

export enum AccountType {
	Guest,
	User,
	Admin
}
