class Model {
    
    // constructor shares static methods with instances and stores state of request for instance methods
    constructor(newState) {
        // gets all static methods
        const statics = Object.getOwnPropertyNames(this.constructor)
            .filter(prop => typeof this.constructor[prop] === 'function' && !['prototype', 'name', 'length'].includes(prop));

        // binds them to instance
        for (const method of statics) {
            this[method] = this.constructor[method].bind(this.constructor);
        }

        // for when an instance is created, it represents a request.
        // requestState can include `where` statements, `limit` statements, `order by` statements...
        this.requestState = newState;
    }
    


    // Conditionals
    static where(firstField, operation, secondField) {
        const whereObject = {"where": [firstField,operation,secondField]};
        // if where is called by the class
        if (typeof this === "function") {
            // create an instance and return it
            return new this([whereObject]);
        } 
        // else if where method is called by an instance
        else if (typeof this === "object") {
            // add whereObject to requestState and return the instance for method chaining
            this.requestState.push(whereObject);
            return this;
        }
    }

    // Operation instance methods
    get() {
        
    }

    // checks for mandatory properties
    static checkTableName() {
        if (!Object.hasOwn(this,"_tableName")) {
            throw new Error("tableName not present, must be specified");
        }
    }

    // Initialization
    static initialize() {
        this.checkTableName();
    }

}

module.exports = Model;