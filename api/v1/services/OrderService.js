const db = require('../db/db');

class OrderService{
    async getOrder(orderData){
        try{
            let order = "";
            const {order_id} = orderData
            await db.transaction(async(t)=>{
                order = await db('order_details').where('order_id','=',order_id)

            })

            return order
        }catch(err){
            throw(err)
        }
    }
    async createOrder(orderData){
        try{
            const {user_id,restaurant_id,menu_id,quantity,table_id,orders} = orderData
            await db.transaction(async(t)=>{

                const id = await db('orders').transacting(t).insert({
                    user_id:user_id,
                    restaurant_id:restaurant_id,
                    table_id:table_id
                })
                for(const food_id in orders){
                    await db('order_details').transacting(t).insert({
                        order_id:id,
                        restaurant_id:restaurant_id,
                        menu_id:food_id,    
                        quantity: orders[food_id]
                    })
                }
            })
          return "ORDER_CREATED"
        }catch(err){
            throw(err);
        }
    }

    async editOrder(orderData){
        try{
            const {order_id,restaurant_id,new_orders} = orderData

            await db.transaction(async(t)=>{
            //    if i order 2
                for(const food_id in new_orders){
                    const food = await db('order_details').transacting(t).where('order_id','=',order_id).andWhere('menu_id','=',food_id)
                    const finalamount = parseInt(food[0].quantity) + parseInt(new_orders[food_id])
                    const quantity = new_orders[food_id]
                    // quantity greater than 0 so add new order
                    if(quantity>0){
                        await db('order_details').transacting(t).where('order_id','=',order_id).andWhere('menu_id','=',food_id).update({
                            quantity: finalamount
                        })                
                        await db('new_orders').transacting(t).insert({
                                order_id:order_id,
                                restaurant_id: restaurant_id,
                                menu_id: food_id,
                                quantity: quantity
                        })
                    }
                    // quantity less than 0, so cancel order
                    if(quantity<0){
                        await db('order_details').transacting(t).where('order_id','=',order_id).andWhere('menu_id','=',food_id).update({
                            quantity: finalamount
                        })   
                        await db('cancel_orders').transacting(t).insert({
                                order_id:order_id,
                                restaurant_id: restaurant_id,
                                menu_id: food_id,
                                quantity: parseInt(-quantity)
                        })
                    }
                }
            })
            return "ORDER_CHANGED"

        }catch(err){
            throw (err)
        }
    }

}

module.exports = new OrderService();