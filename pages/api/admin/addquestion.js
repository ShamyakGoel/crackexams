// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Question from "../../../models/Question"
import Quiz from "../../../models/Quiz"
import connectDb from "../../../middleware/mongoose"

async function handler(req, res) {
    if (req.method == "OPTIONS") {
        res.setHeader("Allow", "POST");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        return res.status(200).json({});
      }
    if(req.method === "POST"){
        try{
        const {question, qslug, hint, options, correctOption} = req.body
        const {a,b,c,d} = options
        if(!a || !b || !c || !d){
            return res.status(400).json({success:false, error:"Please provide all options"})
        }
        else if(question.length < 10 || question.length > 1000){
            return res.status(400).json({success:false, error:"Question should be more than 10 and less than 1000 characters"})
        }
        let questiondb = new Question({question, qslug, hint, options, correctOption})
        await questiondb.save()
        await Quiz.findOneAndUpdate({slug:qslug}, {$inc: {questions: 1}})
        return res.status(200).json({success:true, questiondb})
    }
    catch(e){
        console.log(e)
        return res.status(500).json({success:false, error: "Internal server error",e})
    }
    }
    else{
        return res.status(405).json({success:false, error:"Method not supported!"})
    }
    
}


export default connectDb(handler)