const {Schema, model, models} = require('mongoose')

const UserSchema = new Schema({
    name: {type:String, required:true}
}, { timestamps: true })

module.exports = models.User || model('User', UserSchema)