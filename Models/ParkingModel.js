const Model = require("./Model");

class Parking extends Model {
    static _tableName = "parkings";
    static _fillable = ['name', "city", "total_spots", "available_spots"];


    static {
        super.initialize();
    }
}

module.exports = Parking;