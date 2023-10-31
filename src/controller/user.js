const service = require("../services/user")

exports.updateUser = async (req , res)=>{
    try{ 
     const userId = req.params.id;
  
     const payload = {
         userId:userId,
         firstName:req.body.firstName,
         lastName:req.body.lastName,
         email:req.body.email,
         password:req.body.password,
         phone:req.body.phone,
         address:req.body.address,
         roles:req.body.roles
 }

 const updatedData = await service.updatedUser(payload)
    res.status(200).json({data : updatedData});
 }catch(err){
   //  console.error("Error during update:", err); 
    res.status(400).json({message : "Cannot update!!!"})
    }    
     
 }