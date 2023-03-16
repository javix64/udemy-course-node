const fs = require('fs');
/**
 * This file is used to read and write in the database.
 * At the end the database is just a json file.
 */

const file = './db/data.json'
const saveDB = (data) => {
    fs.writeFileSync(file, JSON.stringify(data));
}

const readDB = () => {
    if(!fs.existsSync(file)){ return null}
    const info = fs.readFileSync(file,{encoding:'utf-8'});
    const data = JSON.parse(info);
    return data;
}

module.exports = {
    saveDB,
    readDB
}
