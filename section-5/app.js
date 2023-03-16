
require('colors');
const {inquirerMenu, pause, readInput, listTasksDeleted, confirm, showListChecklist} = require('./helpers/inquirer');
const Tasks = require('./models/tasks');
const {saveDB, readDB} = require("./helpers/saveFile");

console.clear();

const main = async () => {
    let opt = '';
    const tasks = new Tasks();
    const tasksDB = readDB();

    if(tasksDB){ // Load tasks
        tasks.loadTasksFromArray(tasksDB);
    }

    do {
        opt = await inquirerMenu();

        switch(opt){
            case '1':
                const description = await readInput('Description: ');
                tasks.createTask(description);
                break;
            
            case '2':
                tasks.listAll();
                break;
            
            case '3':
                tasks.listPendingCompleted(true);
                break;
            
            case '4':
                tasks.listPendingCompleted(false);
                break;
            case '5':
                const ids = await showListChecklist(tasks.listArr);
                tasks.toggleTasks(ids);
                console.info(ids);
                break;
            
            case '6':
                const id = await listTasksDeleted(tasks.listArr);
                if(id =='0') continue;
                const ok = await confirm('Are you sure?');
                if(ok) {
                    tasks.deleteTask(id);
                    console.log('Task deleted');
                }
                break;
        }

        saveDB(tasks.listArr);

        await pause();

    } while(opt!=='0');


}

main();
