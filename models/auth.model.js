const connection = require('../db-config');
const argon2 = require('argon2');
const db = connection.promise();

const hashingOptions = {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 5,
    parallelism: 1
};

const verifyPassword = (plainPassword, hashedPassword) => {
    return argon2.verify(hashedPassword, plainPassword, hashingOptions);
};

const checkCredentials = async (email) => {
    const checkCredentials= await db.query ('SELECT email, hashedPassword FROM users WHERE email = ?', [email])
    return checkCredentials[0];
};

modules.exports = {
    verifyPassword, 
    checkCredentials,
}
