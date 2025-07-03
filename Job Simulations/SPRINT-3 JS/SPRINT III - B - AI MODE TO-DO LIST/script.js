// Global variables
let todoList = [];
let comdoList = [];
let remList = [];

// Element references
const addButton = document.getElementById("add-button");
const todoInput = document.getElementById("todo-input");
const deleteAllButton = document.getElementById("delete-all");
const deleteSelectedButton = document.getElementById("delete-selected");
const allTodos = document.getElementById("all-todos");

// Event listeners
addButton.addEventListener("click", addTodo);
deleteAllButton.addEventListener("click", deleteAllTodos);
deleteSelectedButton.addEventListener("click", deleteCompletedTodos);

// Filter & Action Delegation
document.addEventListener("click", (e) => {
    const className = e.target.className;

    if (className.includes("todo-complete-btn") || className.includes("bx-check")) {
        toggleComplete(e);
    } else if (className.includes("todo-delete-btn") || className.includes("bx-trash")) {
        deleteTodo(e);
    } else if (e.target.id === "all") {
        renderTodos(todoList);
    } else if (e.target.id === "rem") {
        renderTodos(remList);
    } else if (e.target.id === "com") {
        renderTodos(comdoList);
    }
});

// Handle Enter key to add
todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTodo();
    }
});

// Add a new task
function addTodo() {
    const value = todoInput.value.trim();
    if (!value) {
        alert("😮 Task cannot be empty!");
        return;
    }

    const newTask = {
        task: value,
        id: Date.now().toString(),
        complete: false
    };

    todoList.push(newTask);
    todoInput.value = "";
    updateCounts();
    renderTodos(todoList);
}

// Render todos
function renderTodos(list) {
    allTodos.innerHTML = "";

    list.forEach(todo => {
        const li = document.createElement("li");
        li.className = `todo-item ${todo.complete ? 'completed' : ''}`;
        li.id = todo.id;

        li.innerHTML = `
            <p class="todo-text">${todo.complete ? `<strike>${todo.task}</strike>` : todo.task}</p>
            <div class="todo-actions">
                <button class="todo-complete-btn"><i class="bx bx-check bx-sm"></i></button>
                <button class="todo-delete-btn"><i class="bx bx-trash bx-sm"></i></button>
            </div>
        `;

        allTodos.appendChild(li);
    });
}

// Mark task as complete/incomplete
function toggleComplete(e) {
    const id = e.target.closest(".todo-item").id;

    todoList = todoList.map(todo => {
        if (todo.id === id) {
            todo.complete = !todo.complete;
        }
        return todo;
    });

    updateCounts();
    renderTodos(todoList);
}

// Delete a single task
function deleteTodo(e) {
    const id = e.target.closest(".todo-item").id;
    todoList = todoList.filter(todo => todo.id !== id);

    updateCounts();
    renderTodos(todoList);
}

// Delete all tasks
function deleteAllTodos() {
    if (confirm("Are you sure you want to delete all tasks?")) {
        todoList = [];
        updateCounts();
        renderTodos(todoList);
    }
}

// Delete completed tasks only
function deleteCompletedTodos() {
    todoList = todoList.filter(todo => !todo.complete);

    updateCounts();
    renderTodos(todoList);
}

// Update counts and filters
function updateCounts() {
    comdoList = todoList.filter(todo => todo.complete);
    remList = todoList.filter(todo => !todo.complete);

    document.getElementById("r-count").innerText = todoList.length.toString();
    document.getElementById("c-count").innerText = comdoList.length.toString();
}
