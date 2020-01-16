// const mongoose = require('mongoose');
// const UserData =require('../Model/DesktopModel');
// const bcrypt =require('bcrypt');
// const jwt = require('jsonwebtoken');
// var isAuth=require('../Middleware/isAuth')
const mongoose = require('mongoose');
const User =require('../Model/DesktopModel');
    
// const mongoose = require('mongoose');
// const User =require('../Model/LeaveModel');

exports.list_all_tasks = function(req, res) {
 User.find({}, function(err, desktop) {
if (err)
res.send(err);
res.json(desktop);
});
};

exports.update_a_task = function(req, res) {
  console.log(req.body)
  User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, data) {
    if (err)
      res.send(err);
    res.json(data);
  });
};



exports.post = (req,res,next) =>{
  console.log("hai",req.body);
  var desktopm = new User(req.body);
  desktopm.save(function(err, data){
    if (err)
    res.send(err);
    res.json(data);
    
  })
}

exports.delete_a_task = function(req, res) {
  User.remove({_id: req.params.id}, function(err, task) {
  if (err)
  res.send(err);
  res.json({ message: 'Task successfully deleted' });
  });
};


















// exports.get_a_data = function(req, res) {
//   UserData.find({}, function(err, task1) {
//   if (err)
//     res.send(err);
//     res.json(task1);
//   });
// };

// exports.update_a_task = function(req, res)
// {
//   console.log(req.body)
//   var User = new UserData(req.body);
//   User.save({},function(err,data) {
//     console.log("added")
//   if (err)
//   res.send(err);
//   res.json(data);
//   });
// };

// exports.delete_a_task = function(req, res) {
//   UserData.remove({_id: req.params.id}, function(err, task) {
//   if (err)
//   res.send(err);
//   res.json({ message: 'Task successfully deleted' });
//   });
// };

// exports.read_a_task = function(req, res) 
// {
//   UserData.findById(req.params.taskId, function(err, task) {
//   if (err)
//   res.send(err);
//   res.json(task);
//   });
//   };

  // exports.update_a_task = function(req, res) {
  //   console.log(req.body)
  //   User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, data) {
  //     if (err)
  //       res.send(err);
  //     res.json(data);
  //   });
  // };