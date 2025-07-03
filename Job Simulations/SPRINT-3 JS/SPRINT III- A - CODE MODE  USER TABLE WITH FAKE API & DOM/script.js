const userTableBody = document.getElementById("userTableBody");
const loader = document.getElementById("loader");
const toast = document.getElementById("toast");
const searchInput = document.getElementById("searchInput");

let users = [];
let sortOrder = {
  name: "asc",
  username: "asc",
  email: "asc"
};

function fetchUsers() {
  showLoader(true);
  fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.json())
    .then(data => {
      users = data;
      renderTable(users);
      showLoader(false);
      showToast("✅ Users loaded");
    })
    .catch(err => {
      console.error(err);
      showToast("❌ Error loading users", true);
      showLoader(false);
    });
}

function renderTable(data) {
  userTableBody.innerHTML = "";
  data.forEach((user, index) => {
    const row = document.createElement("tr");
    row.setAttribute("data-id", user.id);
    row.innerHTML = `
      <td>${index + 1}</td>
      <td class="name">${user.name}</td>
      <td class="username">${user.username}</td>
      <td class="email">${user.email}</td>
      <td class="phone">${user.phone}</td>
      <td class="actions">
        <button class="edit-btn" onclick="editUser(this)">Edit</button>
        <button class="delete-btn" onclick="deleteUser(${user.id})">Delete</button>
      </td>
    `;
    userTableBody.appendChild(row);
  });
}

function sortTable(field) {
  users.sort((a, b) => {
    const valA = a[field].toLowerCase();
    const valB = b[field].toLowerCase();
    return sortOrder[field] === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
  });

  sortOrder[field] = sortOrder[field] === "asc" ? "desc" : "asc";
  renderTable(users);
}

function deleteUser(id) {
  users = users.filter(user => user.id !== id);
  renderTable(users);
  showToast(`🗑️ User ID ${id} deleted`);
}

function editUser(btn) {
  const row = btn.closest("tr");
  const name = row.querySelector(".name");
  const email = row.querySelector(".email");
  const phone = row.querySelector(".phone");

  if (btn.textContent === "Edit") {
    name.innerHTML = `<input type="text" value="${name.textContent}" />`;
    email.innerHTML = `<input type="text" value="${email.textContent}" />`;
    phone.innerHTML = `<input type="text" value="${phone.textContent}" />`;

    btn.textContent = "Save";
    btn.classList.remove("edit-btn");
    btn.classList.add("save-btn");
  } else {
    const newName = name.querySelector("input").value.trim();
    const newEmail = email.querySelector("input").value.trim();
    const newPhone = phone.querySelector("input").value.trim();

    if (!newName || !newEmail || !newPhone) {
      showToast("⚠️ Fields cannot be empty", true);
      return;
    }

    name.textContent = newName;
    email.textContent = newEmail;
    phone.textContent = newPhone;

    const id = parseInt(row.getAttribute("data-id"));
    const user = users.find(u => u.id === id);
    if (user) {
      user.name = newName;
      user.email = newEmail;
      user.phone = newPhone;
    }

    btn.textContent = "Edit";
    btn.classList.remove("save-btn");
    btn.classList.add("edit-btn");
    showToast("✅ User updated");
  }
}

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = users.filter(user =>
    user.name.toLowerCase().includes(query) ||
    user.email.toLowerCase().includes(query)
  );
  renderTable(filtered);
});

function showLoader(show) {
  loader.style.display = show ? "block" : "none";
}

function showToast(message, isError = false) {
  toast.textContent = message;
  toast.style.backgroundColor = isError ? "#e74c3c" : "#2ecc71";
  toast.style.display = "block";
  setTimeout(() => toast.style.display = "none", 3000);
}
