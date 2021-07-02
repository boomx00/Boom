const orderService = require('../services/OrderService')

class OrderController{
    async getOrder(req,res,next){
        try{
            const result = await orderService.getOrder(req.body)
            
            // console.log(result)
            res.status(201).send({
                'status':'GET_SUCCESS',
                'message':result
            })
        }catch(err){
            throw(err)
        }
    }


    async createOrder(req,res,next){
        try{
            const result = await orderService.createOrder(req.body);
            res.status(201).send({
                'status':"ORDER_CREATED",
                'message':"Order has been created"
            })
        }catch(err){
            throw(err)
        }
    }

    async editOrder(req,res,next){
        try{
            const result = await orderService.editOrder(req.body);

            res.status(201).send({
                'status':'ORDER_UPDATED',
                'message':'Order has been updated'
            })
        }catch(err){
            throw(err)
        }
    }

    async getAllOrder(req,res,next){
        try{
            const result = await orderService.getAllOrder(req.body);
            res.status(201).send({
                'status':'GET_ORDERS',
                'message':result
            })
        }catch(err){
            throw(err)
        }
    }

    async getAllDetailedOrder(req,res,next){
        try{
            const result = await orderService.getAllDetailedOrder(req.body)
            res.status(201).send({
                'status':'GET_DETAIL_ORDERS',
                'message':result
            })
        }catch(err){
            throw(err)
        }
    }

    // async getSpecificOrder(req,res,next){
    //     try{        
    //         res.status(201).send({
    //             'status':'GET_SPECIFIC_ORDERS',
    //             'message':result
    //         })
    //         const result = await orderService.getSpecificOrder(req.body)
    //     }catch(err){
    //         throw(err)
    //     }
    // }

}

module.exports = new OrderController();