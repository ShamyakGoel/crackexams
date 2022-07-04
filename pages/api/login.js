// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "../../models/User"
import jwt from "jsonwebtoken"
import connectDb from "../../middleware/mongoose"
import CryptoJS  from "crypto-js";
const handler =  async (req, res)=>{
    if(req.method == "POST"){
        try {
        let user = await User.findOne({email:req.body.email})
        if(!user){
            return res.status(406).json({success:false,error: "Please try to login with correct credentials"})
        }
        var bytes  = CryptoJS.AES.decrypt(user.password, process.env.KEY);
        var orginalpassword = bytes.toString(CryptoJS.enc.Utf8);
        if(orginalpassword !== req.body.password){
            return res.status(406).json({success:false,error: "Please try to login with correct credentials"})
        }
        else{
            let authtoken = jwt.sign({id:user._id, email: user.email}, process.env.JWT_KEY, {expiresIn: '1d'})
            res.status(200).json({success:true, user, authtoken})
        }
    } catch (error) {
            console.log(error)
    }
    }
    
    else{
        
        return res.status(405).json({error: "This method is not allowed"})
    }

}

export default connectDb(handler)