const Cart = require("./CartModel");
const Model = require("./Model");

class User extends Model {
    static _tableName = "users";
    static _fillable = ['username'];
    static _pk = ["id"];

    static async getCart(id) {
        return Cart.findBy("user_id", id);
    }

    static {
        super.initialize();
    }
}

module.exports = User;