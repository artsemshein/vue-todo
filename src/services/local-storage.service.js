export function create(todoItem) {
  const todoList = load();

  todoList.push(todoItem);
  localStorage.setItem("todo-list", JSON.stringify(todoList));
}

export function load() {
  const todoList = localStorage.getItem("todo-list");

  return JSON.parse(todoList) ?? [];
}

export function remove(index) {
  const todoList = JSON.parse(localStorage.getItem("todo-list"));
  todoList.splice(index, 1);

  localStorage.setItem("todo-list", JSON.stringify(todoList));
}

export function save(todoItem, index) {
  const todoList = JSON.parse(localStorage.getItem("todo-list"));
  todoList.splice(index, 1, todoItem);

  localStorage.setItem("todo-list", JSON.stringify(todoList));
}
