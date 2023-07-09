const bcrypt = require("bcrypt");
const { fetchUserByCriteria } = require("../DAO/repository/user.repository");
const userRepository = require("../DAO/repository/user.repository");
const{ Op }= require("sequelize")

const registerUser = (req, res) => {
    encryptPassword(req.body.password)
    .then(hashedPassword => {
        req.body.password = hashedPassword;
        return userRepository.registerUser(req.body)
    })
    .then(result => {
        res.status(200).send(result)
    })
    .catch(error => {
        console.log(error)
        res.status(500).send({
            message: "Some error occured at the time of registration. Please try again after sometime!"
        })
    })
}

const loginUser = (req, res) => {
    userRepository.fetchUserByCriteria({
        where: {
            [Op.or]: [
                {
                    username: req.body.username
                }
            ]
        }
    }).then(user => {
        return authenticatePassword(req.body.password, user.password)
    })
    .then(result => {
        if(!result){
            res.status(401).send({
                message: "Incorrect username or password !!"
            })
            return 
        }

        
        res.status(200).send({
            message: "loggedIn Successfully"
        })
    })
    .catch(error => {
        console.log(error)
        res.status(500).send({
            message: "Error in logging Try again"
        })
    })
}

const encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt()
    return await bcrypt.hash(password, salt)
}

const authenticatePassword = async(password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword)
}

module.exports = {
    registerUser: registerUser,
    loginUser: loginUser
}