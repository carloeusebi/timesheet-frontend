export interface Link {
	url: string;
	label: string;
	active: boolean;
}

export interface User {
	id: number;
	name: string;
	email: string;
	role: {
		role: string;
	};
}

export interface LoginForm {
	email: string;
	password: string;
}

export interface Activity {
	id: number;
	name: string;
}

export interface Project {
	id: number;
	name: string;
	activities: Activity[];
	users: User[];
}

export interface Timesheet {
	id: number;
	project: Project;
	activity: Activity;
	user: User;
	activityStart: string;
	activityEnd: string;
	description: string;
}
