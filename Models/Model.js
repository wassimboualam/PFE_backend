const con = require("../config/connect");

class Model {
    static con = con;
    // constructor shares static methods with instances and stores state of request for instance methods
    constructor(newState) {
        // gets all static methods
        const statics = Object.getOwnPropertyNames(this.constructor)
            .filter(prop => !['prototype', 'name', 'length'].includes(prop));

        // binds them to instance
        for (const method of statics) {
            this[method] = this.constructor[method].bind(this.constructor);
        }

        // for when an instance is created, it represents a request.
        // requestState can include `where` statements, `limit` statements, `order by` statements...
        // this.requestState = newState;
    }

    static async execStatement(statement, stmtParam) {
        return await new Promise((resolve, reject) => 
            stmtParam===undefined? con.execute(statement, function (error,result) {if(error)reject(error);resolve(result);}):
            con.query(statement, [stmtParam], function (error,result) {if(error)reject(error);resolve(result);})
        );
    }
    
    static async getAll() {
        return await this.execStatement(`SELECT * FROM ${this._tableName}`);
    }

    static async get(id) {
        return await this.execStatement(`SELECT * FROM ${this._tableName} WHERE id = ${id}`);
    }

    static async create(newValues=[]) {
        return await this.execStatement(`INSERT INTO ${this._tableName} (${this._fillable.join(",")}) VALUES ?`, newValues);
    }

    static async update(id, newValues={}) {
        const setStatement = Object.keys(newValues).map(key=>{
            const val = newValues[key];
            return `${key} = ${val}`;
        })
        return await this.execStatement(`UPDATE ${this._tableName} SET ${setStatement.reduce((t,v)=>`${t}, ${v}`)} WHERE id = ${id}`);
    }

    static async delete(id) {
        return await this.execStatement(`DELETE FROM ${this._tableName} WHERE id = ${id}`);
    }

    // checks for mandatory properties
    static checkTableName() {
        if (!Object.hasOwn(this,"_tableName")) {
            throw new Error("tableName not present, must be specified");
        }
    }
    static checkFillable() {
        if (!Object.hasOwn(this,"_fillable")) {
            throw new Error("fillable not present, must be specified or you can't add a thing");
        }
    }

    // Initialization
    static initialize() {
        this.checkTableName();
        this.checkFillable();
    }

}

module.exports = Model;