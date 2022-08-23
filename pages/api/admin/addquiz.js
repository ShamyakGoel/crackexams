// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Quiz from "../../../models/Quiz"
import connectDb from "../../../middleware/mongoose"
async function handler(req, res) {
    if(req.headers['authorization'] === 'process.env.NEXT_PUBLIC_TOKEN_ADMIN'){
    if(req.method === "POST"){
        try{
        let quiz = new Quiz(req.body)
        await quiz.save()
        return res.status(200).json({success:true, quiz})
    }
    catch(e){
        console.log(e)
        return res.status(500).json({success:false, error: "Internal server error",e})
    }
    }
    else{
        return res.status(405).json({success:false, error:"Method not supported!"})
    }
}else{
    return res.status(403).json({success:false, error:"Forbidden"})
}
}

export default connectDb(handler)