// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import QuizDone from "../../models/QuizDone"
export default async function handler(req, res) {
    let q = await QuizDone.findByIdAndDelete(req.body.id)
    res.status(200).json({ success: true })
}
  