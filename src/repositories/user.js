const model = require("../models/user");

exports.signUp = async(payload) => {
    return model.create(payload)
}

exports.findOne= async(payload) => {
    return model.findOne({email:payload.email});
}

exports.updateById = async(id, payload)=>{
    return model.updateOne({_id: id},payload)
    
};