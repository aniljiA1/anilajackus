let employees = [
  { firstName: 'Alice', lastName: 'Smith', email: 'alice@example.com', department: 'HR', role: 'Manager' },
  { firstName: 'Bob', lastName: 'Johnson', email: 'bob@example.com', department: 'IT', role: 'Developer' },
  { firstName: 'Charlie', lastName: 'Lee', email: 'charlie@example.com', department: 'Finance', role: 'Analyst' }
];

function displayEmployees(list = employees) {
  const container = document.getElementById('employeeList');
  container.innerHTML = '';
  list.forEach((emp, index) => {
    container.innerHTML += `
      <div class="card">
        <h3>${emp.firstName} ${emp.lastName}</h3>
        <p><strong>Email:</strong> ${emp.email}</p>
        <p><strong>Department:</strong> ${emp.department}</p>
        <p><strong>Role:</strong> ${emp.role}</p>
        <button onclick="editEmployee(${index})">Edit</button>
        <button onclick="deleteEmployee(${index})">Delete</button>
      </div>
    `;
  });
}

function addEmployee(event) {
  event.preventDefault();
  const newEmp = {
    firstName: document.getElementById('firstName').value.trim(),
    lastName: document.getElementById('lastName').value.trim(),
    email: document.getElementById('email').value.trim(),
    department: document.getElementById('department').value.trim(),
    role: document.getElementById('role').value.trim()
  };
  employees.push(newEmp);
  event.target.reset();
  displayEmployees();
}

function deleteEmployee(index) {
  if (confirm('Are you sure?')) {
    employees.splice(index, 1);
    displayEmployees();
  }
}

function editEmployee(index) {
  const emp = employees[index];
  document.getElementById('firstName').value = emp.firstName;
  document.getElementById('lastName').value = emp.lastName;
  document.getElementById('email').value = emp.email;
  document.getElementById('department').value = emp.department;
  document.getElementById('role').value = emp.role;
  deleteEmployee(index); // temporarily delete and re-add after edit
}

function sortEmployees() {
  const sortBy = document.getElementById('sortOption').value;
  if (sortBy) {
    employees.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
    displayEmployees();
  }
}

function applyFilters() {
  const name = document.getElementById('filterName').value.toLowerCase();
  const dept = document.getElementById('filterDept').value.toLowerCase();
  const role = document.getElementById('filterRole').value.toLowerCase();
  const filtered = employees.filter(emp =>
    emp.firstName.toLowerCase().includes(name) &&
    emp.department.toLowerCase().includes(dept) &&
    emp.role.toLowerCase().includes(role)
  );
  displayEmployees(filtered);
}

function resetFilters() {
  document.getElementById('filterName').value = '';
  document.getElementById('filterDept').value = '';
  document.getElementById('filterRole').value = '';
  displayEmployees();
}

document.getElementById('searchInput').addEventListener('input', function () {
  const term = this.value.toLowerCase();
  const filtered = employees.filter(emp =>
    emp.firstName.toLowerCase().includes(term) ||
    emp.lastName.toLowerCase().includes(term) ||
    emp.email.toLowerCase().includes(term)
  );
  displayEmployees(filtered);
});

window.onload = displayEmployees;
