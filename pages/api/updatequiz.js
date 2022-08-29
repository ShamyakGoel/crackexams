// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Quiz from "../../models/Quiz"
import connectDb from "../../middleware/mongoose"
async function handler(req, res) {
    if(req.method === "POST"){
        try{
        let quiz = await Quiz.findByIdAndUpdate(req.body._id , req.body, {new:true})
        return res.status(200).json({success:true, quiz})
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