const db = require ('../db/db');
class TableService {

    async createTable(tableData){
      try{  const {restaurant_id,table_number,amount} = tableData;

        await db.transaction(async(t)=>{
            await db('tables').transacting(t).insert({
                restaurant_id:restaurant_id,
                table_number:table_number,
                amount: amount
            })

            return 'CREATE_TABLE_SUCCESS';
        })}catch(err){
            throw (err);
        }
    }

    async updateTable(tableData){
        try{
            const {restaurant_id, table_number,amount} = tableData
            await db.transaction(async(t)=>{
                await db('tables').transacting(t).where('restaurant_id','=',restaurant_id).andWhere('table_number','=',table_number).update({
                    table_number:table_number,
                    amount:amount
                })
            })
            

            return 'TABLE_UPDATED'
        }catch(err){
            throw(err)
        }
    }

    async manageTable(tableData){
     try{   const {restaurant_id,table_number,used} = tableData
     await db.transaction(async(t)=>{
         await db('tables').transacting(t).where('restaurant_id','=',restaurant_id).andWhere('table_number','=',table_number).update({
        used:used
    }
    )})
        
        if(used==true){
            return 'TABLE_USED'
        }else{
            return 'TABLE_UNUSED'
        }}catch(err){
            throw (err);
        }
    }
}
module.exports = new TableService();