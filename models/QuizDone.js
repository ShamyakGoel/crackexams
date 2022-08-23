const mongoose = require('mongoose')

const QuizSchema = new mongoose.Schema({
    correct: {
        type: Object, required: true
    },
    wrong : {type:Object, required:true},
    marks: {type:Number, required:true},
    maxmarks: {type:Number, required: true},
    perquesmarks: {type:Number, required: true},
    expireAt : {type:Number, required: true},
    qname : {type:String, required: true},
    timeTaken: {type: String, default: null}
}, { timestamps: true })

module.exports = mongoose.models.QuizDone || mongoose.model('QuizDone', QuizSchema)