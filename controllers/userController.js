require('dotenv').config();
const mongoose = require('mongoose')
const User = require('../models/userModel')
const Role = require('../models/roleModel')
const passwordHash = require('../utils/passwordHash')
const passwordCompare = require('../utils/passwordCompare')
const jwt = require('jsonwebtoken');
const UuidEncoder = require('uuid-encoder');
const nodemailer = require('nodemailer');
const constants = require('../common/constants')

var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    pool: true,
    auth: {
        user: `${process.env.EMAIL_AUTH_USER}`,
        pass: `${process.env.EMAIL_AUTH_PASS}`,
    },
});


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
};

exports.forgotPassword = async (req, res) => {
    // assign req body values
    let data = req.body;

    let email = data.email

    try {
        const user = await User.findOne({
            'email': email
        })

        if (user) {
            let id = (user._id).toString()
            let passwordResetURL = process.env.CLIENT_BASE_URL + "/resetPassword?id=" + id;
            let body = `<html><body><p>Dear User,<br><br>Please find the requested account password <a href=${passwordResetURL}>reset link.</a><br>The above link will expire in 30 minutes!<br><br>If you need any help, please contact admin: ${process.env.ADMIN_EMAIL}<br>Thank you.<br><br>Regards,<br>Administrator,<br>Holiday Travels - Sri Lanka.</p></body></html>`

            function addMinutes(date, minutes) {
                date.setMinutes(date.getMinutes() + minutes);
                return date;
            }

            await User.updateOne({
                'PasswordResetLinkExpirationDate': addMinutes(new Date(), 30)
            })

            sendEmail(user.email, body, 'Account Password Reset - Holiday Travels')
            return res.status(200).json({ message: constants.MsgResetLinkSent });
        }
        else {
            return res.status(400).json({ message: constants.MsgUserNotExist });
        }
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: err.message });
    }
};

exports.resetPassword = async (req, res) => {
    let data = req.body;

    let id = data.id
    let password = data.password

    try {


        const user = await User.findOne({
            '_id': id
        })

        let passwordResetLinkExpirationDate = user.PasswordResetLinkExpirationDate

        if (new Date() <= new Date(passwordResetLinkExpirationDate)) {
            if (user) {
                await User.updateOne({
                    Password: await passwordHash(password),
                })
                return res.status(200).json({ message: constants.MsgPasswordResetSuccessfully });
            }
            else {
                return res.status(400).json({ message: constants.MsgInvalidResetLink });
            }
        }
        else {
            return res.status(400).json({ message: constants.MsgLinkExpired });
        }


    }
    catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: err.message });
    }
};

// Send email
async function sendEmail(email, text, subject) {
    let mailOptions = {
        from: `${process.env.EMAIL_AUTH_USER}`,
        to: `${email}`,
        subject: subject,
        html: text
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Error while sending email - ' + error);
            return false
        }
        else {
            console.log('Email sent: ' + info.response);
            return true
        }
    });
}