const Model = require("./Model");

class ParkingTariff extends Model {
    static _tableName = "parking_tariffs";
    static _fillable = ['parking_id', "tariff_type_id", "hourly_price", "daily_price"];
    static _pk = ["parking_id", "tariff_type_id"];


    static {
        super.initialize();
    }
}

module.exports = Expense;