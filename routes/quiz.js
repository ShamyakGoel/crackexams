const express = require("express");
const router = express.Router();
const Quiz = require("../models/Quiz");
const Question = require("../models/Question");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser")
const JWT_SECRET = "2024da5205424fcd96b9df6e13a6221fxj7hs7JSHAKI8kJDSUD9k";

// Route 1: Create a quiz
router.post('/createquiz', fetchUser, [
    body('title').isLength({min:5}),
], async (req,res)=>{
    res.set('Access-Control-Allow-Headers', 'Content-type')
    try{
    const errors = validationResult(req);
    const error = [];
    const err = errors.array();
    if (!errors.isEmpty()) {
        for (i in errors.array()) {
            if (err[i].param == "title") {
              error.push("Title should be more or equal than 5 characters long.");
            }
        }
        return res.status(406).json({error});
    }
    let quiz = await Quiz.findOne({title:req.body.title})
    if(quiz){
        return res.status(400).json({status: 400, error:"Quiz already exists"})
    }
    quiz = await Quiz.create({
        title:req.body.title,
        userId:req.user.id
    })
    res.status(200).json({status:200, quiz})
}catch(e){
    return res.status(500).json({status:500, error: "Internal Server Error"})
}
})

// Route 2: Delete the quiz
router.delete('/deletequiz', fetchUser, async (req,res)=>{
    res.set('Access-Control-Allow-Headers', 'Content-type')
    try {
        let quizId = req.body.quizid
        if(!quizId){
            return res.status(400).json({error: "Please provide us with the quiz id"})
        }
        let quiz = await Quiz.findById(quizId);
        if(!quiz){
            return res.status(404).json({error: "Quiz not found"})
        }
        if(quiz.userId != req.user.id){
            return res.status(401).json({error: "Not Allowed"})
        }
        quiz = await Quiz.findByIdAndDelete(quizId)
        res.json({success:true, quiz})
    } catch (error) {
        return res.status(500).json({status:500, error: "Internal Server Error"})
    }
})

// Route 3: Get all quizess by a user
router.get('/getquizu', fetchUser, async (req,res)=>{
    res.set('Access-Control-Allow-Headers', 'Content-type')
    try{
        let allquiz = await Quiz.find({userId:req.user.id})
        res.status(200).json(allquiz)
    }catch(e){
        return res.status(500).json({status:500, error: "Internal Server Error"})
    }
})
// Route 4: Get all quizess
router.get('/getquiz', async (req,res)=>{
    res.set('Access-Control-Allow-Headers', 'Content-type')
    try{
        let allquiz = await Quiz.find()
        res.status(200).json(allquiz)
    }catch(e){
        return res.status(500).json({status:500, error: "Internal Server Error"})
    }
})

// Route 5: Get all questions associated by a quiz
router.get('/getquestions', async(req,res)=>{
    res.set('Access-Control-Allow-Headers', 'Content-type')
    try{
        let quizid = req.header('quizid')
        if(!quizid){
            return res.status(406).json({status:406, error: "Provide quiz id"})
        }
        let questions = await Question.find({quizid})
        res.status(200).json({success:true, questions})
    }catch(e){
        return res.status(500).json({status:500, error: "Internal Server Error"})
    }
})

// -----------------------------------------------------QUESTIONS-----------------------------------------------------
// Route 1: Create a question
router.post('/createquestion', fetchUser, [
    body('question').isLength({min:4}),
    body('options').isObject(),
    body('quizid').exists(),
    body('correctOption').exists()
], async (req,res)=>{
    res.set('Access-Control-Allow-Headers', 'Content-type')
    try{
        const errors = validationResult(req);
        const error = [];
        const err = errors.array();
        if (!errors.isEmpty()) {
            for (i in errors.array()) {
                if (err[i].param == "question") {
                  error.push("Question should be more or equal than 4 characters long.");
                }
                else if (err[i].param == "options") {
                  error.push("Options is invalid.");
                }
                else if (err[i].param == "quizid") {
                  error.push("Please provide quizid.");
                }
                else if (err[i].param == "correctOption") {
                  error.push("Please provide correct option.");
                }
            }
            return res.status(406).json({error});
        }
        const {question, options, quizid, correctOption} = req.body
        let quiz = await Quiz.findById(quizid)
        if(!quiz){
            return res.status(404).json({error: "Quiz not found"})
        }
        if(quiz.userId != req.user.id){
            console.log()
            return res.status(401).json({error: "Not Allowed"})
        }
        
        let ques = Question.findOne({question})
        if(ques){
            return res.status(406).json({error:"Question already exists."})
        }
        ques = await Question.create({
            question,
            userId:req.user.id,
            quizid,
            options:{
                a:options.a,
                b:options.b,
                c:options.c,
                d:options.d
            },
            correctOption
        })
        res.status(200).json({success:true, ques})
    }catch(e){
        return res.status(500).json({status:500, error: "Internal Server Error"})
    }
})
module.exports = router