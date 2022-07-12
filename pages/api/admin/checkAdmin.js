// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const handler = async (req, res) => {
  if(req.headers['authorization'] === 'process.env.NEXT_PUBLIC_TOKEN_ADMIN'){
  if (req.method == "POST") {
    try {
        const {email,password} = req.body
        if(email === process.env.ADMIN_USERNAME && password==process.env.ADMIN_PASS){
            return res.json({success:true})
        }
        else{
            return res.json({success:false})
        }
    } catch (error) {
      console.log(error);
    }
  } else {
    return res.status(405).json({ error: "This method is not allowed" });
  }
}
else{
    return res.status(403).json({ error: "This method is not allowed" });
}
};

export default handler;
