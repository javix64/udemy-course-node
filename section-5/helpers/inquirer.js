const inquirer = require('inquirer');
require('colors');

const questions = [
    {
        type: 'list',
        name: 'option',
        message: 'What you want to do?',
        // choices:['1. Create a task','opt2','opt3'], this is one option
        choices:[{
            value:'1',
            name:`${'1'.green}. Create a task`
        },
        {
            value:'2',
            name:`${'2'.green}. List task`
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
            name:`${'6'.green}. Delete task`
        },
        {
            value:'0',
            name:`${'0'.green}. Exit`
        },
        ]
    },
]


const inquirerMenu = async() => {
    console.log('=========================='.green);
    console.log('   Choose an option    '.white);
    console.log('==========================\n'.green);
    const {option} = await inquirer.prompt(questions);
    return option;
}

const pause = async () => {
    const pauseQuestion = [{
        name:'isPaused',
        type:'input',
        message:`Press ${'enter'.green} to continue`}]
    console.log('\n');
    const {isPaused} = await inquirer.prompt(pauseQuestion);
    return isPaused;
}

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
