const Model = require("./Model");

class ParkingSession extends Model {
    static _tableName = "parking_sessions";
    static _fillable = ['user_id', "parking_id", "tariff_type_id", "units", "date"];

    static async consultExpenses(userId, startDate, endDate) {
        return await this.getAll(`user_id = ${userId} AND (date BETWEEN "${startDate}" AND "${endDate}")`);
    }

    static {
        super.initialize();
    }
}

module.exports = ParkingSession;