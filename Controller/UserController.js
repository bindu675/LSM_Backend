const mongoose = require('mongoose');
const UserData =require('../Model/Model');
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');
var isAuth=require('../Middleware/isAuth')
    

exports.get_user = function(req, res) {
  UserData.find({}, function(err, task) {
  if (err)
    res.send(err);
    res.json(task);
  });
};
exports. usersignup= function(req, res){
  const reg_EmployeeNo=/^[A-Z0-9]{4}/;
  const reg_mob=/^[0-9]{10}$/;
  const reg_pwd=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{4,8}$/;
  if(!reg_pwd.test(req.body.password)){
    console.log(req.body.password)
    res.send('password is invalid');
  }
  // else{
  //   if(req.body.password===req.body.Confirmpassword){

  //   }
  // else{
  //      res.send("password missmatch");
  //    }
  // }
  if(!reg_mob.test(req.body.Mobnum)){
    res.send('Mobile number is invalid');
  }
  if(reg_EmployeeNo.test(req.body.EmployeeNo)){
    UserData.find({EmployeeNo: req.body.EmployeeNo},function(err, data){
      if(data != null && data != ''){
        res.send('User already exists');
      }
      else
      {
        var userData = new UserData(req.body);
        console.log(userData)
        // bcrypt.genSalt(10, function(err, salt){
        //   bcrypt.hash(userData.password, salt, function(err, hash) {
        //     userData.password = hash;
            userData.save(function(err, data){
              if(err)
                res.send(err.message);
              res.json('User Created Succesfully');
            })
          // })
        // })
      }
    });
  }
  else {
    res.send('employeeNo is invalid');
  }
};

exports.read_a_task = function(req, res) 
{
  UserData.findById(req.params.taskId, function(err, task) {
  if (err)
  res.send(err);
  res.json(task);
  });
  };

exports.update_a_task = function(req, res)
{
  UserData.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
  if (err)
  res.send(err);
  res.json(task);
  });
};
exports.delete_a_task = function(req, res) {
  UserData.remove({_id: req.params.taskId}, function(err, task) {
  if (err)
  res.send(err);
  res.json({ message: 'Task successfully deleted' });
  });
};



exports.userSignin = (req,res,next) =>{
  console.log(req.body)
  const EmployeeNo = req.body.EmployeeNo;
  const password = req.body.password;
  let loadedUser;
  UserData.findOne({EmployeeNo: EmployeeNo})
  .then(user =>{
    if(!user){
      const error = new Error('A user with this Employee number could not be found.');
      error.statusCode = 401;
      throw error;
    
    }
    loadedUser = user;
    // return bcrypt.compare(password,user.password);
    console.log(password,user.password)
    return (password===user.password);
  })
  .then(isEqual =>{
    if(!isEqual){
    const error = new Error('wrong password.');
    error.statusCode = 401;
    throw error;
    }
    const token = jwt.sign(
    {
      employeeNo: loadedUser.employeeNo,
      userId:loadedUser._id.toString()
    },'secret')
    return res.status(200).json({token: token, userId: loadedUser._id.toString(), employeeNo: loadedUser.employeeNo})
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }); 
}
