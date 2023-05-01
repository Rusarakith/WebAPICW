const mongoose = require('mongoose');


const hotelSchema = mongoose.Schema(
    {
        hotelName: {
            type: String,
            required: [true, 'Hotel name is required.']
        },
        destination: {
            type: String,
            required: [true, 'Destination is required.']
        },
        starRating: {
            type: Number
        },
        basePrice: {
            type: Number,
        },
        hasPool: {
            type: Boolean
        },
        hasKidsPlayArea: {
            type: Boolean
        },
        hasGym: {
            type: Boolean
        },
        hasBeachAccess: {
            type: Boolean
        },
        deluxeRoom: {
            type: {
                price: {
                    type: {
                        fullboardPrice: Number,
                        halfBoardPrice: Number,
                        bedAndBreakfastPrice: Number
                    }
                },
                availableRooms: Number
            }
        },
        superDeluxeRoom: {
            type: {
                price: {
                    type: {
                        fullboardPrice: Number,
                        halfBoardPrice: Number,
                        bedAndBreakfastPrice: Number
                    }
                },
                availableRooms: Number
            }
        },
        suiteRoom: {
            type: {
                price: {
                    type: {
                        fullboardPrice: Number,
                        halfBoardPrice: Number,
                        bedAndBreakfastPrice: Number
                    }
                },
                availableRooms: Number
            }
        },
        isActive: {
            type: Boolean
        }
    },
    {
        timestamps: true
    })

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;