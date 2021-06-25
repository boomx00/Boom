const db = require('../db/db');
const tableVerifier = async(req,res,next)=>{
try{
    const restaurant_id = req.body.restaurant_id;
    const table_number= req.body.table_number;
    let found = false;
    await db.transaction(async(t)=>{
        const tableExist = await db('tables').transacting(t).where('restaurant_id','=',restaurant_id).andWhere('table_number','=',table_number)
        console.log(tableExist);
        if(tableExist[0]){
            found=true;
        }
    })
    if(found){
        res.status(500).send({
            'status':'DUP_TABLE',
            'message':"There is already a table with that number"
        })
    }else{
        next()
    }
}catch(err){

}
}

module.exports = tableVerifier;