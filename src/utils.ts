import { faker } from "@faker-js/faker";

import {
  DEFAULT_DATA_SIZE,
  DEFAULT_MAXIMUM_AMOUNT,
  DEFAULT_MINIMUM_AMOUNT
} from './constant';
import type { Transaction } from "./types";


export const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;

export const generateTransactionList: (count: number) => Transaction[] = (count = DEFAULT_DATA_SIZE) => {
  const transactions: Transaction[] = [];

  for (let i = 0; i < count; i++) {
    transactions.push({
      id: getRandomInt(100000, 999999),
      senderName: faker.person.fullName(),
      receiverName: faker.person.fullName(),
      amount: parseFloat(faker.finance.amount({
        min: DEFAULT_MINIMUM_AMOUNT,
        max: DEFAULT_MAXIMUM_AMOUNT,
      })),
      city: faker.location.city(),
      department: faker.commerce.department(),
      date: faker.date.recent({ days: 30 }).toISOString().split('T')[0], 
    });
  }

  return transactions;
};