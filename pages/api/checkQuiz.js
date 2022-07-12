// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Quiz from "../../models/Quiz"
import QuizDone from "../../models/QuizDone"
import Question from "../../models/Question"
import connectDb from "../../middleware/mongoose"
async function handler(req, res) {
    if(req.method === "POST"){
        try{
            let quiz = await Quiz.findOne({ slug: req.body.qslug })
            let correct = {ques: [], soption: {}}
            let wrong = {ques: [], soption: {}}
            let marks = 0
            let max = Number(quiz.maxmarks)
            let questions = await Question.find({ qslug: req.body.qslug })
            let perquesmarks = max/questions.length
            questions.forEach((ques)=>{
                if(req.body.ans.correct.ques.includes(ques._id.toString())){
                    marks += perquesmarks
                    correct.ques.push(ques)
                    correct.soption[ques._id] = req.body.ans.correct.soption[ques._id]
                }
                else if(req.body.ans.wrong.ques.includes(ques._id.toString())){
                    wrong.ques.push(ques)
                    wrong.soption[ques._id] = req.body.ans.wrong.soption[ques._id]
                }
            })
            let d = new Date()
            let ex = d.getMilliseconds() + 60
            console.log(max,perquesmarks)
            let quizdone = new QuizDone({
                correct,
                wrong,
                marks,
                maxmarks:max,
                perquesmarks,
                expireAt: new Date(ex)
            })
            await quizdone.save()
        return res.status(200).json({success:true, quizdone})
    }
    catch(e){   
        console.log(e)
        return res.status(500).json({success:false, error: "Internal server error",e:e.stack})
    }
    }
    else{
        return res.status(405).json({success:false, error:"Method not supported!"})
    }
}

export default connectDb(handler)