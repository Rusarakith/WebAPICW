require('dotenv').config();
const mongoose = require('mongoose')
const Role = require('../models/roleModel')


exports.addRole = async (req, res) => {
    try {

        const user = await Role.create(req.body)
        res.status(200).json(user);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
}

exports.getAllRoles = async (req, res) => {
    try {

        const roles = await Role.find()
        res.status(200).json({ roles: roles });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
}