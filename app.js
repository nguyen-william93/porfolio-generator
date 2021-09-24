const inquirer = require("inquirer");
// const fs = require("fs");

// const generatePage = require('./src/page-template');
// const pageHTML = generatePage(userName, github);

// fs.writeFile('./index.html', pageHTML, err => {
//     if (err) throw err;

//     console.log("Porfolio complete! checkout Index.html to see the output");
// });
const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is your name?"
        },
        {
            type: "input",
            name: "github",
            message: "Enter your github username"
        },
        {
            type: "input",
            name: "about",
            message: "Provide some information about yourself"
        }
    ]);
};

const promptProject = portfolioData => {
    if (!portfolioData.projects){
        portfolioData.projects = [];
    }

    console.log(`
    =================
    ADD a NEW PROJECT
    =================`);
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "what is the name of your project?"
        },
        {
            type: "input",
            name: "description",
            message: "Provide a description of the Project (REQUIRED)"
        },
        {
            type: "checkbox",
            name: "language",
            message: "What did you build this project with? (Check all that applied)",
            choices: ["JAVASCRIPT", "HTML", "CSS", "ES6", "jQuery", "Bootstrap", "Node"]
        },
        {
            type: "input",
            name: "link",
            message: " Enter the github link to your project. (REQUIRED)"
        },
        {
            type: "confrim",
            name: "feature",
            message: "Would you like to feature this project?",
            default: false
        },
        {
            type: "confirm",
            name: "confirmAddProject",
            message: "Would you like to enter another project?",
            default: false
        }

    ]).then(projectData => {
        portfolioData.projects.push(projectData);
        if(projectData.confirmAddProject){
            return promptProject(portfolioData);
        } else {
            return portfolioData;
        }
    })
};

promptUser()
    .then(promptProject)
    .then(portfolioData => {
        console.log(portfolioData);
    });
