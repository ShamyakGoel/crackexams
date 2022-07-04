// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "../../models/User"
import connectDb from "../../middleware/mongoose"
import CryptoJS  from "crypto-js";
const handler =  async (req, res)=>{
    if(req.method == "POST"){
        let user = await User.findOne({email:req.body.email})
        if(user){
            return res.status(406).json({success:false,error: "User already exists"})
        }
        const {email} = req.body
        user = new User({email,password:CryptoJS.AES.encrypt(req.body.rpass, process.env.KEY).toString()})
        await user.save()
        res.status(200).json({success:true, user})
    }
    
    else{
        return res.status(405).json({error: "This method is not allowed"})
    }

}

export default connectDb(handler)