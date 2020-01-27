const mongoose = require('mongoose');
const UserData = require('../Model/Adminmodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var isAuth = require('../Middleware/isAuth')



exports.addAdmin = function (req, res) {
  // const reg_email=/^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/;
  // const reg_mob=/^[0-9]{10}$/;
  const reg_pwd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{4,8}$/;
  if (!reg_pwd.test(req.body.password)) {
    console.log(req.body.password)
    res.send('password is invalid');
  }
  else {
    if (req.body.password === req.body.Confirmpassword) {

    } else {
      res.send("password missmatch");
    }
  }

  UserData.find({ email: req.body.EmployeeNo }, function (err, data) {
    if (data != null && data != '') {
      res.send('User already exists');
    }
    else {
      var userData = new UserData(req.body);
      console.log(userData)
      // bcrypt.genSalt(10, function(err, salt){
      //   bcrypt.hash(userData.password, salt, function(err, hash) {
      //     userData.password = hash;
      userData.save(function (err, data) {
        if (err)
          res.send(err.message);
        res.json('User Created Succesfully');
      })
      // })
      // })
    }
  });

};

exports.AdminSignin = (req, res, next) => {
  const EmployeeNo = req.body.EmployeeNo;
  const password = req.body.password;
  let loadedUser;
  UserData.findOne({ EmployeeNo: EmployeeNo })
    .then(user => {
      if (!user) {
        const error = new Error('User does not exist');
        error.statusCode = 401;
        throw error;

      }
      loadedUser = user;
      console.log(bcrypt.compare(password, user.password))
      return (password === user.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        const error = new Error('wrong password');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          Mobnum: loadedUser.Mobnum,
          userId: loadedUser._id.toString()
        }, 'secret')
      return res.status(200).json({ token: token, userId: loadedUser._id.toString(), Mobnum: loadedUser.Mobnum })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}
