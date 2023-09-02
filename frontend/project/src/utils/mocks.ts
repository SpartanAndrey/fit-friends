import {lorem, datatype, name, internet, image, random} from 'faker';
import { LoggedUserData } from '../types/logged-user-data';
import { OrderType, PaymentType, UserGender, UserLevel, UserLocation, UserRole, WorkoutGender, WorkoutTime, WorkoutType } from '../constant';
import { RegisteredUserData } from '../types/registered-user-data';
import { UserFull } from '../types/user-full';
import { Workout } from '../types/workout';
import { Review } from '../types/review';
import { Order } from '../types/order';
import { UserCoach } from '../types/user-coach';
import { UserSimple } from '../types/user-simple';

export const makeFakeLoggedUser = (): LoggedUserData => ({
  id: datatype.uuid(),
  email: internet.email(),
  role: random.arrayElement(Object.values(UserRole))
} as LoggedUserData);

export const makeFakeRegisteredUser = (): RegisteredUserData => ({
  name: name.firstName(),
  email: internet.email(),
  dateBirth: '1990-01-01T00:00:00.000Z',
  description: lorem.words(10),
  location:  random.arrayElement(Object.values(UserLocation)),
  password: internet.password(),
  gender: random.arrayElement(Object.values(UserGender)),
  role: random.arrayElement(Object.values(UserRole)),
  avatar: '',
} as RegisteredUserData);

export const makeFakeUserFull = (): UserFull => ({
  id: datatype.uuid(),
  name: name.firstName(),
  email: internet.email(),
  avatar: '',
  passwordHash: '',
  gender: random.arrayElement(Object.values(UserGender)),
  dateBirth: new Date(),
  role: random.arrayElement(Object.values(UserRole)),
  description: lorem.words(10),
  friends: [],
  location: random.arrayElement(Object.values(UserLocation)),
  level: random.arrayElement(Object.values(UserLevel)),
  workoutType: random.arrayElements(Object.values(WorkoutType), 3),
  certificates: [],
  coachInfo: lorem.words(10),
  isReadyToCoach: datatype.boolean(),
  workoutTime: random.arrayElement(Object.values(WorkoutTime)),
  caloriesToBurnNumber: datatype.number({ min: 1000, max: 5000}),
  caloriesToSpendNumber: datatype.number({ min: 1000, max: 5000}),
  isReadyToTrain: datatype.boolean(),
} as UserFull);

export const makeFakeReview = (): Review => ({
  id: Number(datatype.uuid()),
  userId: datatype.uuid(),
  workoutId: Number(datatype.uuid()),
  rating: datatype.number({ min: 1, max: 5}),
  text: lorem.words(55),
  createdAt: new Date(),
} as Review);

export const makeFakeWorkout = (): Workout => ({
  id: datatype.number(),
  title: name.title(),
  backgroundImage: datatype.uuid(),
  level: random.arrayElement(Object.values(UserLevel)),
  type: random.arrayElement(Object.values(WorkoutType)),
  time: random.arrayElement(Object.values(WorkoutTime)),
  price: datatype.number(),
  caloriesNumber: datatype.number({ min: 1000, max: 5000}),
  description: lorem.words(50),
  gender:random.arrayElement(Object.values(WorkoutGender)),
  demonstration: datatype.uuid(),
  rating: datatype.number({ min: 1, max: 5}),
  coachId: datatype.uuid(),
  specialOffer: datatype.boolean(),
  createdAt: new Date(),
} as Workout);

export const makeFakeOrder = (): Order =>{
  const price = datatype.number();
  const quantity = datatype.number();
  
  return ({
    id: datatype.number(),
    workoutId: datatype.number(),
    coachId: datatype.uuid(),
    orderType: random.arrayElement(Object.values(OrderType)),
    workoutPrice: price,
    quantity: quantity,
    totalPrice: quantity * price,
    paymentType: random.arrayElement(Object.values(PaymentType)),
    createdAt: new Date(),
  } as Order);
};

export const makeFakeUserCoach = (): UserCoach => ({
  id: datatype.uuid(),
  name: name.firstName(),
  email: internet.email(),
  avatar: '',
  passwordHash: '',
  gender: random.arrayElement(Object.values(UserGender)),
  dateBirth: new Date(),
  role: random.arrayElement(Object.values(UserRole)),
  description: lorem.words(10),
  location: random.arrayElement(Object.values(UserLocation)),
  level: random.arrayElement(Object.values(UserLevel)),
  workoutType: random.arrayElements(Object.values(WorkoutType), 3),
  certificates: [],
  coachInfo: lorem.words(10),
  isReadyToCoach: datatype.boolean(),
} as UserCoach);

export const makeFakeUserSimple = (): UserSimple => ({
  id: datatype.uuid(),
  name: name.firstName(),
  email: internet.email(),
  avatar: '',
  passwordHash: '',
  gender: random.arrayElement(Object.values(UserGender)),
  dateBirth: new Date(),
  role: random.arrayElement(Object.values(UserRole)),
  description: lorem.words(10),
  friends: [],
  location: random.arrayElement(Object.values(UserLocation)),
  level: random.arrayElement(Object.values(UserLevel)),
  workoutType: random.arrayElements(Object.values(WorkoutType), 3),
  workoutTime: random.arrayElement(Object.values(WorkoutTime)),
  caloriesToBurnNumber: datatype.number({ min: 1000, max: 5000}),
  caloriesToSpendNumber: datatype.number({ min: 1000, max: 5000}),
  isReadyToTrain: datatype.boolean(),
} as UserSimple);
