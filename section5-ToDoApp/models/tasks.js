const Task = require('./task')

/**
 * Tasks Model.
 * @constructor _list: collection of tasks;
 */
class Tasks {
    _list = {};
    // 'this' works assigning the item _list to all this class,
    // so it can be accesible from everywhere in this class.
    constructor() {
        this._list = {};
    }

    loadTasksFromArray( tasks = []){
        tasks.forEach(task=>{
            this._list[task.id] = task;
        });
    }

    get listArr(){
        const list = [];
        Object.keys(this._list).map(key=>{
            const task = this._list[key];
            list.push(task);
        })
        return list;
    }

    // Create a task with a specify description
    createTask(desc=''){
        const task = new Task(desc);
        this._list[task.id] = task;
    }

    // List all ToDo tasks.
    listAll(){
        console.log();
        this.listArr.map(({description, completedOn}, key)=>{
            const newKey = `${key+1}`.green;
            const isCompleted = completedOn!=null ? 'Completed'.green : 'Pending'.red;
            console.log(`${newKey}. ${description} :: ${isCompleted}`);
        })
    }

    // Logic of show pending tasks or completed tasks.
    listPendingCompleted(completed = true){
        let counter = 0;
        return this.listArr.filter(({description, completedOn})=>{
            if(completed && completedOn){
                counter+=1;
                console.log(`${(counter +'.').green} ${description} :: ${(completedOn).green}`);
            }else if(completed==false && completedOn==null){
                counter+=1;
                console.log(`${(counter +'.').green} ${description} :: ${`Pending`.red}`);
            }
        })
    }

    deleteTask(id){
        if(this._list[id]){
            delete this._list[id];
        }
    }

    toggleTasks(ids = []){
        ids.map((id)=>{
            const task = this._list[id];
            if(!task.completedOn){
                task.completedOn = new Date().toISOString()
            }
        })
        this.listArr.map(task=>{
            if(!ids.includes(task.id)) this._list[task.id].completedOn = null;
        })
    }
}

module.exports = Tasks;
