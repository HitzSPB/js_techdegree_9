const express = require('express');
const router = express.Router();
const { Op } = require("sequelize");
const models = require("../models");
const authenticateUser = require("../middleware/auth-user");

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


  router.get('/courses', asyncHandler(async (req, res) => {
    const courses = await models.Course.findAll({
        include: [
            {
                model: models.User,
                as: 'user',
                attributes: {
                    exclude: ["createdAt", "updatedAt", "password"],
                  },
            }
        ],
        attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.status(200).json(courses);  
  }));

  router.post('/courses', authenticateUser, asyncHandler(async(req, res) => {
      try{
        const course = await models.Course.create(req.body);
        res.status(201).location(`/api/courses/${course.id}`).end();
    }
    catch(err)
    {
        res.status(400).json(err.errors.map(err => err.message))
    }
}));

  router.get('/courses/:id', asyncHandler(async (req, res) => {
    const course = await models.Course.findOne(
        {where: { id: req.params.id},        
        include: [
            {
                model: models.User,
                as: 'user',
                attributes: {
                    exclude: ["createdAt", "updatedAt", "password"],
                  },
            }
        ],
        attributes: { exclude: ["createdAt", "updatedAt"] },
    })
    res.status(200).json(course);  
      }
    )
  );
  
  router.put('/courses/:id', authenticateUser, asyncHandler(async(req, res) => {
    const course = await models.Course.findOne({where: { id: req.params.id}})

    if (req.body.title !== "" && req.body.description !== "") {
        if (req.currentUser.id === course.userId) {
                await course.update(req.body);
                res.status(204).end();
        } 
        else {
            res.status(403).json("Only users that created the course can edit it");
        }
    } 
    else {
        res.status(400).json('Not correct content have been added to the body');
    }
}));

router.delete('/courses/:id', authenticateUser, asyncHandler(async(req, res) => {
    const course = await models.Course.findOne({where: { id: req.params.id}})
    
        if (req.currentUser.id === course.userId) {
                await course.destroy();
                res.status(204).end();
        } else {
            res.status(403).json("Only users that created the course can delete it");
        }
}));

  module.exports = router;
