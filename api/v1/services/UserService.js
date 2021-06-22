const db = require('../db/db');
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

require('dotenv').config()

class UserService {
    async createUser(userData) {
        try {
            //let email = req.body.email; Kalo mau ngeparse body kaya di bawah aja
            const { email, password, firstName, lastName, phoneNum } = userData;
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
                await db('user_roles').transacting(t).insert({
                    user_id: id,
                    type_id: 0
                })
            })
            return "USER_CREATE_SUCCESSFULL"
        } catch (err) {
            throw err;
        }
    }

    async userLogin(email, password) {
        try {
            const user = await db('users').where('email', email)

            // if user exist
            if (user[0] != null) {

                bcryptjs.compare(password, user[0].password, (err, auth) => {
                    if (auth == true) {
                        const token = jwt.sign({
                            data: {
                                userId: user[0].id
                            }
                        }, process.env.JWT_PRIVATE_KEY, { expiresIn: '30d' });
                        return token;
                    } else {
                        return "WRONG_PASSWORD";
                    }
                })
            } else {
                return "USER_NOT_EXISTS";
            }

        }
        catch (e) {
            throw e;
        }
    }

    async editUser(userData) {
        try {
            const { id, email, firstName, lastName, phoneNum } = userData;

            // let user = await db('users').where('email',email)
            await db.transaction(async (t) => {
                const changeUser = await db('user_profiles').transacting(t).where('user_id', '=', id).update({
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
}

module.exports = new UserService();