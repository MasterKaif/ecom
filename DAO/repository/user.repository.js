const { defineUser } = require("../models/User.model");
const dbConnection = require("./dbConnection");

const User = defineUser(dbConnection.connection, dbConnection.Datatypes);
const createUserTable = async(forceCreation) => {
    await User.sync({force: forceCreation});
}
//id, username, emailId, firstName, lastName, phoneNumber, password
const registerUser = async(user) => {
    

    const dbUser = await User.create({
        username: user.username,
        emailId: user.emailId,
        firstName: user.firstname,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        password: user.password 
    })
    
    return {
        username: dbUser.username,
        emailId: dbUser.emailId,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber
    }

}

const fetchUserByCriteria = async(criteria) => {
    return await User.findOne(criteria)
}

module.exports = {
    createUserTable: createUserTable,
    registerUser: registerUser,
    fetchUserByCriteria: fetchUserByCriteria
}
