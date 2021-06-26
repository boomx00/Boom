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
            throw err;
        }
    }

    async manageReservation(reservationData){
    try{    
        let result = "RESERVATION_CONFIRMED";
        const {user_id,restaurant_id,table_id,status} = reservationData;
        await db.transaction(async(t)=>{
            const reservation = await db('reservations').transacting(t).where('user_id','=',user_id).andWhere('restaurant_id','=',restaurant_id).update({
                table_id:table_id,
                status:status
            })
           
            if (status =="accepted"){
                await db('tables').transacting(t).where('id','=',table_id).update({
                    reserved:1
                })
            }else{
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

    async cancelReservation(reservationData){
        try{
            
        }catch(err){

        }
    }
}

module.exports = new ReservationService();