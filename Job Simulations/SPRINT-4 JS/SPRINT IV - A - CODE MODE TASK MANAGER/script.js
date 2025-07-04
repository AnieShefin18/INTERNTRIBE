/*
  Async Task Manager Script
  This script loads tasks using async/await with a simulated delay,
  and updates each task's progress in real-time using setInterval.
*/

const loadTasksBtn = document.getElementById('loadTasksBtn');
const startProgressBtn = document.getElementById('startProgressBtn');
const stopProgressBtn = document.getElementById('stopProgressBtn');
const delayNotifyBtn = document.getElementById('delayNotifyBtn');
const darkModeBtn = document.getElementById('toggleDarkModeBtn');
const taskContainer = document.getElementById('taskContainer');
const notificationPanel = document.getElementById('notificationPanel');

let tasks = [];
let intervalIds = [];
let isDarkMode = false;

function simulateFetchTasks() {
  return new Promise(resolve => {
    setTimeout(() => {
      const fakeTasks = [
        { id: 501, name: "Task Alpha", progress: 0, status: "Pending" },
        { id: 502, name: "Task Beta",  progress: 0, status: "Pending" },
        { id: 503, name: "Task Gamma", progress: 0, status: "Pending" },
        { id: 504, name: "Task Delta", progress: 0, status: "Pending" },
        { id: 505, name: "Task Omega", progress: 0, status: "Pending" }
      ];
      resolve(fakeTasks);
    }, 1500);
  });
}

async function loadTasks() {
  taskContainer.innerHTML = '<p>Loading...</p>';
  tasks = await simulateFetchTasks();
  renderTasks();
}

function renderTasks() {
  taskContainer.innerHTML = '';
  tasks.forEach(task => {
    const card = document.createElement('div');
    card.className = 'task-card';
    card.setAttribute('data-id', task.id);
    card.innerHTML = `
      <h3>${task.name}</h3>
      <p>Status: <span class="status">${task.status}</span></p>
      <p>Progress: <span class="progress">${task.progress}%</span></p>
      <button class="resetBtn" onclick="resetTask(${task.id})">Reset Task</button>
    `;
    taskContainer.appendChild(card);
  });
}

function updateTaskCard(task) {
  const card = document.querySelector(`.task-card[data-id='${task.id}']`);
  if (card) {
    card.querySelector('.progress').textContent = `${task.progress}%`;
    card.querySelector('.status').textContent = task.status;
    card.classList.remove('completed', 'in-progress');
    if (task.status === 'Completed') card.classList.add('completed');
    else if (task.status === 'In Progress') card.classList.add('in-progress');
  }
}

function startProgress() {
  intervalIds = tasks.map(task => {
    return setInterval(() => {
      if (task.progress >= 100) {
        clearInterval(intervalIds[task.id - 1]);
        task.status = 'Completed';
        updateTaskCard(task);
        playCompletionEffect(task);
      } else {
        task.progress += 10;
        task.status = 'In Progress';
        updateTaskCard(task);
      }
    }, 1000);
  });

  startProgressBtn.disabled = true;
}

function stopProgress() {
  intervalIds.forEach(id => clearInterval(id));
  startProgressBtn.disabled = false;
}

function showDelayedNotification() {
  setTimeout(() => {
    const msg = document.createElement('div');
    msg.className = 'notification';
    msg.textContent = '⏰ This is a delayed notification!';
    notificationPanel.appendChild(msg);
    setTimeout(() => msg.remove(), 3000);
  }, 2000);
}

function resetTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.progress = 0;
    task.status = 'Pending';
    updateTaskCard(task);
  }
}

function playCompletionEffect(task) {
  const card = document.querySelector(`.task-card[data-id='${task.id}']`);
  if (card) {
    card.classList.add('celebrate');
    setTimeout(() => card.classList.remove('celebrate'), 1000);
  }

  const audio = new Audio('https://www.myinstants.com/media/sounds/notification.mp3');
  audio.play();
}

darkModeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  isDarkMode = !isDarkMode;
  darkModeBtn.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
});

loadTasksBtn.addEventListener('click', loadTasks);
startProgressBtn.addEventListener('click', startProgress);
stopProgressBtn.addEventListener('click', stopProgress);
delayNotifyBtn.addEventListener('click', showDelayedNotification);
