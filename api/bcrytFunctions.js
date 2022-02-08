const bcrypt = require('bcrypt');
const saltRounds = 10;

const generateHash = async (toHash) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(toHash, salt);
    return hash;
}

module.exports = {generateHash}