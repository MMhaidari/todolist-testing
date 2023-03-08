import {
  expect, describe, test, beforeEach,
} from 'jest';

const { remove } = require('lodash');
const newTask = require('./add');
const trashTask = require('./remove');

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
      store = [];
    },
  };
})();

Object.defineProperty('localStorage', { value: localStorageMock });

describe('Add & remove task', () => {
  const todolistContainer = document.createElement('ul');
  const storekey = 'to-do-list';
  let renderMockList;

  beforeEach(() => {
    localStorage.clear();

    renderMockList = jest.fn((TodoList) => {
      if (TodoList && TodoList.length) {
        TodoList.forEach((todo) => {
          const li = document.createElement('li');
          li.textContent = todo.description;
          todolistContainer.append(li);
        });
      } else {
        todolistContainer.innerHTML = '';
      }
    });
  });
});
