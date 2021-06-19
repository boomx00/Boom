const db = require('../db/db');
require('dotenv').config()

class RestaurantController {

    async addRestaurant(req,res,next){
        try{
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
}

module.exports = new RestaurantController();