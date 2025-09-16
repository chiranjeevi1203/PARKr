const userModel = require("../model/user")

const createNewUser = async(req,res)=>{
    try{
        const {username , email , password} = req.body
        const existingUser = await userModel.findOne({email,password})
        if(existingUser){
            return res.status(409).json({msg:"Email or password may be already in use!"})
        }
        const user = await userModel.create({username,email,password})
        console.log(`User : ${user}`)
        return res.status(201).json({msg:"User Created"})
    }
    catch(err){
        return res.status(401).json({msg:"Incorrect username or password"})
    }
}


module.exports = {
    createNewUser,
}