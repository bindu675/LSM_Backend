const mongoose = require('mongoose');
const Leave =require('../Model/LeaveModel');

exports.list_all_tasks = function(req, res) {
Leave.find({}, function(err, Leave) {
if (err)
res.send(err);
res.json(Leave);
});
};


exports.Leave = (req,res,next) =>{
  console.log("hai",req.body);
  var Leavem = new Leave(req.body);
  Leavem.save(function(err, data){
    if (err)
    res.send(err);
    res.json(data);
    
  })
}
  