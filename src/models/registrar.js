const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const empSchema = new mongoose.Schema({

 name: {
  type: String,
  required: true
  
 },
 email: {
  type: String,
  required: true
 },
 password: {
  type: String,
  required: true,
  unique: true
 },
 tokens: [{
  token:{
   type: String,
   required: true
  }
 }]
})

//generate token
empSchema.methods.generateAuthToken = async function(){
 try{
  const token = await jwt.sign({_id:this._id.toString()}, process.env.SECRETKEY);
  this.tokens = this.tokens.concat({token:token});
  await this.save();
  return token;
 }catch(e){
  res.send(e);
  console.log(e);
 }
}

//convert pssword into hash
empSchema.pre("save", async function(next) {
 if(this.isModified("password")){
  console.log(`current password is ${this.password}`);
  this.password = await bcryptjs.hash(this.password, 10);
  console.log(`current password is ${this.password}`);
 }
})

//collection
const Register = new mongoose.model("Register",empSchema);

module.exports = Register;