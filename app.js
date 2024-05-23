document.addEventListener("DOMContentLoaded", function () {
  const todoInput = document.getElementById("todo-input");
  const addTodoButton = document.getElementById("add-todo");
  const todoList = document.getElementById("todo-list");

  // Load existing todos from local storage
  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function renderTodos() {
    todoList.innerHTML = "";
    todos.forEach((todo, index) => {
      const li = document.createElement("li");
      li.classList.toggle("complete", todo.completed);

      const span = document.createElement("span");
      span.textContent = todo.text;
      span.addEventListener("click", () => {
        todo.completed = !todo.completed;
        saveTodos();
        renderTodos();
      });

      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.classList.add("edit");
      editButton.addEventListener("click", () => {
        const newText = prompt("Edit your todo:", todo.text);
        if (newText !== null && newText.trim() !== "") {
          todo.text = newText.trim();
          saveTodos();
          renderTodos();
        }
      });

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "X";
      deleteButton.classList.add("delete");
      deleteButton.addEventListener("click", () => {
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
      });

      li.appendChild(span);
      li.appendChild(editButton);
      li.appendChild(deleteButton);
      todoList.appendChild(li);
    });
  }

  addTodoButton.addEventListener("click", () => {
    const text = todoInput.value.trim();
    if (text !== "") {
      todos.push({ text, completed: false });
      saveTodos();
      renderTodos();
      todoInput.value = "";
    }
  });

  // Initial render
  renderTodos();
});
