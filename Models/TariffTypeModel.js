const Model = require("./Model");

class TariffType extends Model {
    static _tableName = "tariff_types";
    static _fillable = ['name'];


    static {
        super.initialize();
    }
}

module.exports = TariffType;