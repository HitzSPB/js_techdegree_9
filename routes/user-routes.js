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


  router.get('/api/users', asyncHandler(async (req, res) => {
    const user = await User.findOne({ where: {}});
    res.render('index', { user, title: 'User'})}));