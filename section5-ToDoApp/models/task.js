const { v4: uuidv4 } = require('uuid');

/**
 * The main key of the model that is used in Tasks.
 * 
 * Task : {id, description, completedOn}
 */

class Task {
    id = '';
    description = '';
    completedOn = '';

    constructor( description ){
        this.id = uuidv4();
        this.description = description;
        this.completedOn = null;
    }
}

module.exports = Task;
