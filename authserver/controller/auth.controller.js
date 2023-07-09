const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.config");
const crypto = require("crypto")
const { addUserToken, isValidUserToken } = require("../dao/repository/UserToken.repository");
// const { config } = require("dotenv");

exports.accessToken = (req, res) => {
  const payload = req.body;
  const accessToken = getAccessToken(payload);
  const refreshToken = getRefreshToken();
  addUserToken({
    username: payload.username,
    refreshToken: refreshToken,
  })
    .then((result) => {
      console.log("Token Saved in Database!!");
      res.status(200).send({
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    })
    .catch((error) => {
      console.log("Error in Saving Token in Database!!", error);
      res.status(500).send({
        message: "Coudn't Complete Request",
      });
    });
}

exports.aurthorize = (req, res) => {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader.split(" ");
    if (!accessToken){
        res.send(401);
        return;
    }
    jwt.verify(accessToken, authConfig.ACCESS_TOKEN_SECRET, (err, payload) =>{
        if(err) {
            res.status(403)
            return ;
        }
        req.user = payload;
        next() 
    })
}

exports.fetchNewAccessToken = (req, res) => {
    const accessToken = req.body.accessToken;
    const decodedAccessToken = jwt.decode(accessToken)
    console.log(decodedAccessToken)
    console.log(Math.floor(Date.now()/1000))
    console.log(decodedAccessToken.exp)

    if(Math.floor(Date.now()/1000) < decodedAccessToken.exp){
        console.log("kaifmandre")
        res.status(404).send({
            message: "Previous Access code isn't expired"
        })
        return;
    }

    isValidUserToken({
        username: decodedAccessToken.username,
        refreshToken: req.body.refreshToken
    }).then(result => {
        if(result){
            
            res.status(200).send({
                accessToken: getAccessToken({
                    username: decodedAccessToken.username
                }),
                refreshToken: req.body.refreshToken
            })
        }
        res.status(401)
    }).catch(error => {
        console.log("Error Occured", error)
        res.status(500).send({
            message: "Coudn't Complete request "
        })
    })
}

function getRefreshToken() {
  return crypto.randomBytes(64).toString("hex");
}

function getAccessToken(payload) {
  const jitter = Math.random() * 120;
  const expiryTime = 600 + jitter;
  return jwt.sign(payload, authConfig.ACCESS_TOKEN_SECRET, {
    expiresIn: `${expiryTime}s`
  });
}
