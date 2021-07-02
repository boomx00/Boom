const db = require('../db/db');
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

require('dotenv').config()

class UserService {
    async createUser(userData) {
        try {
            // //let email = req.body.email; Kalo mau ngeparse body kaya di bawah aja
            const { email, password, firstName, lastName, phoneNum, type_id, restaurant_id,role,authorized} = userData;
            const hash = await bcryptjs.hash(password, 10);
            await db.transaction(async (t) => {
                const id = await db('users').transacting(t).insert({
                    email: email,
                    password: hash
                });
                await db('user_profiles').transacting(t).insert({
                    user_id: id,
                    first_name: firstName,
                    last_name: lastName,
                    phone_number: phoneNum
                });
                
                if(authorized){
                    await db('restaurant_employee').transacting(t).insert({
                        restaurant_id:restaurant_id,
                        user_id:id,
                        role: role
                    })
                    await db('user_roles').transacting(t).insert({
                        user_id: id,
                        type_id: 2
                    })
                }else{
                    await db('user_roles').transacting(t).insert({
                        user_id: id,
                        type_id: 1
                    })
                }
            })
            return "USER_CREATE_SUCCESSFULL"
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async userLogin(email, password) {
        try {
            const user = await db('users').where('email', email)

            // if user exist
            if (user[0] != null) {
                const isSame = await bcryptjs.compare(password, user[0].password);
                if(isSame){
                    const token = jwt.sign({
                                    data: {
                                        userId: user[0].id
                                    }
                                }, process.env.JWT_PRIVATE_KEY, { expiresIn: '30d' });
                                return token;
                            }
                
                // await bcryptjs.compare(password, user[0].password, (err, auth) => {
                //     if (auth == true) {
                //         const token = jwt.sign({
                //             data: {
                //                 userId: user[0].id
                //             }
                //         }, process.env.JWT_PRIVATE_KEY, { expiresIn: '30d' });
                //         return token;
                //     } else {
                //         return "WRONG_PASSWORD";
                //     }
                // })

            } else {
                return "USER_NOT_EXISTS";
            }

        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }

    async editUser(userData) {
        try {
            const { user_id, firstName, lastName, phoneNum } = userData;

            // // let user = await db('users').where('email',email)
            await db.transaction(async (t) => {
                const changeUser = await db('user_profiles').transacting(t).where('user_id', '=', user_id).update({
                    first_name: firstName,
                    last_name: lastName,
                    phone_number: phoneNum
                })
            })
            return "EDIT_SUCCESS";
        } catch (err) {
            throw err;
        }
    }

    async getUser(userData){
        try{
            const {user_id} = userData
            let user = ""
            await db.transaction(async(t)=>{
                user = await db('user_profiles').transacting(t).where('user_id','=',user_id)
            })
            return user
        }catch(err){
            throw (err)
        }
    }
}

module.exports = new UserService();