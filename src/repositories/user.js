const model = require("../models/user");
const signOutModel = require("../models/signOut");

exports.signUp = async(payload) => {
    return model.create(payload)
}

exports.findOne= async(payload) => {
    return model.findOne({email:payload.email});
}

exports.updateById = async(id, payload)=>{
    return model.updateOne({_id: id},payload)
    
};

exports.signOut = async(payload) => {
    return await signOutModel.create(payload); 
}