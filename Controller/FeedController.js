const mongoose = require('mongoose');
const Feed =require('../Model/FeedModel');

exports.list_all_tasks = function(req, res) {
 Feed.find({}, function(err, feed) {
if (err)
res.send(err);
res.json(feed);
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
  var feedm = new Feed(req.body);
  feedm.save(function(err, data){
    if (err)
    res.send(err);
    res.json(data);
    
  })
}