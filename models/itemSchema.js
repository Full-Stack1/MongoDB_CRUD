const { default: mongoose } = require("mongoose");
const itemschema= new mongoose.Schema
({ 
     name : {type: String , require : true , unique : true},
     image :{type : String},
     category : {type : String , required: true , enum:["elect","clothing","healthy"]},
     isDeleted:{type: Boolean,default:false}   //first way to soft delete
},
{
    timestamps : true    //to add time the add the item
}
)
//middelware
/*
itemschema.pre("save",function (next){
  
console.log("first test middelware")
next();

})
itemschema.statics.findByName
module.exports =mongoose.model("Item",itemschema); */                                                                      