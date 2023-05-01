const mongoose = require('mongoose');


const flightSchema = mongoose.Schema(
    {
        flightNo: {
            type: String,
            required: [true, 'Flight No is required.']
        },
        departureDestination: {
            type: String,
            required: [true, 'Depart. destination is required.']
        },
        arrivalDestination: {
            type: String,
            required: [true, 'Arriv. destination is required.']
        },
        depatureDate: {
            type: Date,
            required: [true, 'Depart. date is required.']
        },
        arrivalDate: {
            type: Date,
            required: [true, 'Arriv. date is required.']
        },
        airline: {
            type: String,
            required: [true, 'Airline is required.']
        },
        transitTime: {
            type: Number
        },
        economyClass: {
            type: {
                price: Number,
                availableTickets: Number
            }
        },
        businessClass: {
            type: {
                price: Number,
                availableTickets: Number
            }
        },
        isActive: {
            type: Boolean
        }
    },
    {
        timestamps: true
    })

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;