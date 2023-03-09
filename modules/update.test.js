/**
 * @jest-environment jsdom
 */

import { editTask } from './localStorage';

const trashCompleted = require('./iterate');
const check = require('./check');

const localStorageMock = (() => {
  let store = {};

  return {
    setItem(key, value) {
      store[key] = value;
    },
    getItem(key) {
      return store[key];
    },
    removeItem(key) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Edit task', () => {
  const storageKey = 'myTasks';

  beforeEach(() => {
    localStorage.clear();
  });
  test('is the task edited on DOM', () => {
    const task = {
      index: 0,
      completed: false,
      description: 'newtask',
    };

    const targetObj = {
      description: 'taskfive',
    };

    const changedDescription = editTask.description;
    expect(changedDescription).toBe(targetObj[task.description]);
  });

  test('is complete status changed on the DOM', () => {
    const task = [
      {
        description: 'task5',
        complete: true,
        index: 0,
        checked: '',
      },
    ];

    trashCompleted();
    const completeStatus = task[0].complete;

    expect(completeStatus).toBe(true);
  });
});