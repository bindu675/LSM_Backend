const mongoose = require('mongoose');
const UserData = require('../Model/Model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var isAuth = require('../Middleware/isAuth')
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
var nodemailer = require('nodemailer');

exports.get_user = function (req, res) {
  UserData.find({}, function (err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};
exports.usersignup = function (req, res) {
  const reg_EmployeeNo = /^[A-Z0-9]{4}/;
  const reg_mob = /^[0-9]{10}$/;
  const reg_pwd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{4,8}$/;
  if (!reg_pwd.test(req.body.password)) {
    console.log(req.body.password)
    res.send('password is invalid');
  }

  if (!reg_mob.test(req.body.Mobnum)) {
    res.send('Mobile number is invalid');
  }
  if (reg_EmployeeNo.test(req.body.EmployeeNo)) {
    UserData.find({ EmployeeNo: req.body.EmployeeNo }, function (err, data) {
      if (data != null && data != '') {
        res.send('User already exists');
      }
      else {
        var userData = new UserData(req.body);
        console.log(userData)
        const pword = cryptr.encrypt(req.body.password);
        userData.password = pword;
        userData.save(function (err, data) {
          if (err)
            res.send(err.message);
          res.json('User Created Succesfully');
        })
      }
    });
  }
  else {
    res.send('employeeNo is invalid');
  }
};


exports.read_a_task = function (req, res) {
  UserData.findById(req.params.taskId, function (err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.update_a_task = function (req, res) {
  UserData.findOneAndUpdate({ _id: req.params.taskId }, req.body, { new: true }, function (err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};
exports.delete_a_task = function (req, res) {
  UserData.remove({ _id: req.params.taskId }, function (err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

exports.changepassword = (req, res) => {
  console.log(req.body)
  const pword = cryptr.encrypt(req.body.password);
  req.body.password = pword;
  UserData.findOneAndUpdate({ EmployeeNo: req.body.EmployeeNo }, req.body, { new: true }, function (err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.userSignin = (req, res) => {
  console.log(req.body)
  const EmployeeNo = req.body.EmployeeNo;
  const password = req.body.password;
  let loadedUser;
  UserData.findOne({ EmployeeNo: EmployeeNo })

    .then(user => {
      if (!user) {
        const error = new Error('A user with this Employee number could not be found.');
        error.statusCode = 401;
        throw error;

      }
      loadedUser = user;
      console.log(loadedUser)
      const pword = cryptr.decrypt(user.password);
      return (password === pword);

    })
    .then(isEqual => {
      if (!isEqual) {
        const error = new Error('wrong password.');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          employeeNo: loadedUser.employeeNo,
          userId: loadedUser._id.toString()
        }, 'secret')
      return res.status(200).json({ token: token, Firstname: loadedUser.Firstname })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

    });
}
