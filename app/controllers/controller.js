const db = require("../model");
// console.log('dbCheck',db)
const User = db.users;
const jwt = require("jsonwebtoken");
const e = require("express");


exports.create = (req, res, next) =>{
    //validate
    if (!req.body.name) {
        res.status(400).send({
          message: "name can not be empty!"
        });
        return;
    }
    const {name, password} = req.body
    User.create({name, password}).then(data =>{
        res.send(data)
    }).catch( error =>{
        res.status(500).send({
            message : error.message || 'Some Error occurred while creating the user.'
        })
    })
}



  exports.login = (req, res, next) =>{
    //validate
    if (!req.body.password) {
        res.status(400).send({
          message: "password can not be empty!"
        });
        return;
    }
    const {name, password} = req.body

    User.findAll({where : {name, password}}).then(data =>{
        console.log("data",data)
        if(data.length === 0){
            res.status(400).send({
                message: "No User Found!"
              });

        }else{
            const payload = {name};
            console.log('payload',payload)
            const jwtToken = jwt.sign(payload, "MY_SECRET_TOKEN");
            res.send({ jwtToken });
        }
    }).catch( error =>{
        res.status(500).send({
            message : error.message || 'Some Error occurred while creating the user.'
        })
    })
}


// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    // console.log("req", req.body,'\n', req.query)
    const name = req.query.user;
    let condition = name ? { name: name } : null;
  
    User.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    console.log("req", req.body,'\n', req.query)  
    User.update(req.body, {
      where: { id: id }
    }).then(num => {
        if (num == 1) {
          res.send({
            message: "User was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User with id=" + id
        });
      });
  };
  
  // Delete a User with the specified id in the request
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    User.destroy({
      where: { id: id }
    }).then(num => {
        if (num == 1) {
          res.send({
            message: "User was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete User with id=${id}. Maybe User was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete User with id=" + id
        });
      });
  };

  // Delete all User from the database.
exports.deleteAll = (req, res) => {
    User.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Users were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all User."
        });
      });
  };