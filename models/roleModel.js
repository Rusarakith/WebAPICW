const mongoose = require('mongoose');


const roleSchema = mongoose.Schema(
    {
        name: {
            type: String
        },
        normalizeName: {
            type: String
        },
        isActive: {
            type: Boolean
        }
    },
    {
        timestamps: true
    })

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;