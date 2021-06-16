const db = require('../db/db');
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

class UserController {
  //  Handle local register
  async createUser(req, res, next) {

  }

  // Handle local login
  async userLogin(req, res, next) {

  }

  // Handle user edit profile
  async editUser(req, res, next) {

  }
}

module.exports = new UserController();