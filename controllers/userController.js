require('dotenv').config();
const mongoose = require('mongoose')
const User = require('../models/userModel')
const Role = require('../models/roleModel')
const passwordHash = require('../utils/passwordHash')
const passwordCompare = require('../utils/passwordCompare')
const jwt = require('jsonwebtoken');
const constants = require('../common/constants')


exports.addUser = async (req, res) => {
    try {

        // assign req body values
        let data = req.body;
        let email = data.email;

        // set pasword hash
        let password = await passwordHash(data.password);

        const userData = await User.findOne({
            'email': email
        })

        if (!userData) {
            // create User
            const user = await User.create({

                firstName: data.firstName,
                lastName: data.lastName,
                nic: data.nic,
                email: data.email,
                dob: data.dob,
                addressLine1: data.addressLine1,
                addressLine2: data.addressLine2,
                city: data.city,
                province: data.province,
                postalCode: data.postalCode,
                roleId: data.roleId,
                password: password,
                isActive: true
            })
            res.status(200).json({ message: constants.MsgAddUserSuccessfull })
        }
        else {
            res.status(403).json({ message: constants.MsgUserExist })
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
}

exports.login = async (req, res) => {
    try {

        // assign req body values
        let data = req.body;

        // set pasword hash
        let username = data.username;
        let password = data.password;

        // 
        const user = await User.findOne({
            'email': username
        })

        if (user) {
            if (user.isActive) {
                let passwordCompareResult = await passwordCompare(password, user.password);
                if (await passwordCompareResult.status) {

                    const role = await Role.findOne({
                        '_id': user.roleId
                    })

                    // Creating payload for token
                    const payload = {
                        nic: user.nic,
                        email: user.email,
                        id: user._id,
                        role: role.name
                    }
                    const token = jwt.sign(payload, process.env.TOKEN_SECRET_KEY, { expiresIn: '8h' })
                    return res.status(200).json({ message: "Login successfull!", token: token });
                }
                else {
                    res.status(403).json({ message: constants.MsgIncorrectUNPW });
                }
            }
            else {
                res.status(403).json({ message: constants.MsgInactiveUser });
            }
        }
        else {
            res.status(403).json({ message: constants.MsgIncorrectUNPW });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}