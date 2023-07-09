/*
read about dotenv here
*/

const dotenv = require('dotenv').config();
module.exports = {
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    ENV: process.env.ENV
}
