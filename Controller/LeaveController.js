const mongoose = require('mongoose');
const User = require('../Model/LeaveModel');

exports.list_all_tasks = function (req, res) {
  User.find({}, function (err, Leave) {
    if (err)
      res.send(err);
    res.json(Leave);
  });
};

exports.update_a_task = function (req, res) {
  console.log(req.body)
  User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function (err, data) {
    if (err)
      res.send(err);
    res.json(data);
  });
};



exports.applyLeave = (req, res, next) => {
  console.log("hai", req.body);
  var Leavem = new User(req.body);
  Leavem.save(function (err, data) {
    if (err)
      res.send(err);
    res.json(data);
  })
}
    

