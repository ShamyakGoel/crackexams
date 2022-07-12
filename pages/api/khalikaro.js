// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "../../middleware/mongoose"
import QuizDone from "../../models/QuizDone"
async function handler(req, res) {
    let a = await QuizDone.find()
    a.forEach(async (elem)=>{
        await QuizDone.findByIdAndDelete(elem._id)
    })
    res.status(200).json(await QuizDone.find())
}

export default connectDb(handler)