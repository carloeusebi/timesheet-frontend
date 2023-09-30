export interface Link {
  url: string;
  label: string;
  active: boolean;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
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
  projectId: number;
  activityId: number;
  project: string;
  activity: string;
  employee: string;
  activityStart: string;
  activityEnd: string;
  description: string;
}
