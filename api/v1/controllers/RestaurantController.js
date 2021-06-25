const db = require('../db/db');
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

require('dotenv').config()
const RestaurantService = require('../services/RestaurantService');

class RestaurantController {

    async addRestaurant(req,res,next){
        try{
            const result = await RestaurantService.createRestaurant(req.body);
           
            if(result=="RESTAURANT_CREATE_SUCCESSFULL"){
                res.status(201).send({
                    'status': 'REGISTER_RESTAURANT_SUCCESS',
                    'msg': "Succesfully registered restaurant"
                })
            }
           
        }catch(err){
                res.status(500).send({
                  'status': 'REGISTER_FAILED',
                  'msg': 'Failed to register restaurant.',
                })
    }
    }

    async editRestaurant(req,res,next){
        try{
            const result = await RestaurantService.editRestaurant(req.body);

            res.status(201).send({
                'status': 'RESTAURANT_UPDATED',
                'msg': 'Restaurant details has been udpated'
            })
            console.log(result);
        }catch(err){
            console.log(err);
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

    async getAllRestaurant(req,res,next){
        try{
            const result = await RestaurantService.getAllRestaurant();
            res.status(201).send({
                'msg':result
            })
        }catch(err){
            res.status(500).send({
                'status': 'GET_ERROR',
                'msg': 'Issue has occured in getting all data.',
            })
        }
    }
  
}

module.exports = new RestaurantController();