require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const jwt = require("jsonwebtoken");
require("./db/conn");
const Register = require("./models/registrar");
const bcryptjs = require("bcryptjs");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);


app.get("/index", (req,res) => {
 res.render("index");
})

app.get("/login", (req,res) => {
 res.render('login');
})
//create
app.post("/index", async (req,res) => {
 try{
  const registerEmploye = new Register({
   name : req.body.name,
   email: req.body.email,
   password: req.body.password
  })
const token = await registerEmploye.generateAuthToken();

  const Registered = await registerEmploye.save();
  res.status(201).render("index");
 }catch(e){
  res.status(400).send(e);
 }
})

app.post("/login", async (req,res) => {
 try{
  const name = req.body.name;
  const password = req.body.password;
  const useremail = await Register.findOne({name:name});
  const isMatch = await bcryptjs.compare(password, useremail.password);
  const token = await useremail.generateAuthToken();
  if(isMatch){
   res.status(201).render("index");
  }else{
   res.send("invalid details");
  }

 }catch(e){
  res.status(400).send(e);
 }
}) 

/* const createToken = async() => {
 const token = await jwt.sign({_id : "5fd5af8d8728070ad88ce992"}, "iamnodejsdeveloperandalsoknowsomefrontendstuff", {
  expiresIn: "2days"
 });
 const userverify = await jwt.verify(token, "iamnodejsdeveloperandalsoknowsomefrontendstuff");
 console.log(userverify);
}
createToken(); */

app.listen(port, () => {
 console.log("conection working");
})