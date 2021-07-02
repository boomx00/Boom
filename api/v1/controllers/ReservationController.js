const db = require('../db/db');
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const ReservationService = require('../services/ReservationService');

class ReservationController {

    async createReservation(req,res,next){
        try{
            const result = await ReservationService.createReservation(req.body);
            
            res.status(201).send({
                'status': 'RESERVATION_CREATED',
                'message': 'You have created the reservation'
            })
        }catch(err){
            if(err.code=="ER_NO_REFERENCED_ROW_2"){
                res.status(500).send({
                    'status':'NO_RESTAURANT',
                    'message':'Restaurant does not exist'
                })
            }
        }
    }


    async manageReservation(req,res,next){
        try{
            const result = await ReservationService.manageReservation(req.body);
            
            if(result == "RESERVATION_CONFIRMED"){
                res.status(201).send({
                    'status': 'RESERVATION_CONFIRMED',
                    'message': 'You have confirmed the reservation'
                })
            }else if(result == "RESERVATION_DECLINED"){
                res.status(201).send({
                    'status': 'RESERVATION_DECLINED',
                    'message': 'You have declined the reservation'
                })
            }else{
                res.status(201).send({
                    'status': 'RESERVATION_NOT_FOUND',
                    'message': 'Reservation you are looking for is not found'
                })
            }
        }catch(err){
            console.log(err)
          
        }
    }

    async cancelReservation(req,res,next){
        try{
            if(res.locals.id==req.body.id){
            const result = await ReservationService.cancelReservation(req.body);
            res.status(201).send({
                'status':'RESERVATION_CANCELLED',
                'message':'Reservation has been cancelled'
            })
        }else{
            res.status(500).send({
                'status':'UNAUTHORIZED_ACTION',
                'message':'Unable to change other data'
            })
        }
        }catch(err){
            console.log(err)
        }
    }

    async getUserReservation(req,res,next){
        try{
            const result = await ReservationService.getUserReservation(req.body);
            res.status(201).send({
                'status':'GET_USER_RESERVATION',
                'message':result
            })
        }catch(err){
            throw(err)
        }
    }
async getRestaurantReservation(req,res,next){
        try{
            const result = await ReservationService.getRestaurantReservation(req.body);
            res.status(201).send({
                'status':'GET_RESTAURANT_RESERVATION',
                'message':result
            })
        }catch(err){
            throw(err)

        }
    }
    
}
module.exports = new ReservationController();