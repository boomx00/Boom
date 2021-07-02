const { verify } = require('jsonwebtoken');
const tokenVerifier = require('./tokenVerifier');
const db = require('../db/db');
const e = require('express');
const verifyOwner = async(req,res,next)=>{
    try{
        const user_id = res.locals.id;
        let user_level = "";
        const restaurant_id = req.body.restaurant_id;

        await db.transaction(async(t)=>{
            const level = await db('user_roles').transacting(t).where('user_id','=',user_id);
            user_level=level[0].type_id;
        })
        // get current user level
        // 3 = owner
        // 2 = staff
        if(user_level == 3){
            // if owner, check if the restaurant owner is equal to user id
            let restaurant_owner = "";
            await db.transaction(async(t)=>{
                const owner = await db('restaurants').transacting(t).where('id','=',restaurant_id);
                if(owner!=""){
                restaurant_owner = owner[0].owner_id;
                }
            })
            // if equal next else error
        if(user_id == restaurant_owner){
                res.locals.authorized = true;
               next()
            }else{
                res.status(401).send({
                    'status':'UNAUTHORIZED_ACTION',
                    'message':'You are not the restaurant owner'
                    })
            }
        }else if(user_level == 2){
            // if not owner check if employee
            // if employee, check if they are employee of the restaurant
            // also check employee level
            let employee_level="";
            await db.transaction(async(t)=>{
                const manager = await db('restaurant_employee').transacting(t).where('user_id','=',user_id).andWhere('restaurant_id','=',restaurant_id);
                if(manager!=""){
                employee_level = manager[0].role;
                }
            })
            // if employee level is high position, next else error
            if(employee_level == "1" || employee_level =="2"|| employee_level =="3"){
                res.locals.authorized = true;
                next();
                
            }else{
                res.status(401).send({
                    'status':'UNAUTHORIZED_ACTION',
                    'message':'You are unauthorized to do this action'
                    })
            }
        }else{
            res.status(401).send({
                'status':'UNAUTHORIZED_ACTION',
                'message':'You are unauthorized to do this action'
                })
        }
      
    }catch(err){
        console.log(err)
    }
}
// only owner or managers/assistant managers can create employee
module.exports = verifyOwner;