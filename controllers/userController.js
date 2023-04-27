require('dotenv').config();
const mongoose = require('mongoose')

exports.connectionBuilder = async () => {
    try {

        mongoose.connect(process.env.MONGODB_CONNECTION_URL).then(() => {
            console.log("DB Connected Successfully!");
        }).catch((error) => {
            console.log(error);
        })

    } catch (err) {
        console.log(err);
    }
}