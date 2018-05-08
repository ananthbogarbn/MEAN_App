const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const User = require('./user')
const schema = new Schema({
    content: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref:'User'}
});
// schema.post('remove', function(message){
//     User.findById(message.user , function(err , user){
//         user.message.pull(message_id);
//         user.save();
//     });
// })
module.exports = mongoose.model('Message' , schema);