const db = require('../db/db');
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

require('dotenv').config()

class UserController {
  //  Handle local register
  async createUser(req, res, next) {
    try{
      let email = req.body.email;
      var salt = bcryptjs.genSaltSync(10);
      let password = bcryptjs.hashSync(req.body.password, salt);
  
      let checkUser = await db('users').where('email', email)
  
      if(checkUser==""){
        const createUserMylist = (email,password) => db.transaction(trx => 
          trx('users')
           .insert({
            "email" : email,
            "password" : password
           }))
           .then(function(){
            res.json({
              id:createUserMylist[0],
              email,
              password
            })
           })
  
           createUserMylist(email,password)
      
      }else{
        res.json({
          STATUS: "USERNAME_USED"
        })
      }
    }
    catch(e){
      console.log(e)
      next(e)
    }
  }

  // Handle local login
  async userLogin(req, res, next) {
    try{
      let email = req.body.email;
      let password = req.body.password;
      let user = await db('users').where('email',email)

     
      // if user exist
      if(user!=""){
        
        bcryptjs.compare(password, user[0].password,(err,auth)=>{
          if(auth==true){
            const token = jwt.sign({
              data:{
                userId:user[0].id
              }
            }, process.env.JWT_PRIVATE_KEY,{expiresIn:'30d'});
            res.status(201).send({
              'STATUS':'LOGIN_SUCCESS',
              'token': token
            })
          }else{
            res.status(401).send({
              'STATUS':'FAILED_LOGIN',
              'MESSAGE':'WRONG PASSWORD'
            })
          }
        })
      }else{
        res.status(401).send({
          'STATUS': 'FAILED_LOGIN',
          'MESSAGE': 'USER NOT FOUND'
        })
      }

    }
    catch(e){

    }
  }

  // Handle user edit profile
  async editUser(req, res, next) {
    try{
      let email = req.body.email
      let phone = req.body.phone
      let name = req.body.name
      let user = await db('users').where('email',email)
      const checkUser = (email,name,phone)=> db.transaction(trx=>trx('users')
      .where('email','=',email)
      .update({
          name: name,
          phone:phone
      })
      )
      .then(function(){
        res.status(201).send({
          'MESSAGE':'USER_UPDATED'
        })
      })

      if(user!=""){
        checkUser(email,name,phone)
      }else{
        res.status(400).sen({
          'MESSAGE':'USER_UPDATE_FAIL'
        })
      }
    }
    catch(e){
      console.log(e)
    }
  }
}

module.exports = new UserController();