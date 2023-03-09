/**
 * @jest-environment jsdom
 */

import { editTask } from './localStorage';

const trashCompleted = require('./iterate');

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
  test('clear all completed', () => {
    const list = [
      {
        description: 'task1',
        complete: false,
        index: 1,
        checked: '',
      },
      {
        description: 'task3',
        complete: true,
        index: 2,
        checked: 'checked',
      },
      {
        description: 'task5',
        complete: false,
        index: 3,
        checked: '',
      },
    ];

    trashCompleted();
    expect(list.length).toBe(3);
  });
});