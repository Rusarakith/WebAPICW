const bcrypt = require('bcrypt');

const passwordHash = async (passwordInput) => {
    const saltRounds = 5;
    var hashedPass = '';
    await bcrypt
        .hash(passwordInput, saltRounds)
        .then(hash => {
            hashedPass = hash
        })
        .catch(err => console.error(err.message))
    return hashedPass
}

module.exports = passwordHash;