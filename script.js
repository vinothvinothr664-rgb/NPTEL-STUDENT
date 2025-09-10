// References to DOM elements
const form = document.getElementById("studentForm");
const tableBody = document.querySelector("#studentTable tbody");
const searchInput = document.getElementById("search");

// Load records when page loads
window.onload = loadRecords;

// Handle form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const course = document.getElementById("course").value.trim();
  const score = document.getElementById("score").value.trim();

  if (name === "" || course === "" || score === "") {
    alert("Please fill all fields.");
    return;
  }

  const record = { name, course, score };
  saveRecord(record);
  addRecordToTable(record);
  form.reset();
});

// Save record to localStorage
function saveRecord(record) {
  const records = getStoredRecords();
  records.push(record);
  localStorage.setItem("nptelRecords", JSON.stringify(records));
}

// Get all records from localStorage
function getStoredRecords() {
  return JSON.parse(localStorage.getItem("nptelRecords")) || [];
}

// Load records into table
function loadRecords() {
  const records = getStoredRecords();
  records.forEach(addRecordToTable);
}

// Add a row to the table
function addRecordToTable(record, index = null) {
  const row = tableBody.insertRow();

  const nameCell = row.insertCell(0);
  const courseCell = row.insertCell(1);
  const scoreCell = row.insertCell(2);
  const actionCell = row.insertCell(3);

  nameCell.textContent = record.name;
  courseCell.textContent = record.course;
  scoreCell.textContent = record.score + "%";

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";

  deleteBtn.onclick = () => {
    const rowIndex = row.rowIndex - 1; // Adjust for header
    deleteRecord(rowIndex);
    tableBody.deleteRow(rowIndex);
  };

  actionCell.appendChild(deleteBtn);
}

// Delete a record by index
function deleteRecord(index) {
  const records = getStoredRecords();
  records.splice(index, 1);
  localStorage.setItem("nptelRecords", JSON.stringify(records));
}

// Search filter
searchInput.addEventListener("input", function () {
  const keyword = this.value.toLowerCase();
  const rows = tableBody.getElementsByTagName("tr");

  Array.from(rows).forEach(row => {
    const name = row.cells[0].textContent.toLowerCase();
    const course = row.cells[1].textContent.toLowerCase();

    row.style.display = name.includes(keyword) || course.includes(keyword) ? "" : "none";
  });
});
