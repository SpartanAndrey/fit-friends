export enum ApplicationServiceURL {
  Users = 'http://localhost:3000/api/users',
  Requests= 'http://localhost:3000/api/requests',
  Workouts = 'http://localhost:3100/api/workouts',
  Orders = 'http://localhost:3100/api/orders',
  Reviews = 'http://localhost:3100/api/reviews',
}

export const HTTP_CLIENT_MAX_REDIRECTS = 5;
export const HTTP_CLIENT_TIMEOUT = 5000;
