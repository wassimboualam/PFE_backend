class Model {
    
    // constructor shares static methods with instances
    constructor() {
        const statics = Object.getOwnPropertyNames(this.constructor)
            .filter(prop => typeof this.constructor[prop] === 'function' && !['prototype', 'name', 'length'].includes(prop));

        for (const method of statics) {
            this[method] = this.constructor[method].bind(this.constructor);
        }
    }
    
    // Conditionals
    static where(firstField, operation, secondField) {
        console.log(arguments);
    }

    // Operation methods
    static get() {
        console.log("get has been called");
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