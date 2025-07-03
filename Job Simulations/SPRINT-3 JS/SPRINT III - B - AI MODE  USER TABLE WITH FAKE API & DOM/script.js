class UserTable {
  constructor() {
    this.userTableBody = document.getElementById("userTableBody");
    this.loader = document.getElementById("loader");
    this.toast = document.getElementById("toast");
    this.searchInput = document.getElementById("searchInput");
    this.fetchBtn = document.getElementById("fetchBtn");
    this.sortOrder = { name: "asc", username: "asc", email: "asc" };
    this.users = [];

    this.fetchBtn.addEventListener("click", () => this.fetchUsers());
    this.searchInput.addEventListener("input", () => this.searchUsers());

    document.querySelectorAll("th[data-field]").forEach(th => {
      th.addEventListener("click", () => this.sortTable(th.dataset.field));
    });
  }

  fetchUsers() {
    this.showLoader(true);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => {
        this.users = data;
        this.renderTable(this.users);
        this.showLoader(false);
        this.showToast("✅ Users loaded");
      })
      .catch(err => {
        this.showToast("❌ Failed to load users", true);
        this.showLoader(false);
      });
  }

  renderTable(data) {
    this.userTableBody.innerHTML = "";
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
          <button class="edit-btn" onclick="userTable.editUser(this)">Edit</button>
          <button class="delete-btn" onclick="userTable.deleteUser(${user.id})">Delete</button>
        </td>
      `;
      this.userTableBody.appendChild(row);
    });
  }

  sortTable(field) {
    this.users.sort((a, b) => {
      const valA = a[field].toLowerCase();
      const valB = b[field].toLowerCase();
      return this.sortOrder[field] === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    });

    this.sortOrder[field] = this.sortOrder[field] === "asc" ? "desc" : "asc";
    this.renderTable(this.users);
  }

  deleteUser(id) {
    this.users = this.users.filter(user => user.id !== id);
    this.renderTable(this.users);
    this.showToast(`🗑️ User ID ${id} deleted`);
  }

  editUser(btn) {
    const row = btn.closest("tr");
    const name = row.querySelector(".name");
    const email = row.querySelector(".email");
    const phone = row.querySelector(".phone");

    if (btn.textContent === "Edit") {
      name.innerHTML = `<input type="text" value="${name.textContent}" />`;
      email.innerHTML = `<input type="text" value="${email.textContent}" />`;
      phone.innerHTML = `<input type="text" value="${phone.textContent}" />`;

      btn.textContent = "Save";
      btn.classList.replace("edit-btn", "save-btn");
    } else {
      const newName = name.querySelector("input").value.trim();
      const newEmail = email.querySelector("input").value.trim();
      const newPhone = phone.querySelector("input").value.trim();

      if (!newName || !newEmail || !newPhone) {
        this.showToast("⚠️ Fields cannot be empty", true);
        return;
      }

      name.textContent = newName;
      email.textContent = newEmail;
      phone.textContent = newPhone;

      const id = parseInt(row.getAttribute("data-id"));
      const user = this.users.find(u => u.id === id);
      if (user) {
        user.name = newName;
        user.email = newEmail;
        user.phone = newPhone;
      }

      btn.textContent = "Edit";
      btn.classList.replace("save-btn", "edit-btn");
      this.showToast("✅ User updated");
    }
  }

  searchUsers() {
    const query = this.searchInput.value.toLowerCase();
    const filtered = this.users.filter(user =>
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    );
    this.renderTable(filtered);
  }

  showLoader(show) {
    this.loader.style.display = show ? "block" : "none";
  }

  showToast(message, isError = false) {
    this.toast.textContent = message;
    this.toast.style.backgroundColor = isError ? "#e74c3c" : "#2ecc71";
    this.toast.style.display = "block";
    setTimeout(() => (this.toast.style.display = "none"), 3000);
  }
}

const userTable = new UserTable();
