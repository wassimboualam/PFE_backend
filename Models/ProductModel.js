const Model = require("./Model");

class Product extends Model {
    static _tableName = "products";
    static _fillable = ['name', 'category', 'size', 'rating', 'demographic', 'price'];
    static _pk = ["id"]; 
    static {
        super.initialize();
    }
}

module.exports = Product;