import { SortType } from '@project/shared/app-types';

export const DEFAULT_QUERY_LIMIT = 50;

export const DEFAULT_SORT_DIRECTION = 'desc';
export const DEFAULT_SORT_TYPE = SortType.CreatedAt;
export const DEFAULT_PRICE_NUMBER = 0;

export const MIN_TITLE_LENGTH = 1;
export const MAX_TITLE_LENGTH = 15;
export const MIN_DESCRIPTION_LENGTH = 10;
export const MAX_DESCRIPTION_LENGTH = 140;
export const MIN_CALORIES_NUMBER = 1000;
export const MAX_CALORIES_NUMBER = 5000;
export const MIN_RATING_NUMBER = 0;
export const MAX_RATING_NUMBER = 5;

export const WORKOUT_LIMIT_NOT_BE_EXCEEDED = `Query limit value shall no be exceeded ${DEFAULT_QUERY_LIMIT}`;
export const WORKOUT_TITLE_LENGTH = `Workout title length shall be between ${MIN_TITLE_LENGTH} and ${MAX_TITLE_LENGTH} chars.`;
export const WORKOUT_DESCRIPTION_LENGTH = `Workout description length shall be between ${MIN_DESCRIPTION_LENGTH} and ${MAX_DESCRIPTION_LENGTH} chars.`;
export const WORKOUT_CALORIES_NUMBER = `Calories number shall be between ${MIN_CALORIES_NUMBER} and ${MAX_CALORIES_NUMBER}.`;
export const WORKOUT_RATING_NUMBER = `Rating shall be between ${MIN_RATING_NUMBER} and ${MAX_RATING_NUMBER}.`;
export const WORKOUT_DUEDATE_NOT_VALID = 'The due date is not valid.';

export const WORKOUT_FORBIDDEN  = 'Access is denied.';
export const WORKOUT_STATUS_CONDITIONS_WRONG = 'Update status conditions are wrong.';
export const WORKOUT_NOT_FOUND = 'Workout is not found.';
export const WORKOUT_RESPONSE_EXIST = 'You have already responsed this task.';
export const WORKOUT_CONTRACTOR_EXIST = 'The contractor has been already appointed.';
export const WORKOUT_NOT_AUTHOR= 'You\'re not owner of the task.';
export const WORKOUT_CONTRACTOR_NOT_RESPONSE= 'This contractor doesn\'t response on your task.';
