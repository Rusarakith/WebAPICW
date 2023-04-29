const bcrypt = require('bcrypt');

const passwordCompare = async (passwordInput, savedPassword) => {
    let response = {}
    await bcrypt
        .compare(passwordInput, savedPassword)
        .then(result => {
            if (result) {
                response = { status: true }
            }
            else {
                response = { status: false, message: "Password does not match." }
            }
        })
        .catch(err => { console.log(err);  response = { status: false, message: "Error occurred" } })
    return response
}

module.exports = passwordCompare;