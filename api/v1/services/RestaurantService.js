const db = require('../db/db');
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

require('dotenv').config()

class RestaurantService {
    // add restaurant
    async createRestaurant(restaurantData){
        try{
            // Send register restaurant
            const {name,address,logo_url,owner} = restaurantData
            await db.transaction(async (t) => {
                const id = await db('restaurants').transacting(t).insert({
                    name:name,
                    address:address,
                    logo_url:logo_url,
                    owner_id: owner
                });

            })
            return "RESTAURANT_CREATE_SUCCESSFULL"

        }catch(err){
            throw(err)
    }
    }

    // edit restaurant
    async editRestaurant(restaurantData){
        try{
            const {restaurant_id,name,address,logo_url} = restaurantData
            await db.transaction(async(t)=>{
                const restaurant = await db('restaurants').transacting(t).where('id','=',restaurant_id).update({
                    name: name,
                    address:address,
                    logo_url: logo_url
                })
            })
            return "RESTAURANT_UPDATED"
        }catch(err){
            throw (err);
        }
    }
    
    // verify restaurant
    async manageRestaurant(restaurantData){
        try{
            const {restaurant_id, user_id,action} = restaurantData;
            if(action == "accepted"){
                await db.transaction(async(t)=>{
                    const query = await db('restaurants').transacting(t).where('id','=',restaurant_id).update({
                        verified: 1,
                        status: "accepted"
                    })
                    
                    const updateUser = await t('user_roles').transacting(t).where('user_id','=',user_id).update({
                        type_id : 3
                    })
                    })

                return "RESTAURANT_ACCEPTED"
            }

            if(action == "declined"){
                await db.transaction(async(t)=>{
                    const query= await db('restaurants').transacting(t).where('id','=',id).update({
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

    // get all restaurant
    async getAllRestaurant(){
        try{
            let data = ""
            await db.transaction(async(t)=>{
                const query = await db('restaurants');
                data = query;
            })
            return data;

        }catch(err){
            throw(err)
        }
    }

   
}

module.exports = new RestaurantService();