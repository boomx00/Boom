const db = require('../db/db');
const tableService = require('../services/TableService');

class TableController {
    async createTable(req,res,next){
        try{
            const result = await tableService.createTable(req.body);
            res.status(201).send({
                'status': 'TABLE_CREATED',
                'msg':'Table has been created'
            })
        }catch(err){

        }
    }

    async updateTable(req,res,next){
        try{
            const result = await tableService.updateTable(req.body);
            res.json({
                'status':result
            })
        }catch(err){

        }
    }

    async manageTable(req,res,next){
        const result = await tableService.manageTable(req.body);
        res.json({
            'status': result
        })
    }
}
module.exports = new TableController();