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
            name: 'tests'
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
            name: 'github'
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
    let badge="";
    let licenseLink;
    if(answers.license)
    {
        badge = `(https://img.shields.io/badge/LICENSE-${answers.license.replaceAll(' ','%20')}-green)`;
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



    return  `
![License: ${answers.license}]${badge}
# ${answers.title}

## Description
${answers.description}
    
## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Contribution](#contribution)
- [Tests](#tests)
- [ScreenGIF](#screengif)
- [License](#license)
- [Questions](#questions)

## Installation  
${answers.installation}
      
## Usage      
${answers.usage}
      
## Contribution
${answers.contribution}

## Tests
${answers.tests}

## ScreenGIF
![gif showing installation](assets/screen1.gif)
## License
${licenseLink}
      
## Questions
Feel free to email at ${answers.email}, if you have any further questions relating to this project.

Checkout more on [Github](https://github.com/${answers.github})
    `;
}
