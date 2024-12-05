import User from '../mongodb/models/user.js';
import roles from '../mongodb/models/constants.js'
import bcrypt from 'bcrypt';

const getAllUsers= async (req,res) =>{};
const createUser= async(req,res)=>{
    try{
        const {email,password,name}=req.body;
        console.log(email,password);
        const userExists= await User.findOne({email});
        console.log("User exists",userExists);
        if(userExists) return res.status(200).json(userExists);

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser= await User.create({
           email,name,password : hashedPassword,
        })

        if(email==process.env.ADMIN_EMAIL)
            {
             newUser.role=roles.admin;
            }
            await newUser.save();

        res.status(200).json(newUser);
        console.log("Registered");
    }
    catch(error){
        res.status(500).json({message:error.message});
        console.log("Error");
    }
};
const getUserById= async(req,res)=>{};
const getloginInfo= async(req,res)=>{
    try{
        const {email,password}=req.body;
        console.log(email,password);
        const userExists= await User.findOne({email});
        console.log("User exists",userExists);
        if(userExists) return res.status(200).json(userExists);

        const isPasswordValid = await bcrypt.compare(password, userExists.password);
        if (!isPasswordValid) {
            console.log("Invald email or passowrd");
          return res.status(401).json({ message: 'Invalid email or password.' });
        }
        
        res.status(200).json({ message: 'Login successful', userExists });
        console.log("Logged in");
    }
    catch(error){
        res.status(500).json({message:error.message});
        console.log("Error");
    }
};

export {
    getAllUsers,
    createUser,
    getUserById,
    getloginInfo
}