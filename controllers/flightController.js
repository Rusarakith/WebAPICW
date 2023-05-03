require('dotenv').config();
const mongoose = require('mongoose')
const constants = require('../common/constants');
const Flight = require('../models/flightModel');


exports.addFlight = async (req, res) => {
    try {

        // assign req body values
        let data = req.body;
        let flightNo = data.flightNo;

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

exports.getAllFlights = async (req, res) => {
    try {

        const flights = await Flight.find({
            'isActive': true
        })
        res.status(200).json({ flights: flights });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
}

exports.updateFlight = async (req, res) => {
    try {

        // assign req body values
        let data = req.body;
        let id = data.id;

        console.log(id)

        const flightData = await Flight.findOne({
            '_id': id
        })

        if (flightData) {
            // update flight
            await Flight.updateOne({

                flightNo: data.flightNo,
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
                isActive: data.isActive

            })
            res.status(200).json({ message: constants.MsgUpdateFlightSuccessfull })
        }
        else {
            res.status(403).json({ message: constants.MsgFlightNotExist })
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
}

exports.deleteFlight = async (req, res) => {
    try {

        let data = req.body;
        let flightNo = data.flightNo;

        const flightData = await Flight.findOne({
            'flightNo': flightNo
        })

        if (flightData) {
            // delete flight
            const flight = await Flight.deleteOne({
                '_id': flightData._id
            })
            res.status(200).json({ message: constants.MsgFlightDeletedSuccessfully })
        }
        else {
            res.status(403).json({ message: constants.MsgFlightNotExist })
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
}