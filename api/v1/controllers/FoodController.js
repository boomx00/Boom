const foodService = require('../services/FoodService');

class FoodController{
    async createFood(req,res,next){
        try{   
            const result = await foodService.createFood(req.body);

            res.status(201).send({
                'status':"FOOD_CREATED",
                'message':'Food has been created'
            })
        }catch(err){
            res.status(400).send({
                'status':'CREATE_ERROR',
                'message':'Food has not been created'
            })
        }
    }

    async editFood(req,res,next){
        try{
            const result = foodService.editFood(req.body);
            res.status(201).send({
                'status':'FOOD_EDITED',
                'message':'Food has been edited'
            })
        }catch(err){
            res.status(400).send({
                'status':'EDIT_ERROR',
                'message':'Food has not been edited'
            }) 
        }
    }

    async deleteFood(req,res,next){
        try{
            const result = await foodService.deleteFood(req.body);
            res.status(201).send({
                'status':'FOOD_REMOVED',
                'message':'Food has been deleted'
            })
        }catch(err){
            res.status(400).send({
                'status':'DELETE_ERROR',
                'message':'Food has not been deleted'
            })
        }
    }


}


module.exports = new FoodController();