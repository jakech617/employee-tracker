const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
  
    port: 3306,
  
    user: 'root',
  
    password: ']VFhFcKD{m8O',
    database: 'employee_db',
});

connection.connect((err) => {
    if (err) throw err;
    init();
});

const init = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'rawlist',
            message: 'What would you like to do?',
            choices: [
                'View all Employees',
                'View all Employees by Department',
                'View all Employees by Manager',
                'Add Employee',
                'Remove Employee',
                'Update Employee Role',
                'Update Employee Manager'
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case 'View all Employees':
                    employeeSearch();
                    break;
                
                case 'View all Employees by Department':
                    empDepSearch();
                    break;
                
                case 'View all Employees by Manager':
                    empManagerSearch();
                    break;
                
                case 'Add Employee':
                    addEmployee();
                    break;
                
                case 'Remove Employee':
                    removeEmployee();
                    break;
                
                case 'Update Employee Role':
                    empRoleUpdate();
                    break;
                
                case 'Update Employee Manager':
                    empManagerUpdate();
                    break;
                
                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        })
    }