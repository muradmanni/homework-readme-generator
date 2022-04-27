const inquirer = require('inquirer');
const fs = require('fs');


inquirer
.prompt([
        {
            type: 'input',
            message: 'Please give Project title : ',
            name: 'title'
        },
        {
            type: 'input',
            message: 'Please enter description about this project : ',
            name: 'description'
        },
        {
            type: 'editor',
            message: 'Please give any installation instruction : ',
            name: 'installInstructions'
        },
        {
            type: 'input',
            message: 'Please give usage for the project : ',
            name: 'usage'
        },
        {
            type: 'input',
            message: 'Please enter any contribution guidelines : ',
            name: 'contribution'
        },
        {
            type: 'input',
            message: 'Please give any test instructions : ',
            name: 'testInstructions'
        },
        {
            type: 'list',
            message: 'Please select license for this project : ',
            choices: ['None','Apache License 2.0','MIT License','Eclipse Public License 2.0','The Unlicense'],
            name: 'license'
        },
        {
            type: 'input',
            message: 'Please give github username : ',
            name: 'githubUsername'
        }
    ]
).then((answers) => {
    console.log(answers);
})