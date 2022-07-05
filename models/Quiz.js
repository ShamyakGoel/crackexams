const mongoose = require('mongoose')

const QuizSchema = new mongoose.Schema({
    title: {
        type: String, required: true
    },
    desc : {type:String, default: ''},
    questions: {type:Number, required:true},
    examName: {type:String, default: null},
    category: {type:String, required:true},
    img: {type:String, default: "https://media.istockphoto.com/photos/quiz-time-concept-speech-bubble-with-pencil-on-yellow-background-picture-id1268465415?k=20&m=1268465415&s=612x612&w=0&h=dzRhC8EPw1bZTIDzxc0416FaL8IF71RCPNjBlYUgzQA="},
    slug: {type:String, required: true, unique:true}
}, { timestamps: true })

module.exports = mongoose.models.Quiz || mongoose.model('Quiz', QuizSchema)