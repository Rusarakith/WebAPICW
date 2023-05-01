require('dotenv').config();
const mongoose = require('mongoose')
const constants = require('../common/constants');
const Hotel = require('../models/hotelModel');


exports.addHotel = async (req, res) => {
    try {

        // assign req body values
        let data = req.body;
        let hotelName = data.hotelName;

        console.log(data)

        const hotelData = await Hotel.findOne({
            'hotel': hotelName
        })

        if (!hotelData) {
            // create hotel
            const hotel = await Hotel.create({

                hotelName: hotelName,
                destination: data.destination,
                starRating: data.starRating,
                basePrice: data.basePrice,
                hasPool: data.hasPool,
                hasKidsPlayArea: data.hasKidsPlayArea,
                hasGym: data.hasGym,
                hasBeachAccess: data.hasBeachAccess,
                deluxeRoom: {
                    price: {
                        fullboardPrice: data.deluxeFullboardPrice,
                        halfBoardPrice: data.deluxeHalfboardPrice,
                        bedAndBreakfastPrice: data.deluxeBedAndBreakfastPrice
                    },
                    availableRooms: data.deluxeAvlRooms,
                },
                superDeluxeRoom: {
                    price: {
                        fullboardPrice: data.superDeluxeFullboardPrice,
                        halfBoardPrice: data.superDeluxeHalfboardPrice,
                        bedAndBreakfastPrice: data.superDeluxeBedAndBreakfastPrice
                    },
                    availableRooms: data.superDeluxeAvlRooms,
                },
                suiteRoom: {
                    price: {
                        fullboardPrice: data.suiteFullboardPrice,
                        halfBoardPrice: data.suiteHalfboardPrice,
                        bedAndBreakfastPrice: data.suiteBedAndBreakfastPrice
                    },
                    availableRooms: data.suiteAvlRooms,
                },
                isActive: true

            })
            res.status(200).json({ message: constants.MsgAddHotelSuccessfully })
        }
        else {
            res.status(403).json({ message: constants.MsgFlightExist })
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
}

exports.getAllHotels = async (req, res) => {
    try {

        const hotels = await Hotel.find()
        res.status(200).json(hotels);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
}