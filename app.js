const inquirer = require("inquirer");
const {writeFile, copyFile} = require ("./utils/generate-site.js")

const generatePage = require('./src/page-template');

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is your name? (REQUIRED)",
            validate: nameInput => {
                if (nameInput){
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "github",
            message: "Enter your github username (REQUIRED)",
            validate: githubInput => {
                if (githubInput){
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: "confirm",
            name: "confirmAbout",
            message: "would you like to enter some information about yourself for an 'About' setion?",
            default: true
        },
        {
            type: "input",
            name: "about",
            message: "Provide some information about yourself",
            when: ({confirmAbout}) => {
                if (confirmAbout){
                    return true;
                } else {
                    return false;
                }
            }
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
    return inquirer.prompt(
        [{
            type: "input",
            name: "name",
            message: "what is the name of your project? (REQUIRED)",
            validate: projectName => {
                if (projectName){
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "description",
            message: "Provide a description of the Project (REQUIRED)",
            validate: descriptionInput => {
                if (descriptionInput){
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: "checkbox",
            name: "languages",
            message: "What did you build this project with? (Check all that applied)",
            choices: ["JAVASCRIPT", "HTML", "CSS", "ES6", "jQuery", "Bootstrap", "Node"]
        },
        {
            type: "input",
            name: "link",
            message: " Enter the github link to your project. (REQUIRED)",
            validate: linkInput => {
                if (linkInput){
                    return true;
                } else {
                    return false;
                }
            }
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
        return generatePage(portfolioData);
    })
    .then(pageHTML => {
        return writeFile(pageHTML);
    })
    .then(writeFileResponse => {
        console.log(writeFileResponse);
        return copyFile();
    })
    .then(copyFileResponse => {
        console.log(copyFileResponse);
    })
    .catch(err => {
        console.log(err);
    })


