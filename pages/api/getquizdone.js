// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "../../models/User"
import QuizDone from "../../models/QuizDone"
export default async function handler(req, res) {
    let u = await User.findOne({email: req.body.email})
    let uquiz = u.quizdones
    let all = []
    for (let i = 0; i < uquiz.length; i++) {
        const element = uquiz[i];
        let q = await QuizDone.findById(element)
        all.push(q)
    }
    res.status(200).json(all)
  }
  