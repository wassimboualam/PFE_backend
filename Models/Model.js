const con = require("../config/connect");

class Model {
    static con = con;
    static _pk = ["id"];
    // constructor shares static methods with instances and stores state of request for instance methods
    constructor(newState) {
        // gets all static methods
        const statics = Object.getOwnPropertyNames(this.constructor)
            .filter(prop => typeof prop.constructor == "function" && !['prototype', 'name', 'length'].includes(prop));

        // binds them to instance
        for (const method of statics) {
            this[method] = this.constructor[method].bind(this.constructor);
        }

    }

    // executes a SQL statement
    static async execStatement(statement, stmtParam) {
        return await new Promise((resolve, reject) => 
            stmtParam===undefined? con.execute(statement, function (error,result) {if(error)reject(error);resolve(result);}):
            con.query(statement, [stmtParam], function (error,result) {if(error)reject(error);resolve(result);})
        );
    }
    
    // CRUD methods
    static async getAll() {
        return await this.execStatement(`SELECT * FROM ${this._tableName}`);
    }

    static async get(id) {
        return await this.execStatement(`SELECT * FROM ${this._tableName} WHERE id = ${id}`);
    }

    static async findBy(field, value) {
        return await this.execStatement(`SELECT * FROM ${this._tableName} WHERE ${field} = ${value}`);
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
    static checkStaticProperty(propertyName) {
        if (!Object.hasOwn(this,propertyName)) {
            throw new Error(propertyName+" not present, must be specified or you can't add a thing");
        }
    }

    // Initialization
    static initialize() {
        ["_tableName", "_fillable"].forEach(v=> this.checkStaticProperty(v));
    }

}

// This function returns a conditional statement involving the primary key of a table that work with the `WHERE` or `ON` statments
function checkPrimaryKey(values ,pkfields = ['id']) {
    let conStmt = "";
    pkfields.forEach((field, index) => {
        const value = values[index];
        conStmt = ` ${field} = ${value} ` + index>0?"AND ":"" + conStmt;
    });
    return conStmt;
}

module.exports = Model;