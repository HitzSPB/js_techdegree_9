const express = require('express');
const router = express.Router();
const { Op } = require("sequelize");
const models = require("../models");

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


  router.get('/users', asyncHandler(async (req, res) => {
    const user = await models.User.findOne({where: { id: 1},
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      }});

    res.status(200).json(user);  
  }));

  router.post("/users", asyncHandler(async (req, res) => {
      try {
        await models.User.create(req.body);
        res.status(201).location("/").end();
      } catch (err) {
        console.log(err);
        }
      }
    )
  );

  module.exports = router;