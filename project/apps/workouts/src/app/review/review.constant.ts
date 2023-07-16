export const DEFAULT_REVIEW_QUERY_LIMIT = 50;
export const DEFAULT_SORT_DIRECTION = 'desc';

export const MIN_REVIEW_LENGTH = 100;
export const MAX_REVIEW_LENGTH = 1024;

export const MIN_RATING = 1;
export const MAX_RATING = 5;

export const REVIEW_LENGTH = `Review length shall be between ${MIN_REVIEW_LENGTH} and ${MAX_REVIEW_LENGTH} chars.`
export const VALID_RATING = `Rating shall be between ${MIN_RATING} and ${MAX_RATING} chars.`
export const REVIEW_LIMIT_NOT_BE_EXCEEDED = `Query limit value shall no be exceeded ${DEFAULT_REVIEW_QUERY_LIMIT}`;