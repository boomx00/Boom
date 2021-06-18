const db = require('../db/db');
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

require('dotenv').config()

class UserController {
  //  Handle local register
  async createUser(req, res, next) {
    try {
      //let email = req.body.email; Kalo mau ngeparse body kaya di bawah aja
      const { email, password, firstName, lastName, phoneNum } = req.body;
      const hash = await bcryptjs.hash(password, 10);
      await db.transaction(async (t) => {
        try {
          const id = await t('users').insert({
            email: email,
            password: hash
          });
          await t('user_profiles').insert({
            user_id: id,
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNum
          });
          await t.commit();
        } catch (err) {
          await t.rollback();
          console.log(err);
          throw err;
        }
      })
      res.status(201).send({
        'status': 'REGISTER_SUCCESS',
        'msg': 'Successfully register a new account.'
      })
    }
    catch (err) {
      if (err.code == "ER_DUP_ENTRY") {
        res.status(500).send({
          'status': 'REGISTER_FAILED',
          'msg': 'Failed to register a new account, account already exists',
          'err': err
        })
      } else {
        res.status(500).send({
          'status': 'REGISTER_FAILED',
          'msg': 'Failed to register a new account.',
          'err': err
        })
      }
    }
  }

  // Handle local login
  async userLogin(req, res, next) {
    try {
      let email = req.body.email;
      let password = req.body.password;
      let user = await db('users').where('email', email)
      

      // if user exist
      if (user != "") {

        bcryptjs.compare(password, user[0].password, (err, auth) => {
          if (auth == true) {
            const token = jwt.sign({
              data: {
                userId: user[0].id
              }
            }, process.env.JWT_PRIVATE_KEY, { expiresIn: '30d' });
            res.status(201).send({
              'STATUS': 'LOGIN_SUCCESS',
              'token': token
            })
          } else {
            res.status(401).send({
              'STATUS': 'FAILED_LOGIN',
              'MESSAGE': 'WRONG PASSWORD'
            })
          }
        })
      } else {
        res.status(401).send({
          'STATUS': 'FAILED_LOGIN',
          'MESSAGE': 'USER NOT FOUND'
        })
      }

    }
    catch (e) {
      console.log(e)
    }
  }

  // Handle user edit profile
  async editUser(req, res, next) {
    try {
    
      const { id,email, firstName, lastName, phoneNum } = req.body;

      // let user = await db('users').where('email',email)
      await db.transaction(async (t) => {
        try {
          const changeUser = await t('user_profiles').where('user_id','=',id).update({
            first_name:firstName,
            last_name:lastName,
            phone_number:phoneNum
          })
          await t.commit();
        } catch (err) {
          await t.rollback();
          throw err;
        }

      })
      res.status(201).send({
        'status': 'REGISTER_SUCCESS',
        'msg': 'Successfully register a new account.'
      })
    //   const checkUser = (email,name,phone)=> db.transaction(trx=>trx('users')
    //   .where('email','=',email)
    //   .update({
    //       name: name,
    //       phone:phone
    //   })
    //   )
    //   .then(function(){
    //     res.status(201).send({
    //       'MESSAGE':'USER_UPDATED'
    //     })

    //   if(user!=""){
    //     checkUser(email,name,phone)
    //   }else{
    //     res.status(400).sen({
    //       'MESSAGE':'USER_UPDATE_FAIL'
    //     })
    //   }
    // })
  }
    catch(e){
      console.log(e)
    }
  }
}

module.exports = new UserController();