// Async Task Manager with Extended Features

const loadBtn = document.getElementById('loadBtn');
const notifyBtn = document.getElementById('notifyBtn');
const addTaskBtn = document.getElementById('addTaskBtn');
const clearAllBtn = document.getElementById('clearAllBtn');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll(".at-filter-buttons .at-btn");
const taskArea = document.getElementById('taskArea');
const notificationArea = document.getElementById('notificationArea');
const taskNameInput = document.getElementById('taskNameInput');

let tasks = [];
let intervals = {};
let currentFilter = 'all';
let currentSearch = '';

// Simulate async fetch
function fakeFetchTasks() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "Task Alpha", progress: 0, status: "Pending" },
        { id: 2, name: "Task Beta", progress: 0, status: "Pending" },
        { id: 3, name: "Task Gamma", progress: 0, status: "Pending" },
        { id: 4, name: "Task Delta", progress: 0, status: "Pending" }
      ]);
    }, 1000);
  });
}

// Storage helpers
function loadFromStorage() {
  const data = localStorage.getItem("taskData");
  return data ? JSON.parse(data) : null;
}

function saveToStorage() {
  localStorage.setItem("taskData", JSON.stringify(tasks));
}

// Load tasks (on startup or manually)
async function loadTasks() {
  taskArea.innerHTML = "<p>Loading...</p>";
  const saved = loadFromStorage();
  tasks = saved || await fakeFetchTasks();
  renderTasks();
}

// Render tasks with filters and search
function renderTasks() {
  taskArea.innerHTML = "";

  const filtered = tasks.filter(task => {
    const matchFilter = currentFilter === 'all' || task.status === currentFilter;
    const matchSearch = task.name.toLowerCase().includes(currentSearch.toLowerCase());
    return matchFilter && matchSearch;
  });

  if (filtered.length === 0) {
    taskArea.innerHTML = "<p style='text-align:center;color:white;'>No tasks found.</p>";
    return;
  }

  filtered.forEach(task => {
    const card = document.createElement("div");
    card.className = "at-task-card";
    card.setAttribute("data-id", task.id);
    card.innerHTML = `
      <h3>${task.name}</h3>
      <p>Status: <span class="at-status">${task.status}</span></p>
      <p>Progress: <span class="at-progress">${task.progress}%</span></p>

      <div class="at-progress-container">
        <div class="at-progress-fill" style="width: ${task.progress}%; background-color: #28a745;"></div>
      </div>

      <div class="at-task-buttons">
        <button onclick="startTask(${task.id})">Start</button>
        <button onclick="stopTask(${task.id})">Stop</button>
        <button onclick="resetTask(${task.id})">Reset</button>
      </div>
    `;
    taskArea.appendChild(card);
  });

  saveToStorage();
}

// Update task card visuals
function updateTaskCard(task) {
  const card = document.querySelector(`.at-task-card[data-id='${task.id}']`);
  if (card) {
    card.querySelector(".at-status").textContent = task.status;
    card.querySelector(".at-progress").textContent = `${task.progress}%`;
    const bar = card.querySelector(".at-progress-fill");
    bar.style.width = `${task.progress}%`;
    bar.style.backgroundColor = "#28a745";
  }
  saveToStorage();
}

// Task Control Functions
function startTask(id) {
  const task = tasks.find(t => t.id === id);
  if (!task || intervals[id] || task.status === "Completed") return;

  intervals[id] = setInterval(() => {
    if (task.progress >= 100) {
      clearInterval(intervals[id]);
      intervals[id] = null;
      task.progress = 100;
      task.status = "Completed";
    } else {
      task.progress += 10;
      task.status = "In Progress";
    }
    updateTaskCard(task);
  }, 1000);
}

function stopTask(id) {
  if (intervals[id]) {
    clearInterval(intervals[id]);
    intervals[id] = null;
  }
}

function resetTask(id) {
  stopTask(id);
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.progress = 0;
    task.status = "Pending";
    updateTaskCard(task);
  }
}

// Add new task
function addTask() {
  const name = taskNameInput.value.trim();
  if (!name) return alert("Task name cannot be empty.");

  const newTask = {
    id: Date.now(),
    name,
    progress: 0,
    status: "Pending"
  };

  tasks.push(newTask);
  taskNameInput.value = "";
  renderTasks();
}

// Clear all tasks
function clearAllTasks() {
  if (confirm("Are you sure you want to clear all tasks?")) {
    localStorage.removeItem("taskData");
    tasks = [];
    renderTasks();
  }
}

// Filter and Search handlers
function handleSearch(e) {
  currentSearch = e.target.value;
  renderTasks();
}

function applyFilter(e) {
  currentFilter = e.target.getAttribute("data-filter");
  renderTasks();
}

// Show delayed notification
function showDelayedNotification() {
  setTimeout(() => {
    const msg = document.createElement("div");
    msg.className = "at-notification";
    msg.textContent = "⏰ Delayed Notification Triggered!";
    notificationArea.appendChild(msg);
    setTimeout(() => msg.remove(), 3000);
  }, 2000);
}

// Event Listeners
loadBtn.addEventListener("click", loadTasks);
notifyBtn.addEventListener("click", showDelayedNotification);
addTaskBtn.addEventListener("click", addTask);
clearAllBtn.addEventListener("click", clearAllTasks);
searchInput.addEventListener("input", handleSearch);
filterButtons.forEach(btn => btn.addEventListener("click", applyFilter));
document.addEventListener("DOMContentLoaded", loadTasks);

// Global for inline HTML access
window.startTask = startTask;
window.stopTask = stopTask;
window.resetTask = resetTask;
