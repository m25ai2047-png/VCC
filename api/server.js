const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Load employee data
const employeesPath = path.join(__dirname, 'employees.json');
const employees = JSON.parse(fs.readFileSync(employeesPath, 'utf8'));

// Get employee by ID
app.get('/api/employees/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const employee = employees.find(emp => emp.id === id);

  if (employee) {
    res.json(employee);
  } else {
    res.status(404).json({ error: 'Employee not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Try: http://localhost:${PORT}/api/employees/1`);
});
