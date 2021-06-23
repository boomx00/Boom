const db = require('../db/db');
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

require('dotenv').config()

class ReservationService {
    async createReservation(reservationData){
        try{
            const {user_id,restaurant_id,time,date,people} = reservationData;
            await db.transaction(async(t)=>{
                const id = await db('reservations').transacting(t).insert({
                    user_id: user_id,
                    restaurant_id:restaurant_id,
                    reservation_time: time,
                    reservation_date: date,
                    people: people
                })
            })
            return "RESERVATION_CREATED";
        }catch(err){
            console.log(err);

            return "aa"
        }
    }

    async manageReservation(reservationData){
    try{    
        let result = "RESERVATION_CONFIRMED";
        const {user_id,restaurant_id,status} = reservationData;
        await db.transaction(async(t)=>{
            const reservation = await db('reservations').transacting(t).where('user_id','=',user_id).andWhere('restaurant_id','=',restaurant_id)
            if (status =="declined"){
                result = "RESERVATION_DECLINED";
            }
            if (reservation==""){
                result="RESERVATION_NOT_FOUND";
            }
        
    })
    return result;

  
   }catch(err){
       console.log(err);
        throw(err);
    }
}
}

module.exports = new ReservationService();