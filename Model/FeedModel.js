var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FeedSchema = new Schema({

    feedtext: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Feed', FeedSchema);