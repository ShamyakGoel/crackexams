// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Question from "../../models/Question"
import Quiz from "../../models/Quiz"
import connectDb from "../../middleware/mongoose"
async function handler(req, res) {
    if(req.method === "POST"){
        try{
        const {question, qslug, hint, options, correctOption} = req.body
        const {a,b,c,d} = options
        if(!a || !b || !c || !d){
            return res.status(400).json({success:false, error:"Please provide all options"})
        }
        let questiondb = new Question({question, qslug, hint, options, correctOption})
        await questiondb.save()
        let quizdb = await Quiz.findOneAndUpdate({slug:qslug}, {$inc: {questions: 1}})
        return res.status(200).json({success:true, questiondb})
    }
    catch(e){
        return res.status(500).json({success:false, error: "Internal server error",e})
    }
    }
    else{
        return res.status(405).json({success:false, error:"Method not supported!"})
    }
}

export default connectDb(handler)