const db = require('../db/db');
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

require('dotenv').config()

class RestaurantService {
    async createRestaurant(restaurantData){
        try{
            // Send register restaurant
            const {name,address,logo_url} = restaurantData
            await db.transaction(async (t) => {
                const id = await db('restaurants').transacting(t).insert({
                    name:name,
                    address:address,
                    logo_url:logo_url,
                });

            })
            return "RESTAURANT_CREATE_SUCCESSFULL"

        }catch(err){
            throw(err)
    }
    }
    
    async manageRestaurant(restaurantData){
        try{
            const {id, action} = restaurantData;
            if(action == "accepted"){
                await db.transaction(async(t)=>{
                    const query = await t('restaurants').transacting(t).where('id','=',id).update({
                        verified: 1,
                        status: "accepted"
                    })
                        
                    })

                return "RESTAURANT_ACCEPTED"
            }

            if(action == "declined"){
                await db.transaction(async(t)=>{
                    const query= await t('restaurants').transacting(t).where('id','=',id).update({
                        verified:0,
                        status: "declined"
                    })
                })

                return "RESTAURANT_DECLINED"
            }
        }catch(err){
            throw(err)

        }
    }

    async getAllRestaurant(){
        try{
            let data = ""
            await db.transaction(async(t)=>{
                const query = await t('restaurants');
                data = query;
            })
            return data;

        }catch(err){
            throw(err)
        }
    }
}

module.exports = new RestaurantService();