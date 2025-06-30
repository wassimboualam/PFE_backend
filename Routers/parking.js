const express = require('express');
const Parking = require('../Models/ParkingModel');
const User = require('../Models/UserModel');
const TariffType = require('../Models/TariffTypeModel');
const promise = require('../utilities/promise');
const ParkingSession = require('../Models/ParkingSessionModel');
const parkingRouter = express.Router();

// Service name: Ajout d'un stationnement
// Creates a new parking session 
parkingRouter.post("/api/parking/addparkingsession", async (req, res) => {
    try {
        // get all user input
        const { userName, parkingName, tariffTypeName, units, date } = req.body;
        // retreive the ids of the user, parking and tariff type
        const [ userId, parkingId, tariffTypeId ] = promise(resolve => {
                const arr = [ [User, userName], [Parking, parkingName], [TariffType, tariffTypeName] ];
                resolve(arr.map(async value => {
                    const [model, name] = value;
                    const row =  await model.findBy("name", name);
                    return row.id;
                }));
            }
        );
        // group all the relevent data into an array
        const data = [userId, parkingId, tariffTypeId, units, date];
        // Inserting the data as a new parking session
        await ParkingSession.create(data);
        res.status(201).send("Request done successfully");

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Service name: Recherche de parking
// Get all parkings with hourly price below a user input
parkingRouter.get('/api/parking/findall', async (req, res) => {
    try {
        const maxPrice = req.query.price;
        let parkings = await Parking.getAllParkingAndTariffInfo("pt.hourly_price <= "+maxPrice);
        return res.json(parkings);        
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

// Service name: Test du service web
// Count all parking sessions within a specific parking at a specific date
parkingRouter.post('/api/parking/count', async (req, res) => {
    try {
        const {parking_name, date} = req.body;
        let counter = await Parking.countParkingSessions(`p.name = "${parking_name}" AND ps.date = "${date}"`);
        return res.json(counter[0]);        
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

// Service name: Consultation des depenses
// Gets all expenses of the current user between two date inputs
parkingRouter.post('/api/parking/consultexpenses', async (req, res) => {
    try {
        // get the current session's user id and the date inputs
        const { id } = req.session.user;
        const { startDate, endDate } = req.body;

        // consult expenses
        const exprenses = await ParkingSession.consultExpenses(id, startDate, endDate);
        return res.status(200).json({ data:exprenses });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});



module.exports = parkingRouter;