import nodemailer from "nodemailer"
import ForgotReq from "../../models/ForgotRequest"
import SignupReq from "../../models/SignupReq"
import User from "../../models/User"
import connectDb from "../../middleware/mongoose"
// import Forgot from "../forgot"
async function handler(req, res) {
    if(req.body.forgotPass){
        try{
    let user = await User.findOne({email:req.body.email})
    if(!user){
        return res.status(400).json({success: false, error: "User not exists"})
    }
    let id = Math.floor(Math.floor(Math.random() * Date.now())/100)
    let newreq = new ForgotReq({
        email:req.body.email,
        forgotreqid: id
    })
    await newreq.save()
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    });

    let mailOptions = {
        from: process.env.EMAIL,
        to: req.body.email,
        html: 
        `
        <h1>Crackexams.com Request for Password Reset</h1>
        <img src="https://www.codeswear.com/_next/image?url=%2Flogo.png&w=256&q=75"/>
        <p>
        We have recieved a request for your password Reset.
        Your Password Reset url is: http://10.69.28.241:3000/forgotc?id=${id}
        <br/>
        Thank you,
        Crackexams.com Team
        </p>
        `,
        subject: 'Regarding password reset request Crackexams.com'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    return res.status(200).json({success: true})
}catch(e){
    console.log(e)
    return res.status(500).json({success: false, error: e})
}
    }
    else{
        try{
            let user = await User.findOne({email:req.body.email})
            if(user){
                return res.status(406).json({success:false,error: "User already exists"})
            }
            let id = Math.floor(Math.floor(Math.random() * Date.now())/100)
            let newreq = new SignupReq({
                email:req.body.email,
                reqid: id
            })
            await newreq.save()
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASS
                }
            });
        
            let mailOptions = {
                from: process.env.EMAIL,
                to: req.body.email,
                html: 
                `
                <h1>Crackexams.com Request for Signup</h1>
                <img src="https://www.codeswear.com/_next/image?url=%2Flogo.png&w=256&q=75"/>
                <p>
                We have recieved a request for your Signup.
                Your Signup url is: http://10.69.28.241:3000/signupc?id=${id}
                <br/>
                Thank you,
                Crackexams.com Team
                </p>
                `,
                subject: 'Regarding signup request Crackexams.com'
            };
        
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            return res.status(200).json({success: true})
        }catch(e){
            console.log(e)
            return res.status(500).json({success: false, error: e})
        }
    }
}
export default connectDb(handler)