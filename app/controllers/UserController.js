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
      //var salt = bcryptjs.genSaltSync(10);
      //let password = bcryptjs.hashSync(req.body.password, salt); Pake async function aja

      //let checkUser = await db('users').where('email', email) "Kalo email udah unique bakalan catch "ER_DUP_ENTRY"
      //  Transaction ada yang lebih simple
      /*
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
      */
      await db.transaction(async (t) => {
        try {
          const id = await t('users').insert({
            email: email,
            password: password
          });
          await t('user_profiles').insert({
            user_id: id,
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNum
          });
          t.commit();
        } catch (err) {
          t.rollback();
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

    }
  }

  // Handle user edit profile
  async editUser(req, res, next) {
    try {
      let email = req.body.email
      let user = await db('users').where('email', email)
      const checkUser = (email) => db.transaction(trx => trx('users')
        .where('email', '=', email)
        .update({

        })
      )
        .then(function () {
          req.status(201).send({
            'MESSAGE': 'USER_UPDATED'
          })
        })

      if (user != "") {
        checkUser(email)
      } else {

      }
    }
    catch (e) {

    }
  }
}

module.exports = new UserController();