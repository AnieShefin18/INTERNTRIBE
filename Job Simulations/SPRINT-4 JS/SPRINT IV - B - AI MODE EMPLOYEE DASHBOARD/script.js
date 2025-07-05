const toggleBtn = document.getElementById('toggleMode');
toggleBtn.onclick = () => document.body.classList.toggle('dark');

let employees = [
  { name: "Nadine Alcott", age: 23, department: "HR", role: "Manager", salary: 60000 },
  { name: "Elina Moore", age: 25, department: "Engineering", role: "Developer", salary: 80000 },
  { name: "Jasmine Wynn", age: 35, department: "Sales", role: "Salesperson", salary: 50000 },
  { name: "Sasha Wren", age: 30, department: "Engineering", role: "DevOps", salary: 90000 },
  { name: "Talia Matthew", age: 32, department: "HR", role: "Recruiter", salary: 55000 }
];
let displayedEmployees = [...employees];

const employeeBody = document.getElementById("employeeBody");
const searchInput = document.getElementById("searchInput");
const departmentFilter = document.getElementById("departmentFilter");

function renderTable(data) {
  employeeBody.innerHTML = '';
  data.forEach(emp => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${emp.name}</td>
      <td>${emp.age}</td>
      <td>${emp.department}</td>
      <td>${emp.role}</td>
      <td>$${emp.salary.toLocaleString()}</td>
    `;
    employeeBody.appendChild(row);
  });
  document.getElementById("employeeCount").textContent = `Total Employees Displayed: ${data.length}`;
}

renderTable(displayedEmployees);

function convertNamesToUppercase() {
  displayedEmployees = displayedEmployees.map(emp => ({ ...emp, name: emp.name.toUpperCase() }));
  renderTable(displayedEmployees);
}

function calculateAverageSalary() {
  if (displayedEmployees.length === 0) return;
  const total = displayedEmployees.reduce((acc, emp) => acc + emp.salary, 0);
  const avg = (total / displayedEmployees.length).toFixed(2);
  document.getElementById("averageSalaryResult").textContent = `Average Salary: $${avg}`;
}

function resetTable() {
  displayedEmployees = [...employees];
  departmentFilter.value = "";
  searchInput.value = "";
  renderTable(displayedEmployees);
  document.getElementById("averageSalaryResult").textContent = "Average Salary: -";
  document.getElementById("searchResult").textContent = "Search Result: -";
}

departmentFilter.addEventListener("change", () => {
  const dept = departmentFilter.value;
  displayedEmployees = dept ? employees.filter(emp => emp.department === dept) : [...employees];
  renderTable(displayedEmployees);
});

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) {
    document.getElementById("searchResult").textContent = "Search Result: -";
    return;
  }
  const found = employees.find(emp => emp.name.toLowerCase() === query);
  document.getElementById("searchResult").textContent = found
    ? `Found: ${found.name}, ${found.age}, ${found.department}, ${found.role}, $${found.salary}`
    : "Search Result: No match found";
});

function addEmployee() {
  const name = document.getElementById("newName").value.trim();
  const age = parseInt(document.getElementById("newAge").value);
  const dept = document.getElementById("newDept").value.trim();
  const role = document.getElementById("newRole").value.trim();
  const salary = parseFloat(document.getElementById("newSalary").value);
  if (!name || !dept || !role || isNaN(age) || isNaN(salary)) {
    alert("Please fill all fields correctly.");
    return;
  }
  const newEmp = { name, age, department: dept, role, salary };
  employees.push(newEmp);
  displayedEmployees.push(newEmp);
  renderTable(displayedEmployees);
  ['newName', 'newAge', 'newDept', 'newRole', 'newSalary'].forEach(id => document.getElementById(id).value = '');
}

function deleteEmployee() {
  const delName = document.getElementById("deleteName").value.trim().toLowerCase();
  if (!delName) return alert("Enter a name to delete");
  const originalLength = employees.length;
  employees = employees.filter(emp => emp.name.toLowerCase() !== delName);
  displayedEmployees = displayedEmployees.filter(emp => emp.name.toLowerCase() !== delName);
  alert(employees.length === originalLength ? "Employee not found." : "Employee deleted.");
  renderTable(displayedEmployees);
  document.getElementById("deleteName").value = '';
}
