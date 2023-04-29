require('dotenv').config();
const mongoose = require('mongoose')
const User = require('../models/userModel')


exports.addUser = async (req, res) => {
    try {

        const user = await User.create(req.body)
        res.status(200).json(user);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
}