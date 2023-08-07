export enum AppRoute {
  Intro = '/',
  Main = '/main',
  Register = '/register',
  QuestionnaireCoach = '/questionnaire-coach',
  QuestionnaireUser = '/questionnaire-user',
  CoachPersonalAccount = 'coach-personal-account',
  Login = '/login',
  Favorites = '/favorites',
  Room = '/offers/:id',
  NotFound ='*',
}

export enum APIRoute {
  Login = '/users/login',
  Logout = '/users/logout',
  Register = '/users/register',
  CheckUser= '/users/login/auth',
  CheckEmail = '/users/check/email',
  Upload = '/files/upload',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum UserRole {
  Coach = 'Coach',
  User = 'User',
}

export const ROLES: string[] = Object.values(UserRole);

export enum UserRoleText {
  Coach = 'Я хочу тренировать',
  User = 'Я хочу тренироваться',
}

export const TEXT_ROLES: string[] = Object.values(UserRoleText);

export enum UserLocation {
  Pionerskaya = 'Pionerskaya',
  Petrogradskaya = 'Petrogradskaya',
  Udelnaya = 'Udelnaya',
  Zvezdnaya = 'Zvezdnaya',
  Sportivnaya = 'Sportivnaya',
}

export const LOCATIONS: string[] = Object.values(UserLocation);

export enum UserGender {
  Male = 'Male',
  Female = 'Female',
  NoMatter = 'NoMatter',
}

export const GENDERS: string[] = Object.values(UserGender);

export enum NameSpace {
  Workout = 'WORKOUT',
  User = 'USER',
}

export enum UserLevel {
  Beginner = 'Beginner',
  Amateur = 'Amateur',
  Professional = 'Professional',
}

export const LEVELS: string[] = Object.values(UserLevel);

export enum WorkoutType {
  Yoga = 'Yoga',
  Running = 'Running',
  Boxing = 'Boxing',
  Stretching = 'Stretching',
  Crossfit = 'Crossfit',
  Aerobics = 'Aerobics',
  Pilates = 'Pilates',
}

export const WORKOUT_TYPES: string[] = Object.values(WorkoutType);

export const enum CoachDescriptionLength {
  MinLength = 10,
  MaxLength = 140
}

export enum WorkoutTime {
  Short = '10-30 min',
  Average = '30-50 min',
  Long = '50-80 min',
  ExtraLong = '80-100 min',
}

export const WORKOUT_TIMES: string[] = Object.values(WorkoutTime);

export const MIN_CALORIES_NUMBER = 1000;
export const MAX_CALORIES_NUMBER = 1000;
