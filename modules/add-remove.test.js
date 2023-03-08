/**
 * @jest-environment jsdom
 */

const { remove } = require('lodash');
const newTask = require('./add.js');
const trashTask = require('./remove.js');

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

Object.defineProperty(window, 'localStorage' , { value: localStorageMock });

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
  test('expect todoList to be defined', () => {
    expect(todolistContainer).toBeDefined();
  });
  test('Add new task to the list', ()=> {
    newTask('add new task');    
    const storage = JSON.parse(localStorage.getItem(storekey));
    expect(storage.length).toEqual(1);
  });
});
