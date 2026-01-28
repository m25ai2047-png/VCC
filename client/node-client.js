const http = require('http');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function getEmployee(employeeId) {
  const options = {
    hostname: '192.168.56.102',
    port: 3000,
    path: `/api/employees/${employeeId}`,
    method: 'GET'
  };

  const req = http.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      if (res.statusCode === 200) {
        const employee = JSON.parse(data);
        console.log('\n--- Employee Details ---');
        console.log(`ID: ${employee.id}`);
        console.log(`Name: ${employee.name}`);
        console.log(`Email: ${employee.email}`);
        console.log(`Department: ${employee.department}`);
        console.log(`Position: ${employee.position}`);
        console.log('------------------------\n');
      } else {
        console.log(`\nError: Employee not found (Status: ${res.statusCode})\n`);
      }
      promptUser();
    });
  });

  req.on('error', (error) => {
    console.error(`\nError: ${error.message}\n`);
    promptUser();
  });

  req.end();
}

function promptUser() {
  rl.question('Enter Employee ID (or "exit" to quit): ', (answer) => {
    if (answer.toLowerCase() === 'exit') {
      rl.close();
      return;
    }

    const employeeId = parseInt(answer);
    if (isNaN(employeeId) || employeeId < 1) {
      console.log('Please enter a valid employee ID.\n');
      promptUser();
      return;
    }

    getEmployee(employeeId);
  });
}
promptUser();
