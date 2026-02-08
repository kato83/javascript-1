const listElement = document.getElementById("todo-list");
const templateElement = document.getElementById("todo-item-template");
const emptyTemplateElement = document.getElementById("todo-empty-template");
const formElement = document.getElementById("todo-form");
const inputElement = document.getElementById("todo-input");
const refreshButton = document.getElementById("refresh-button");

function updateTodo(id, payload) {
  return fetch(`/api/todos/${id}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
}

function createTodoNode(todo) {
  const fragment = templateElement.content.cloneNode(true);
  const item = fragment.querySelector(".todo-item");
  const checkbox = fragment.querySelector(".todo-item__check");
  const title = fragment.querySelector(".todo-item__title");
  const editButton = fragment.querySelector(".todo-item__edit");
  const deleteButton = fragment.querySelector(".todo-item__delete");

  checkbox.checked = todo.done;
  checkbox.addEventListener("change", () => {
    updateTodo(todo.id, { done: checkbox.checked, title: todo.title })
      .then(refresh);
  });

  title.textContent = todo.title;
  title.classList.toggle("is-done", todo.done);

  editButton.addEventListener("click", () => {
    const nextTitle = prompt("新しいタイトル", todo.title);
    if (!nextTitle) return;
    updateTodo(todo.id, { title: nextTitle, done: todo.done })
      .then(refresh);
  });

  deleteButton.addEventListener("click", () => {
    if (!confirm("削除しますか？")) return;
    fetch(`/api/todos/${todo.id}`, { method: "DELETE" })
      .then(refresh);
  });

  return item;
}

function renderTodos(todos) {
  listElement.innerHTML = "";

  if (todos.length === 0) {
    listElement.append(emptyTemplateElement.content.cloneNode(true));
  }

  for (const todo of todos) {
    listElement.append(createTodoNode(todo));
  }
}

function refresh() {
  return fetch("/api/todos")
    .then((response) => response.json())
    .then((todos) => renderTodos(todos));
}

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = inputElement.value.trim();
  if (!title) return;

  fetch("/api/todos", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ title: title }),
  })
    .then((response) => response.json())
    .then(() => {
      inputElement.value = "";
      refresh();
    });
});

refreshButton.addEventListener("click", () => refresh());

refresh();
