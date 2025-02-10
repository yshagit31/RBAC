import User from '../mongodb/models/user.js';
import roles from '../mongodb/models/constants.js'
import bcrypt from 'bcrypt';

const getAllUsers= async (req,res) =>{
    try {
        const users = await User.find();
  
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};
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
const createGoogleUser= async(req,res)=>{
  try{
      const {name,email,avatar}=req.body;
      console.log(name,email,avatar);
      const userExists= await User.findOne({email});
      console.log("User exists",userExists);
      if(userExists) return res.status(200).json(userExists);
      
      const newUser= await User.create({
          name,email,avatar,
          
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

const getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.id); 
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const updateUserRole = async (req, res) => {
    const userId = req.params.id;
    const { name, role } = req.body; 
  
    try {
      const updatedUser = await User.findById(userId);
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      if (name) {
        updatedUser.name = name; 
      }
      if (role) {
        updatedUser.role = role;  
      }
  
      await updatedUser.save();
  
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Error updating user role:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  const deleteUser=async(req,res)=>{
    const userId=req.params.id;
    try{
      const Deleteduser=await User.findByIdAndDelete(userId);
      if (!Deleteduser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({message:"User deleted successfully"});
    }catch(error){
      console.error("Error deleting user",error);
      res.status(500).json({message:"Server Error while deleting user"});
    }
  }
  

export {
    getAllUsers,
    createUser,
    getUserById,
    updateUserRole,
    deleteUser,
    createGoogleUser
}