/**
 * @jest-environment jsdom
 */

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
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Add & remove task', () => {
  const todolistContainer = document.createElement('ul');
  const storekey = 'to-do-list';
  let renderMockList;

  beforeEach(() => {
    localStorage.clear();

    renderMockList = ((todolist) => {
      if (todolist && todolist.length) {
        todolist.forEach((task) => {
          const li = document.createElement('li');
          li.textContent = task.description;
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

  test('Add new task to the list', () => {
    newTask('add first task');
    const storage = JSON.parse(localStorage.getItem(storekey));
    renderMockList(storage);
    expect(storage.length).toEqual(1);
  });

  test('localStorage should be empty now', () => {
    newTask('add second task');
    trashTask(1);
    const storage = JSON.parse(localStorage.getItem(storekey));
    expect(storage.length).toBe(1);
  });

  test('last child of todoListContainer  position should be 0', () => {
    trashTask(1);
    const storage = JSON.parse(localStorage.getItem(storekey));
    renderMockList(storage);
    expect(todolistContainer.children.length).toBe(0);
  });
});
