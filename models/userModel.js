var uuid = require('node-uuid');
const mongoose = require('mongoose');
// require('mongoose-uuid2').loadType(mongoose);

var UUID = mongoose.Types.UUID;


const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'First name is required.']
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required.']
        },
        nic: {
            type: String,

        },
        email: {
            type: String,
            required: [true, 'Email is required.']
        },
        dob: {
            type: Date,
            required: [true, 'Date of birth is required.']
        },
        addressLine1: {
            type: String,
            required: [true, ' Address line 1 is required.']
        },
        addressLine2: {
            type: String
        },
        city: {
            type: String,
            required: [true, 'City is required.']
        },
        province: {
            type: String
        },
        postalCode: {
            type: Number,
            required: [true, 'Postal Code is required.']
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
            type: Boolean,
            required: [true, 'Status is required.']
        }
    },
    {
        timestamps: true
    })

const User = mongoose.model('User', userSchema);

module.exports = User;