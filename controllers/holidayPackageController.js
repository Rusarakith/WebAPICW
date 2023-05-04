require('dotenv').config();
const mongoose = require('mongoose')
const constants = require('../common/constants');
const HolidayPackage = require('../models/holidayPackageModel')


exports.addHolidayPackage = async (req, res) => {
    try {

        // assign req body values
        let data = req.body;
        let packageName = data.name;

        console.log(data)

        const packageData = await HolidayPackage.findOne({
            'name': packageName
        })

        if (!packageData) {
            // create flight
            const package = await HolidayPackage.create({

                name: packageName,
                startDate: data.startDate,
                endDate: data.endDate,
                headsPerPackage: data.headsPerPackage,
                flightId: data.flightId,
                hotelId: data.hotelId,
                price: data.price,
                image: data.image,
                isActive: true

            })
            res.status(200).json({ message: constants.MsgAddPackageSuccessfully })
        }
        else {
            res.status(403).json({ message: constants.MsgPackageExist })
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
}

exports.getAllPackages = async (req, res) => {
    try {

        const packages = await HolidayPackage.find()
        res.status(200).json({ packages: packages });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
}

exports.updateHolidayPackage = async (req, res) => {
    try {

        // assign req body values
        let data = req.body;
        let id = data.id;

        console.log(data)

        const packageData = await HolidayPackage.findOne({
            '_id': id
        })

        if (packageData) {
            // update package
            await HolidayPackage.updateOne({

                startDate: data.startDate,
                endDate: data.endDate,
                headsPerPackage: data.headsPerPackage,
                flightId: data.flightId,
                hotelId: data.hotelId,
                price: data.price,
                image: data.image,
                isActive: true

            })
            res.status(200).json({ message: constants.MsgEditPackageSuccessfully })
        }
        else {
            res.status(403).json({ message: constants.MsgPackageNotExist })
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
}

exports.deletePackage = async (req, res) => {
    try {

        let data = req.body;
        let packageName = data.name;

        const packageData = await HolidayPackage.findOne({
            'name': packageName
        })

        if (packageData) {
            // delete package
            await HolidayPackage.deleteOne({
                '_id': packageData._id
            })
            res.status(200).json({ message: constants.MsgPackageDeletedSuccessfully })
        }
        else {
            res.status(403).json({ message: constants.MsgFlightNotExist })
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
}