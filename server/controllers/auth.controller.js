import User from '../mongodb/models/user.js';
import roles from '../mongodb/models/constants.js'
import bcrypt from 'bcrypt';

const getAllUsers= async (req,res) =>{};
const createUser= async(req,res)=>{
    try{
        const {email,password,name}=req.body;
        console.log(email,password);
        const userExists= await User.findOne({email});

        if (userExists) {
            console.log("User already exists:", email);
            return res.status(409).json({ message: "User already exists" });
        }

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

// Creating user in database if they exists in database then dont otherwise yes
const createGoogleUser= async(req,res)=>{
    try{
        const {name,email,avatar}=req.body;
        console.log("Google Login:",name,email,avatar);

        const userExists= await User.findOne({email});
        console.log("User exists",userExists);

        if (userExists) {
            console.log("User exists:", email);
            userExists.lastLogin = new Date();
            await userExists.save();
            return res.status(200).json(userExists);
        }

     
        const newUser= await User.create({
            name,email,avatar, lastLogin:new Date(),
        })

        if(email==process.env.ADMIN_EMAIL)
            {
             newUser.role=roles.admin;
            }
        
        await newUser.save();
        res.status(201).json(newUser);
        console.log("Registered");
    }
    catch(error){
        res.status(500).json({message:error.message});
        console.log("Error");
    }
  };

const getUserById= async(req,res)=>{};

// USED FOR LOGGING IN
const getloginInfo= async(req,res)=>{
    try{
        const {email,password}=req.body;
        console.log(email,password);
        const userExists= await User.findOne({email});
        console.log("User exists",userExists);
        if(!userExists) return res.status(400).json({message:"User not found"});

        const isPasswordValid = await bcrypt.compare(password, userExists.password);
        if (!isPasswordValid) {
            console.log("Invald email or passowrd");
          return res.status(401).json({ message: 'Invalid email or password.' });
        }

        userExists.lastLogin=new Date();
        await userExists.save();

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
    getloginInfo,
    createGoogleUser
}