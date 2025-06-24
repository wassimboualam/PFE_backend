const Model = require("./Model");

class Cart extends Model {
    static _tableName = "carts";
    static _fillable = ['user_id'];
    static _pk = ["id"];

    static async cartContent(id) {
        const stmt = `SELECT c.id AS cart_id, username, p.name AS product_name, quantity, price 
            FROM carts AS c JOIN cart_storage AS cs JOIN users AS u JOIN products AS p 
            ON c.id = cart_id AND u.id = c.user_id AND p.id = cs.product_id AND c.id = ?`;
        return await this.execStatement(stmt, [[[id]]]);
    }

    static async sumCartContent(id) {
        // const stmt = `SELECT c.id AS cart_id, username, SUM(quantity * price) AS total
        //     FROM carts AS c JOIN cart_storage AS cs JOIN users AS u JOIN products AS p 
        //     ON c.id = cart_id AND u.id = c.user_id AND p.id = cs.product_id AND c.id = ?`;
        // return await this.execStatement(stmt, [[[id]]]);
        const cartContent = await this.cartContent(id);
        return cartContent.reduce(
            (t,v) => {
                return {...t, 
                    items: [...t.items, {[v.product_name+" x "+v.quantity] :v.quantity*v.price}],
                    total: t.total+ (v.quantity*v.price)
                } 
            }, {cart_id: id, username: "", total:0, items:[]})

    }

    static {
        super.initialize();
    }
}

module.exports = Cart;