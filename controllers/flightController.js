require('dotenv').config();
const mongoose = require('mongoose')
const constants = require('../common/constants');
const Flight = require('../models/flightModel');


exports.addFlight = async (req, res) => {
    try {

        // assign req body values
        let data = req.body;
        let flightNo = data.flightNo;

        console.log(data)

        const flightData = await Flight.findOne({
            'flightNo': flightNo
        })

        if (!flightData) {
            // create flight
            const flight = await Flight.create({

                flightNo: flightNo,
                departureDestination: data.departureDestination,
                arrivalDestination: data.arrivalDestination,
                depatureDate: data.depatureDate,
                arrivalDate: data.arrivalDate,
                airline: data.airline,
                transitTime: data.transitTime,
                economyClass: {
                    price: data.economyPrice,
                    availableTickets: data.economyAvlTickets,
                },
                businessClass: {
                    price: data.businessPrice,
                    availableTickets: data.businessAvlTickets
                },
                isActive: true

            })
            res.status(200).json({ message: constants.MsgAddFlightSuccessfull })
        }
        else {
            res.status(403).json({ message: constants.MsgFlightExist })
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
}
