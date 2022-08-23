// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import QuizDone from "../../models/QuizDone"
import connectDb from "../../middleware/mongoose"
async function handler(req, res) {
    res.status(200).json(await QuizDone.find())
}

export default connectDb(handler)