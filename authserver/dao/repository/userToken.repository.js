const dbConnection = require("./dbConnection");
const { Op } = require("sequelize")
const { CreateUserToken } = require("../model/UserToken.model")

const UserToken = CreateUserToken(dbConnection.connection, dbConnection.Datatypes)

exports.addUserToken = async (userToken) => {
    return await UserToken.create({
        id: userToken.id,
        username: userToken.username,
        refreshToken: userToken.refreshToken
        // expiresAt: Date.now() + (24*60*60*1000*10)
    })
}

exports.isValidUserToken = async (userToken) => {
    const savedUserToken = await UserToken.findOne({
        where: {
            [Op.and]: [
                {
                    username: userToken.username
                },
                {
                    refreshToken: userToken.refreshToken
                }
            ]
        }
    }) 

    return !savedUserToken ? false: true 
}

exports.createUserTokenTable = async() => {
    await UserToken.sync({force: false});
}