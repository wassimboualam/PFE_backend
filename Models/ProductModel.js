const Model = require("./Model");

class Product extends Model {
    static _tableName = "products";
    static {
        super.initialize();
    }
}