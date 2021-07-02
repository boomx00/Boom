const db = require('../db/db')

class FoodService{
    async createFood(foodData){
        try{
            const {restaurant_id,name,description,img_url} = foodData;
            await db.transaction(async (t)=>{
                await db('menus').transacting(t).insert({
                    restaurant_id:restaurant_id,
                    name:name,
                    description:description,
                    img_url:img_url
                })
            })
            return "FOOD_CREATED";
        }catch(err){
            throw (err);
        }
    }

    async editFood(foodData){
        try{
            const {food_id,name,description,img_url} = foodData;
            await db.transaction(async(t)=>{
                await db('menus').transacting(t).where('id','=',food_id).update({
                    name:name,
                    description:description,
                    img_url:img_url
                })
            })

            return "FOOD_EDITED"
        }catch(err){
            throw (err);
        }
    }

    async deleteFood(foodData){
        try{
            const {food_id} = foodData;
            await db.transaction(async (t)=>{
            await db('menus').transacting(t).where('id','=',food_id).del()
        })
        return "FOOD_DELETED"
        }catch(err){
            throw (err)
        }
    }

    async getFood(foodData){
        try{
            let food =""
            const {food_id} = foodData
            await db.transaction(async (t)=>{
                food = await db('menus').transacting(t).where('id','=',food_id)
            })
            return food
        }catch(err){
            throw(err)
        }
    }
}

module.exports = new FoodService();