const {Schema, model, models} = require('mongoose')

const QuestionSchema = new Schema({
    question: {
        type: String, required: true, minlength: 10,
        maxlength: 1000,
    },
    qslug: { type: String, required: true },
    hint: { type: String, default: null },
    options:{
        a: {type: String,  required: true},
        b: {type: String,  required: true},
        c: {type: String,  required: true},
        d: {type: String,  required: true}
    },
    correctOption: {type:String, minlength:1, maxlength:1}

}, { timestamps: true })

module.exports = models.Question || model('Question', QuestionSchema)