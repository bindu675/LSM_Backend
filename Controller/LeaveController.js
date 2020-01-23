const mongoose = require('mongoose');
const nodemailer =require ('nodemailer');
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
   var mail = new User(req.body);
   //mail.save(function(err, data){
//   // if(err)
//   // res.send(err.message);
//   // res.json(data);
  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,

    auth: {
      user: 'vbalashankarostb2@gmail.com',
      pass: 'vasavi@1997'
    }
  });
  mailOptions = {
    from: 'vbalashankarostb2@gmail.com',
    to: req.body.Email,
    subject: 'Leave Requition',
    text: `I am requesting you to grant me leave`
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error.message);
    } else {
      console.log('Email sent: ' + info.response);
      console.log("hai", req.body);
      var Leavem = new User(req.body);
      Leavem.save(function (err, data) {
        if (err)
          res.send(err);
        res.json(data);
      })
    };
  }
  )
}


//   console.log("hai", req.body);
//   var Leavem = new User(req.body);
//   Leavem.save(function (err, data) {
//     if (err)
//       res.send(err);
//     res.json(data);
//   })
// }




