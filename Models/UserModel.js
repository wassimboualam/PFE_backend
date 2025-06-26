const Model = require("./Model");

class User extends Model {
    static _tableName = "users";
    static _fillable = ['name', "address", "password", "role"];


    static {
        super.initialize();
    }
}

module.exports = User;