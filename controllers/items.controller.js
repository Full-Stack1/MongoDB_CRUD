const { json } = require("express");
const Item = require("../models/itemSchema")
//get all items
const getallitem= async(req,res)=>
{
    try
    {
        const items= await Item.find();  // const items= await Item.find(isDeleted : true );  rrturn all item is deleted
        res.status(200).json({
            message: "All Item was finded",
            data: items
        }) 

    }catch(error)
    {
       res.status(500).json({message: "Server Error"})
    }

}
 //get Filed from schema
const getFileditems= async(req,res)=>
{
    try
    {
        // const items= await Item.find().select("name").skip(num the item page).limit(num of item i want return to front);
        const items= await Item.find().select("name");   

        res.status(200).json({
            message: "All Item was finded",
            data: items
        }) 

    }catch(error)
    {
       res.status(500).json({message: "Server Error"})
    }

}
//get item based on id output is detail data
const getitembyid= async(req,res)=>
{
    try
    {
        const {itemid}= req.params;
        if(!itemid)
         return res.status(400).json({message :"Item Id not Found"})
        const item= await Item.findById(itemid)
        //validat the item not forgot
        res.status(200).json({
            message: "The Item based of id is :",
            data: item
        }) 
    }catch(error)
    {
       res.status(500).json({message: "Server Error"})
    }

}
//filter 
const getfiltersname= async(req,res)=>{
 try
 {
    const{name}=req.query;
    if(!name)
        return res.status(400).json({message:"name not found"})
    
     //create statics method in schema 
    const item=await item.findOne({name})
   //validat if item not found
   res.status(200).json({
    message:"The Fetching is done",
    data: item
   })

 }catch(error)
 {
   res.status(500).json({message: "Server Error"})
 }

}
//Update 
const updateitem=async (req,res)=>
{
 try
 { 
    const{name,image,category}=req.body
 //validat on name
 const updateitems= await Item.findOneAndUpdate(    //find and updat and return update
  {name},  //ابحث عن هاد الاسم
  {image,category} ,//حدث الي على فئة تبعوا 
  {new : true}   // رجعلي تحديث جديد يلي صار مشان هيك كتبت new 
 )
 res.status(200).json({
    message:"The UpDate is done ",
    data: updateitems
   })
   //updateone use to update by not return the new data check the new data by mongo compass

 }catch(error)
 {
   res.status(500).json({message: "Server Error"})
 }

}

const deleteditem= async(req,res)=>
{
    try
    {
        const {name}=req.query;
        if(!name)
            return res.status(400).json({message:"name is requer"})
        await Item.deleteOne({name})
        res.status(200).json({
            message: "The Item was deleted:"
        }) 
    }catch(error)
    {
       res.status(500).json({message: "Server Error"})
    }

}

//soft deleted 
const softdelete = async(req,res)=>{
    try
    {
      const itemid = req.params.itemid;  
       if(!itemid)
        return res.status(400).json({message:"The ID is Required"})
      await Item.updateOne(
        {_id : itemid},
        {isDeleted : true}
      )
      res.status(200).json({message:"done deleted"})

    }catch(err){
        res.status(500).json({
            message:"Server Error"
        })
    }
}



//create new item 
const createNewItem= async (req,res)=>
{ 
 try
{
  const {name,image,category} =req.body;  //how front send req by body

  /*Validation*/ 
  if(!name)
    return res.status(400).json({message: "Pleas Enter Your Name"})
 else if (!category)
    return res.status(400).json({message:"Pleas checking the Filed of category"})
  
const exitems = await Item.findOne({name});
if(exitems)
{
    return res.status(400).json({
     
        message: "The Name is alrady take "
    })
}

 //add new item 2 way
const newitem=  await Item.create({name,image,category})  //add await becuse the add is  take long time to created
res.status(201).json({
    message: " The New Item is Created",
    data: newitem
})
}catch(err)
{
  res.status(500).json({message: "Server Error"})   // to thing with json 1-message 2-data 
} 
}

module.exports=
{
 createNewItem,
   getallitem,
   getFileditems,
   getitembyid,
   getfiltersname,
   updateitem,
   deleteditem,
   softdelete,
}