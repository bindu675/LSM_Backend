const mongoose = require('mongoose');
var nodemailer=require('nodemailer')
const User =require('../Model/LeaveModel');

exports.list_all_tasks = function(req, res) {
 User.find({}, function(err, Leave) {
if (err)
res.send(err);
res.json(Leave);
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
  var Leavem = new User(req.body);
  Leavem.save(function(err, data){
    if (err)
    res.send(err);
    res.json(data);
    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      
      auth: {
      user: 'bmahadevostb2@gmail.com',
      pass: 'bindu@1996'
      }
      });
      mailOptions = {
      from: 'bmahadevostb2@gmail.com',
      to: req.body.email,
      subject: 'requesting to complete project',
      text: `your password is `+password+ `http://localhost:3000/forgetpasswordpage `
      };
      transporter.sendMail(mailOptions, (error, info)=>{
      if (error) {
      return console.log(error.message);
      } else {
      console.log('Email sent: ' + info.response);
      }
      });
      const token = jwt.sign(
      {
      email: loadedUser.email,
      userId:loadedUser._id.toString()
      },'secret')
      return res.status(200).json({token: token, userId: loadedUser._id.toString(), email: loadedUser.email})
      })
      .catch(err => {
      if (!err.statusCode) {
      err.statusCode = 500;
      }
      next(err);
      }); 
      }
 