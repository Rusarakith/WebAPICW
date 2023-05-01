const mongoose = require('mongoose');


const holidayPackage = mongoose.Schema(
    {
        packageName: {
            type: String
        },
        startDate: {
            type: Date
        },
        endDate: {
            type: Date
        },
        headsPerPackage: {
            type: String
        },
        flightId: {
            type: String
        },
        hotelId: {
            type: String
        },
        image: {
            type: String
        },
        isActive: {
            type: String
        }
    },
    {
        timestamps: true
    })

const HolidayPackage = mongoose.model('HolidayPackage', holidayPackage);

module.exports = HolidayPackage;