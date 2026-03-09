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
module.exports =mongoose.model("Item",itemschema);