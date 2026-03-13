const usermodel=require ("../models/UserSchema");
const Item= require("../models/itemSchema");
//usermodel.findone({name})   //هي لما ابحث عن حقل معين بستخدمها 
const getAllusers= (req,res)=>
{   //populate("items") to view the detail the item user
   usermodel.find({}).populate("items").then((result)=>  //مشان لا تصير مشاكل حطيت داخل ال find {}
{
    res.status(200)
    res.json(result)
}).catch((err)=>{
    res.send(err)
})
}
//creat user
 const newuser=(req,res)=>
{
    const{Email,PassWord,Name,Age}= req.body;
    if(!Email )
    {
        return res.status(404).json({
            message:"not foud the email "
        })
    }
    //first way to create new user
    const user= new usermodel
    ({
         Email,
       PassWord,
       Name,
       Age,
    })
    user.save().then(()=>
    res.status(201).json({
       message:"New User Was add" 
    })).catch((err)=>{
        res.status(500).json({message:"Failed Another User has same Email"})
    })
}
/*--------------------item the user ------------------------------------------------------------- */
//add item to the user
const addNewItemtouser= async (req,res)=>
{ 
    try
    {   
       const{userid}=req.params;
      // console.log("user id is ",userid);
       const {name,image,category} =req.body;
       //Validation  
       if(!userid)
       return res.status(400).json({message:"user id is required"})
        if(!name)
    return res.status(400).json({message: "Pleas Enter Your Name"})
      else if (!category)
    return res.status(400).json({message:"Pleas checking the Filed of category"})
     const newitem= await Item.create
     ({
         name,
         image,
         category,
     })

     //first way to add item to user
     const user= await usermodel.findById(userid)
    

     if(!user){
        return res.status(404).json({message :"not found user"})
     }
     user.items.push(newitem._id);
     await user.save();
     res.status(201).json
     ({
       message:"New item Was add",
    data: user 
})
    }catch(err)
    {
      res.status(500).json({message:"Server Error"})

    }
    
}









//to call this fun any file
module.exports= 
{
   getAllusers,
   newuser,
   addNewItemtouser,
}