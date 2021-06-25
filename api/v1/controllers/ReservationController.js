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
            console.log(err)
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

    
}
module.exports = new ReservationController();