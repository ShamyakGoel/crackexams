// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Quiz from "../../models/Quiz"
import connectDb from "../../middleware/mongoose"
async function handler(req, res) {
    console.log(await Quiz.find())
    res.status(200).json(await Quiz.find())
}

export default connectDb(handler)