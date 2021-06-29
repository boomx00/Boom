const employeeService = require('../services/EmployeeService');
class EmployeeController{
    async createEmployee(req,res,next){
        try{
            const result = await employeeService.createEmployee(req.body);
        }catch{

        }
    }


}

module.exports = new EmployeeController();