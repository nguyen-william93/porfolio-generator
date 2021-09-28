const fs = require("fs");

const writeFile = fileContent => {
    return new Promise((resolve,reject) => {
        fs.writeFile('./dist/index.html', fileContent, err => {
            if (err){
                reject(err);
                return;
            }
            resolve ({
                ok: true,
                message: "File Created!"
            })
        })
    });
};

const copyFile = () => {
    return new Promise ((resolve, reject) => {
        fs.copyFile('./src/style.css', './dist/style.css', err => {
            if (err){
                console.log(err);
                return;
            }
            resolve ({
                ok: true,
                message: "style sheet copied successfully!"
            })
        })
    });
};

module.exports = {writeFile, copyFile};

