const mongoose = require('mongoose');


const mealTypeSchema = mongoose.Schema(
    {
        mealType: {
            type: String
        },
        price: {
            type: String
        },
        isActive: {
            type: Boolean
        }
    },
    {
        timestamps: true
    })

const MealTypes = mongoose.model('MealTypes', mealTypeSchema);

module.exports = MealTypes;