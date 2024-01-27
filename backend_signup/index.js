const express =require('express');
const mongoose =require("mongoose")

const cors = require("cors")

const user =require("./models/userModel")

    mongoose.connect("mongodb+srv://sayooj4545:sayooj@cluster0.chiiywy.mongodb.net/users?retryWrites=true&w=majority")
    .then(()=>console.log("connected to MongoDB"))
    .catch(()=>console.log("connection failed"))



const app=express();

app.use(cors());

app.use(express.json())

app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    // res.send("server working")
    console.log(req.body)
    res.status(200).json({message:"message"})
})

// signup
app.post('/signup',async(req,res)=>{
    console.log(req.body)

    const duplicateUser =await user.findOne({user:req.body.user})

    if(duplicateUser){
        res.status(409).json({message:"user already exist"})
    }
    else{
        await user.create({user:req.body.user,password:req.body.password})

        res.status(201).json({message:"signup"})
    }


})

//login
app.post('/login',async(req,res)=>{
    console.log(req.body)
    const loginUser = await user.findOne({user:req.body.user})

    console.log(req.body.user)

    if(loginUser){
        if(loginUser.password === req.body.password){
            res.status(200).json({message:"Login success"})
        }
        else{
            res.status(401).json({message:"wrong password"})
        }
    }
    else{
        res.status(404).json({message:"user not found"})
    }
    
})


app.listen(5000,()=>console.log("server started on port 5000"))