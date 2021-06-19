const db = require('../db/db');
require('dotenv').config()

class RestaurantController {

    async addRestaurant(req,res,next){
        try{
            // Send register restaurant
            const {name,address,logo_url} = req.body
            await db.transaction(async(t)=>{
                try{
                    const id = await t('restaurants').insert({
                        name:name,
                        address:address,
                        logo_url:logo_url,
                    });
                    await t.commit();
                }catch(err){
                    await t.rollback();
                    throw(err);
                }
            })
            res.status(201).send({
                'status': 'REGISTER_RESTAURANT_SUCCESS',
                'msg': "Succesfully registered restaurant"
            })
        }catch(err){
                res.status(500).send({
                  'status': 'REGISTER_FAILED',
                  'msg': 'Failed to register restaurant.',
                  'err': err
                })
    }
    }

    async manageRestaurant(req,res,next){
        try{
            // confirm restaurant
            const {id, action} = req.body;
            if(action == "accept"){
                await db.transaction(async(t)=>{
                try{
                    const confirmRestaurant = await t('restaurants').where('id','=',id).update({
                        verified: 1,
                        status: "accepted" 
                    })
                    await t.commit();
                }catch(err){
                    await t.rollback();
                    throw err;
                }
            })
            res.status(201).send({
                'status': 'RESTAURANT_VERIFIED',
                'msg': 'Restaurant has been verified'
            })
            }

            if(action == "decline"){
                await db.transaction(async(t)=>{
                    try{
                        const confirmRestaurant = await t('restaurants').where('id','=',id).update({
                            verified:0,
                            status: "declined" 
                        })
                        await t.commit();
                    }catch(err){
                        await t.rollback();
                        throw err;
                    }
                })
                res.status(201).send({
                    'status': 'RESTAURANT_DECLINED',
                    'msg': 'Restaurant has been declined, need more data'
                })
            }
          
        }catch(err){

        }
    }
}

module.exports = new RestaurantController();