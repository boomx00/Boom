const db = require('../db/db')

const employeeVerifier = async (req,res,next)=>{
try{
    const user_id = res.locals.id;
    const user_level = res.locals.level;
    const restaurant_id = req.body.restaurant_id
    let exist = ""

    if(user_level == 2 || user_level == 3){

        await db.transaction(async(t)=>{

            exist =  await db('restaurant_employee').transacting(t).where('user_id','=',user_id).andWhere('restaurant_id','=',restaurant_id)
        })
        if(exist!=""){
            next();
        }else{
            res.status(401).send({
                'status':'UNAUTHORIZED_ACTION',
                'message':'You are not an employee'
            })
        }
    }else{
        res.status(401).send({
            'status':'UNAUTHORIZED_ACTION',
            'message':'You are not an employee'
        })
}
}catch(err){
    console.log(err)
}
}

module.exports = employeeVerifier;