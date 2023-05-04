const mongoose = require('mongoose');


const holidayPackageSchema = mongoose.Schema(
    {
        name: {
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
        price: {
            type: Number
        },
        image: {
            type: String
        },
        isActive: {
            type: Boolean
        }
    },
    {
        timestamps: true
    })

const HolidayPackage = mongoose.model('HolidayPackage', holidayPackageSchema);

module.exports = HolidayPackage;