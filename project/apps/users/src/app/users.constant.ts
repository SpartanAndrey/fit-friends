import { SortType } from '@project/shared/app-types';

export const SALT_ROUNDS = 10;

export const DEFAULT_QUERY_LIMIT = 50;
export const DEFAULT_SORT_DIRECTION = -1;
export const DEFAULT_SORT_TYPE = SortType.CreatedAt;

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
export const AUTH_USER_WRONG_ROLE = 'You\'re not simple user.';
export const WORKOUT_NOT_FOUND = 'Workout is not found.';
export const REQUEST_WORKOUT_NOT_FOUND = 'Request not found.';
export const REQUEST_WORKOUT_UPDATE_WRONG = 'You can update only your request.';
export const REQUEST_WORKOUT_INITIATOR_WRONG = 'Initiator can\'t update request.';