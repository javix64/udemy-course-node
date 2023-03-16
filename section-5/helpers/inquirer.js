const inquirer = require('inquirer');
require('colors');


const questions = [
    {
        type: 'list',
        name: 'option',
        message: 'What you want to do?',
        // choices:['1. Create a task','opt2','opt3'], this is another way to set up choices.
        choices:[{
            value:'1',
            name:`${'1'.green}. Create a task`
        },
        {
            value:'2',
            name:`${'2'.green}. List tasks`
        },
        {
            value:'3',
            name:`${'3'.green}. List done tasks`
        },
        {
            value:'4',
            name:`${'4'.green}. List pending tasks`
        },
        {
            value:'5',
            name:`${'5'.green}. Complete task(s)`
        },
        {
            value:'6',
            name:`${'6'.green}. Delete task(s)`
        },
        {
            value:'0',
            name:`${'0'.green}. Exit`
        },
        ]
    },
]

/**
 * It starts the Inquirer Menu.
 * Check the variable questions to see retrieve all choices.
 * @returns inquirer.prompt - Choose the option that you want.
 */
const inquirerMenu = async() => {
    console.log('=========================='.green);
    console.log('   Choose an option    '.white);
    console.log('==========================\n'.green);
    const {option} = await inquirer.prompt(questions);
    return option;
}

/**
 * @returns inquirer.prompt - ask if you want to continue.
 */
const pause = async () => {
    const pauseQuestion = [{
        name:'isPaused',
        type:'input',
        message:`Press ${'enter'.green} to continue`}]
    console.log('\n');
    const {isPaused} = await inquirer.prompt(pauseQuestion);
    return isPaused;
}

/**
 * @param {String} message 
 * @returns inquirer.prompt - reading input that was received by param.
 */
const readInput = async(message) => {

    const question = [
        {
            type:'input',
            name:'desc',
            message,
            validate(value){
                if(value.length===0){
                    return 'Please insert a value'
                }
                return true;
            }
        }
    ]
    const {desc} = await inquirer.prompt(question);
    return desc;
}

/**
 * It receives a list of task and will delete if you want.
 * @param {Array} tasks 
 * @returns inquirer.prompt - ask if you want delete the choosen ones.
 */
const listTasksDeleted = async (tasks = []) =>{
    const choices = tasks.map((task, i)=>{
        const idx = `${i+1}.`.green;
        return {
            value: task.id,
            name: `${idx} ${task.description}`
        }
    });
    choices.unshift({
        value: '0',
        name:'0.'.green+' Cancelar'
    })
    const question = [{
        type: 'list',
        name: 'id',
        message:'Delete',
        choices
    }];
    const {id} = await inquirer.prompt(question);
    return id;
};

/**
 * Select ToDo tasks that you want.
 * @param {Array} tasks 
 * @returns inquirer.prompt - retrieves a list of checkboxes
 */
const showListChecklist = async (tasks = []) =>{
    const choices = tasks.map((task, i)=>{
        const idx = `${i+1}.`.green;
        return {
            value: task.id,
            name: `${idx} ${task.description}`,
            checked: (task.completedOn) ? true : false
        }
    });

    const question = [{
        type: 'checkbox',
        name: 'ids',
        message:'Select',
        choices
    }];

    const {ids} = await inquirer.prompt(question);
    return ids;
};

/**
 * @param {String} message 
 * @returns inquirer.prompt - Retrieve a message if you want confirm
 */
const confirm = async (message) => {
    const question = [{
        type: 'confirm',
        name: 'ok',
        message
    }]
    const {ok} = await inquirer.prompt(question);
    return ok;
}


module.exports = {
    inquirerMenu,
    pause,
    readInput,
    listTasksDeleted,
    confirm,
    showListChecklist
}
