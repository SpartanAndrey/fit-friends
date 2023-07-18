import { SortType } from '@project/shared/app-types';

export const SALT_ROUNDS = 10;

export const DEFAULT_QUERY_LIMIT = 50;
export const DEFAULT_ORDER_QUERY_LIMIT = 50;
export const DEFAULT_REVIEW_QUERY_LIMIT = 50;
export const DEFAULT_SORT_DIRECTION_USER = -1;
export const DEFAULT_SORT_DIRECTION = 'desc';
export const DEFAULT_SORT_TYPE = SortType.CreatedAt;
export const DEFAULT_PRICE_NUMBER = 0;

export const MIN_REVIEW_LENGTH = 100;
export const MAX_REVIEW_LENGTH = 1024;
export const MIN_RATING = 1;
export const MAX_RATING = 5;
export const MIN_WORKOUTS_NUMBER = 1;
export const MAX_WORKOUTS_NUMBER = 50;
export const MIN_TITLE_LENGTH = 1;
export const MAX_TITLE_LENGTH = 15;
export const MIN_RATING_NUMBER = 0;
export const MAX_RATING_NUMBER = 5;
export const MIN_NAME_LENGTH = 1;
export const MAX_NAME_LENGTH = 15;
export const MIN_PASSWORD_LENGTH = 6;
export const MAX_PASSWORD_LENGTH = 12;
export const MIN_DESCRIPTION_LENGTH = 10;
export const MAX_DESCRIPTION_LENGTH = 140;
export const MAX_WORKOUT_TYPE_NUMBER = 3;
export const MIN_CALORIES_NUMBER = 1000;
export const MAX_CALORIES_NUMBER = 5000;


export const AUTH_USER_EMAIL_NOT_VALID = 'The email is not valid.';
export const AUTH_USER_DATEBIRTH_NOT_VALID = 'The user date birth is not valid.';
export const AUTH_USER_NAME_LENGTH = `User name length shall be between ${MIN_NAME_LENGTH} and ${MAX_NAME_LENGTH} chars.`;
export const AUTH_USER_PASSWORD_LENGTH = `User password length shall be between ${MIN_PASSWORD_LENGTH} and ${MAX_PASSWORD_LENGTH} chars.`;
export const AUTH_DESCRIPTION_LENGTH = `User description length shall be between ${MIN_DESCRIPTION_LENGTH} and ${MAX_DESCRIPTION_LENGTH} chars.`;
export const AUTH_WORKOUT_TYPE_NUMBER = `Workout type number shall be no more than ${MAX_WORKOUT_TYPE_NUMBER}.`;
export const AUTH_COACH_INFO_LENGTH = `Coach info length shall be between ${MIN_DESCRIPTION_LENGTH} and ${MAX_DESCRIPTION_LENGTH} chars.`;
export const AUTH_CALORIES_NUMBER = `Calories number shall be between ${MIN_CALORIES_NUMBER} and ${MAX_CALORIES_NUMBER}.`;
export const QUERY_LIMIT = `The resource does not return more than ${DEFAULT_QUERY_LIMIT} collection items.`

export const AUTH_USER_FORBIDDEN = 'Access is denied.';
export const AUTH_USER_EXIST = 'User with this email exists.';
export const AUTH_USER_NOT_FOUND = 'User not found.';
export const AUTH_USER_PASSWORD_WRONG = 'User password is wrong.';
export const AUTH_USER_FRIENDS_EMPTY = 'Friend list is empty';
export const USER_NOT_SIMPLE  = 'You\'re not simple user.';
export const REQUEST_WORKOUT_NOT_FOUND = 'Request not found.';
export const REQUEST_WORKOUT_UPDATE_WRONG = 'You can update only your request.';
export const REQUEST_WORKOUT_INITIATOR_WRONG = 'Initiator can\'t update request.';

export const WORKOUT_LIMIT_NOT_BE_EXCEEDED = `Query limit value shall no be exceeded ${DEFAULT_QUERY_LIMIT}`;
export const WORKOUT_TITLE_LENGTH = `Workout title length shall be between ${MIN_TITLE_LENGTH} and ${MAX_TITLE_LENGTH} chars.`;
export const WORKOUT_DESCRIPTION_LENGTH = `Workout description length shall be between ${MIN_DESCRIPTION_LENGTH} and ${MAX_DESCRIPTION_LENGTH} chars.`;
export const WORKOUT_CALORIES_NUMBER = `Calories number shall be between ${MIN_CALORIES_NUMBER} and ${MAX_CALORIES_NUMBER}.`;
export const WORKOUT_RATING_NUMBER = `Rating shall be between ${MIN_RATING_NUMBER} and ${MAX_RATING_NUMBER}.`;
export const WORKOUT_DUEDATE_NOT_VALID = 'The due date is not valid.';

export const WORKOUT_FORBIDDEN  = 'Access is denied.';
export const WORKOUT_STATUS_CONDITIONS_WRONG = 'Update status conditions are wrong.';
export const WORKOUT_NOT_FOUND = 'Workout is not found.';
export const WORKOUT_USER_NOT_COACH = 'You\'re not a coach.';
export const WORKOUT_RESPONSE_EXIST = 'You have already responsed this task.';
export const WORKOUT_CONTRACTOR_EXIST = 'The contractor has been already appointed.';
export const WORKOUT_NOT_OWNER = 'You\'re not owner.';
export const WORKOUT_CONTRACTOR_NOT_RESPONSE= 'This contractor doesn\'t response on your task.';

export const ORDER_LIMIT_NOT_BE_EXCEEDED = `Query limit value shall no be exceeded ${DEFAULT_ORDER_QUERY_LIMIT}`;
export const ORDER_WORKOUTS_NUMBER = `Workouts number shall be between ${MIN_WORKOUTS_NUMBER} and ${MAX_WORKOUTS_NUMBER}.`;

export const REVIEW_LENGTH = `Review length shall be between ${MIN_REVIEW_LENGTH} and ${MAX_REVIEW_LENGTH} chars.`
export const VALID_RATING = `Rating shall be between ${MIN_RATING} and ${MAX_RATING} chars.`
export const REVIEW_LIMIT_NOT_BE_EXCEEDED = `Query limit value shall no be exceeded ${DEFAULT_REVIEW_QUERY_LIMIT}`;