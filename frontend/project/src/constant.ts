export enum AppRoute {
  Intro = '/intro',
  Main = '/',
  Register = '/register',
  Login = '/login',
  QuestionnaireCoach = '/questionnaire-coach',
  QuestionnaireUser = '/questionnaire-user',
  PersonalAccountCoach = '/coach-personal-account',
  WorkoutsCatalog = '/workouts-catalog',
  UsersCatalog = '/users-catalog',
  NotFound ='*',
  Upload = 'files/upload'
}

export enum APIRoute {
  Users = '/users',
  Workouts = '/workouts',
  Reviews = '/reviews',
  Orders = '/orders',
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

export const enum DescriptionLength {
  MinLength = 10,
  MaxLength = 140
}

export const enum NameLength {
  MinLength = 1,
  MaxLength = 15
}

export const NAME_PATTERN = '^[A-Za-zА-Яа-яЁё\s]+$';

export enum WorkoutTime {
  Short = '10-30 min',
  Average = '30-50 min',
  Long = '50-80 min',
  ExtraLong = '80-100 min',
}

export enum WorkoutGender {
  Men = 'Men',
  Women = 'Women',
  Everybody = 'Everybody',
}

export enum SortType {
  CreatedAt = 'createdAt',
  Price = 'price',
}

export enum SortDirection {
  Ascended = 'asc',
  Descended = 'desc',
} 

export const WORKOUT_TIMES: string[] = Object.values(WorkoutTime);

export enum OrderType {
  Workout = 'Workout',
  Membership = 'Мembership',
}

export enum OrderSortType {
  Quantity = 'quantity',
  totalPrice = 'totalPrice',
}

export enum PaymentType {
  Visa = 'Visa',
  Mir = 'Mir',
  Umoney = 'Umoney',
}

export const PAYMENT_TYPES: string[] = Object.values(PaymentType);

export const VISIBLE_SLIDES = 3;

export const DEFAULT_QUERY_LIMIT = 50;
export const DEFAULT_ORDER_QUERY_LIMIT = 50;
export const DEFAULT_REVIEW_QUERY_LIMIT = 50;
export const DEFAULT_SORT_DIRECTION_USER = -1;
export const DEFAULT_SORT_DIRECTION = 'desc';
export const DEFAULT_SORT_TYPE = SortType.CreatedAt;
export const DEFAULT_WORKOUTS_CATALOG_NUMBER = 12;

export const DEFAULT_PRICE_NUMBER = 0;
export const DEFAULT_ORDER_NUMBER = 5;
export const MIN_CALORIES_NUMBER = 1000;
export const MAX_CALORIES_NUMBER = 1000;
export const DEFAULT_CALORIES_STEP = 100;
export const MIN_RATING_NUMBER = 0;
export const MAX_RATING_NUMBER = 5;
export const RATINGS = [1, 2, 3, 4, 5];
export const DEFAULT_RATING_STEP = 1;
export const MIN_REVIEW_LENGTH = 100;
export const MAX_REVIEW_LENGTH = 1024;
export const MIN_TITLE_LENGTH = 1;
export const MAX_TITLE_LENGTH = 15;
