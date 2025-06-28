const Model = require("./Model");

class Parking extends Model {
    static _tableName = "parkings";
    static _fillable = ['name', "city", "address", "total_spots", "available_spots"];

    // gets all parking info including info from parking_tariffs table
    static async getAllParkingAndTariffInfo(conditions = null) {
        const OnClause = "On p.id = pt.parking_id " + (conditions===null? "": "AND "+conditions);
        const ParkingData = await this.execStatement(`SELECT name, city, address, total_spots, available_spots, hourly_price, daily_price 
            FROM parkings AS p JOIN parking_tariffs AS pt ${OnClause}`);
        return ParkingData;
    }

    // gets all parking info including info from parking_tariffs table
    static async countParkingSessions(conditions = null) {
        const OnClause = "On p.id = ps.parking_id " + (conditions===null? "": "AND "+conditions);
        const ParkingData = await this.execStatement(`SELECT COUNT(ps.id), p.name, ps.date
            FROM parking_sessions AS ps JOIN parkings AS p ${OnClause}`);
        return ParkingData;
    }


    static {
        super.initialize();
    }
}

module.exports = Parking;