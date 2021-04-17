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
            message: 'What would you like to do?',
            type: 'rawlist',
            name: 'action',
            choices: [
                'View Employees',
                'View Departments',
                'View Roles',
                'Add Employee',
                'Add Department',
                'Add Role',
                'Update Employee Role',
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case 'View Employees':
                    employeeSearch();
                    break;
                
                case 'View Departments':
                    depSearch();
                    break;
                
                case 'View Roles':
                    roleSearch();
                    break;
                
                case 'Add Employee':
                    addEmployee();
                    break;
                
                case 'Add Department':
                    addDepartment();
                    break;

                case 'Add Role':
                    addRole();
                    break;
                
                case 'Update Employee Role':
                    empRoleUpdate();
                    break;
                
                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;
            };
        });
    };

const employeeSearch = () => {
    const query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department on role.department_id = department.id;";
    connection.query(query, (err, res) => {
        if(err) throw err;
        console.table(res);
    });
    
    init();
};

const depSearch = () => {
    connection.query('SELECT * FROM department', (err,  res) => {
        if(err) throw err;
        console.table(res);
        
        init();
    });
};

const roleSearch = () => {
    connection.query('SELECT * FROM role', (err,  res) => {
        if(err) throw err;
        console.table(res);
        
        init();
    });
};

const addEmployee = () => {
    inquirer
        .prompt([
            {
                message: "What is the Employee's first name?",
                type: 'input',
                name: 'firstName'
            },
            {
                message: "What is the Employee's last name?",
                type: 'input',
                name: 'lastName'
            },
            {
                message: "What is the Employee's Role ID number?",
                type: 'input',
                name: 'roleId'
            },
            {
                message: "What is the Employee's Manager ID number?",
                type: 'input',
                name: 'managerId'
            }
    ])
    .then((answer) => {
        connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (${answer.id}, "${answer.firstName}", "${answer.lastName}", ${answer.roleId}, ${answer.managerId})`), (err, res) => {
            if(err) throw err;
            console.table(res);
            console.log('Success!');
            console.log('Employee added.');
        };
        
        init();
    });
};

const addDepartment = () => {
    inquirer
        .prompt([
            {
                message: "What is the name of the new Department?",
                type: 'input',
                name: 'depName'
            }
        ])
    .then((answer) => {
        connection.query(`INSERT INTO department (name) VALUES ('${answer.depName}')`), (err, res) => {
            if(err) throw err;
            console.table(res);
            console.log('Success!');
            console.log('Department created.');
        };
    
        init();
    });
};

const addRole = () => {
    inquirer
        .prompt([
            {
                message: "What is the name of the new Role?",
                type: 'input',
                name: 'roleTitle'
            },
            {
                message: "What is the salary for the new Role?",
                type: 'input',
                name: 'roleSalary'
            },
            {
                message: "What is Role's department ID?",
                type: 'input',
                name: 'roleId'
            },
        ])
    .then((answer) => {
        connection.query(`INSERT INTO role (title, salary, department_id) VALUES ('${answer.roleTitle}', ${answer.roleSalary}, ${answer.roleId})`), (err, res) => {
            if(err) throw err;
            console.table(res);
            console.log('Success!');
            console.log('Role created.');
        };

        init();
    });
};

const empRoleUpdate = () => {
    inquirer
        .prompt([
            {
                message: "What is the Employee's ID number?",
                type: 'input',
                name: 'employeeId'
            },
            {
                message: "What is the Employee's new role ID number?",
                type: 'input',
                name: 'newId'
            },
        ])
        .then((answer) => {
            const query = `UPDATE employee SET role_id = ? WHERE id = ?`;
            connection.query(query, [answer.newId, answer.employeeId], (err, res) => {
                if(err) throw err;
                console.log('Success!');
                console.log('Role updated.');
            });
            
            init();
        });
};