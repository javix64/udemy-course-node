
require('colors');
const {inquirerMenu, pause, readInput, listTasksDeleted, confirm, showListChecklist} = require('./helpers/inquirer');
const Tasks = require('./models/tasks');
const {saveDB, readDB} = require("./helpers/saveFile");

console.clear();

/**
 * Main app logic.
 * First check if there is any data in the "DB" and show it.
 * After this, it starts inquirer menu.
 * After you have choosen an option, app will save into the "DB".
 */
const main = async () => {
    let opt = '';
    const tasks = new Tasks();
    const tasksDB = readDB();

    if(tasksDB) tasks.loadTasksFromArray(tasksDB);

    do {
        opt = await inquirerMenu();

        switch(opt){
            case '1': // Create task
                const description = await readInput('Description: ');
                tasks.createTask(description);
                break;
            
            case '2': // List tasks
                tasks.listAll();
                break;
            
            case '3': // List done tasks
                tasks.listPendingCompleted(true);
                break;
            
            case '4': // List pending tasks
                tasks.listPendingCompleted(false);
                break;

            case '5': // Complete task(s)
                const ids = await showListChecklist(tasks.listArr);
                tasks.toggleTasks(ids);
                console.info(ids);
                break;
            
            case '6': // Delete task(s)
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
