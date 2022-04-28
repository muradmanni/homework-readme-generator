const inquirer = require('inquirer');
const fileSystem = require('fs');


inquirer
.prompt([
        {
            type: 'input',
            message: 'Please give Project title : ',
            name: 'title',
            validate (value){
                if (!value)
                {
                    return ("Title cannot be blank.");
                }
                return true;
            }
        },
        {
            type: 'input',
            message: 'Please enter description about this project : ',
            name: 'description',
            validate (value){
                if (!value)
                {
                    return ("Description cannot be blank.");
                }
                return true;
            }
        },
        {
            type: 'editor',
            message: 'Please give any installation instruction : ',
            name: 'installation'
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
            name: 'instructions'
        },
        {
            type: 'list',
            message: 'Please select license for this project : ',
            choices: ['Apache License 2.0','MIT License','Eclipse Public License 2.0','The Unlicense'],
            name: 'license'
        },
        {
            type: 'input',
            message: 'Please give github username : ',
            name: 'githubUsername'
        },
        {
            type: 'input',
            message: 'Please enter email address to contact : ',
            name: 'email'
        }
    ]
).then((answers) => {
    const readme=generateReadme(answers);
    fileSystem.writeFile('./generatedReadme/README.md', readme, (err)=>{
        err ? console.error(err) : console.log("Success");
    })
})

function generateReadme(answers){
    let readme="";
    let licenseLink;
    if(answers.license)
    {
        readme = `https://img.shields.io/badge/LICENSE-${answers.license.replaceAll(' ','%20')}-green`;
    }
    switch (answers.license)
    {
        case 'Apache License 2.0':
            licenseLink = `This project is covered under ${answers.license}. 
            For more information [clickhere](https://opensource.org/licenses/Apache-2.0)`;
            break;
        case 'MIT License':
            licenseLink = `This project is covered under ${answers.license}. 
            For more information [click here](https://opensource.org/licenses/MIT)`;
            break;
        case 'Eclipse Public License 2.0':
            licenseLink = `This project is covered under ${answers.license}. 
            For more information [click here](https://opensource.org/licenses/EPL-2.0)`;
            break;
            
        default:
            licenseLink = `This project is covered under ${answers.license}.`;
            break;
    }



    return  `${readme}

## Description
${answers.description}
    
## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contribution](#contribution)
- [Tests](#tests)
- [Questions](#questions)

## Installation  
${answers.installation}
      
## Usage
      
${answers.usage}
      
## License
${licenseLink}
      
    
## Contribution
${answers.contribution}

## Tests
${answers.testInstructions}
    
## Questions
Feel free to email at ${answers.email}, if you have any further questions relating to this project.
    `;
}
