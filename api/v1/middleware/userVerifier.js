const jwt = require('jsonwebtoken');
const tokenVerifier = require('./tokenVerifier')

const verifyUser = async(req,res,next)=>{
    try{
        if(res.locals.id!=req.body.id){
            res.status(401).send({
                "status":"UNAUTHORIZED_ACCESS",
                "message":"You cannot change that users data"
            })
        }else{
            next();
        }

    }catch(err){

    }
}

module.exports = verifyUser;