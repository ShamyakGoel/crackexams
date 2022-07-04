const {Schema, model, models} = require('mongoose')

const QuizSchema = new Schema({
    title: {
        type: String, required: true
    },
    desc : {type:String, default: ''},
    questions: {type:Number, required:true},
    examName: {type:String, default: null},
    category: {type:String, required:true}
}, { timestamps: true })

module.exports = models.Quiz || model('Quiz', QuizSchema)