const { verify } = require('jsonwebtoken');
const tokenVerifier = require('./tokenVerifier');
const db = require('../db/db');
const verifyOwner = async(req,res,next)=>{
    try{
        const user_id = res.locals.id;
        const restaurant_id = req.body.restaurant_id;
        let restaurant_owner = "";
        await db.transaction(async(t)=>{
            const owner = await db('restaurants').transacting(t).where('id','=',restaurant_id);
            restaurant_owner = owner[0].owner_id;
        })
     
        if(user_id != restaurant_owner){
            res.status(401).send({
                'status':'UNAUTHORIZED_OWNER',
                'message':'You are not the restaurant owner'
            })
        }else{
            next();
        }
    }catch(err){
        console.log(err)
    }
}

module.exports = verifyOwner;