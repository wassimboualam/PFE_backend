const express = require('express');
const Parking = require('../Models/ParkingModel');
const parkingRouter = express.Router();

// get all parkings with hourly price below a user input
parkingRouter.get('/api/parking/findAll', async (req, res) => {
    try {
        const maxPrice = req.query.price;
        let parkings = await Parking.getAllParkingAndTariffInfo("pt.hourly_price <= "+maxPrice);
        return res.json(parkings);        
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});


parkingRouter.post('/api/parking/count', async (req, res) => {
    try {
        const {parking_name, date} = req.body;
        let counter = await Parking.countParkingSessions(`p.name = "${parking_name}" AND ps.date = "${date}"`);
        return res.json(counter[0]);        
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});



module.exports = parkingRouter;