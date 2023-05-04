var uuid = require('node-uuid');
const mongoose = require('mongoose');

var UUID = mongoose.Types.UUID;


const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        nic: {
            type: String,

        },
        email: {
            type: String,
            required: [true, 'Email is required.']
        },
        dob: {
            type: Date
        },
        addressLine1: {
            type: String
        },
        addressLine2: {
            type: String
        },
        city: {
            type: String
        },
        province: {
            type: String
        },
        postalCode: {
            type: Number
        },
        roleId: {
            type: String,
            required: [true, 'Role Code is required.']
        },
        password: {
            type: String,
            required: [true, 'Password is required.']
        },
        passwordResetLinkExpirationDate: {
            type: String
        },
        isActive: {
            type: Boolean
        }
    },
    {
        timestamps: true
    })

const User = mongoose.model('User', userSchema);

module.exports = User;