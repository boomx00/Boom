const db = require('../db/db');
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

require('dotenv').config()
const RestaurantService = require('../services/RestaurantService');

class RestaurantController {

    async addRestaurant(req,res,next){
        try{
            const result = await RestaurantService.createRestaurant(req.body);
            res.json({
                'msg':result
            })
            if(result=="RESTAURANT_CREATE_SUCCESSFULL"){
                res.status(201).send({
                    'status': 'REGISTER_RESTAURANT_SUCCESS',
                    'msg': "Succesfully registered restaurant"
                })
            }
            // // Send register restaurant
            // const {name,address,logo_url} = req.body
            // await db.transaction(async(t)=>{
            //     try{
            //         const id = await t('restaurants').insert({
            //             name:name,
            //             address:address,
            //             logo_url:logo_url,
            //         });
            //         await t.commit();
            //     }catch(err){
            //         await t.rollback();
            //         throw(err);
            //     }
            // })
            // res.status(201).send({
            //     'status': 'REGISTER_RESTAURANT_SUCCESS',
            //     'msg': "Succesfully registered restaurant"
            // })
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
            const result = await RestaurantService.manageRestaurant(req.body);

           
            if (result=="RESTAURANT_ACCEPTED"){
                res.status(201).send({
                    'status': 'RESTAURANT_VERIFIED',
                    'msg': 'Restaurant has been verified'
                })
            }else if(result == "RESTAURANT_DECLINED"){
                res.status(201).send({
                    'status': 'RESTAURANT_DECLINED',
                    'msg': 'Restaurant has been declined, need more data'
                })
            }
           
          
        }catch(err){
            console.log(err)
            res.status(500).send({
                'status': 'VERIFY_ERROR',
                'msg': 'Issue has occured in verifying.',
                'err': err
              })
        }
    }
}

module.exports = new RestaurantController();