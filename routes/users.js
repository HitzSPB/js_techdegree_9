const express = require('express');
const router = express.Router();
const models = require("../models");
const authenticateUser = require("../middleware/auth-user");
const bcrypt = require('bcryptjs');

function asyncHandler(cb){
  return async(req, res, next) => {
    try 
    {
      await cb(req, res, next)
    } 
    catch(err)
    {
      res.status(500).send(err);
    }
  }
}


  router.get('/users', authenticateUser, asyncHandler(async (req, res) => {
    const user = await models.User.findOne({where: { id: req.currentUser.id},
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      }});

    res.status(200).json(user);  
  }));

  router.post("/users", asyncHandler(async (req, res) => {
    try{
      // Inspiration from https://www.npmjs.com/package/bcryptjs
      req.body.password = bcrypt.hashSync(req.body.password);
        await models.User.create(req.body);
        res.status(201).location("/").end();
      }

    catch(err)
    {
      console.log(err);
      res.status(400).json(err.errors.map(err => err.message));
    }
  }
  ));

  module.exports = router;