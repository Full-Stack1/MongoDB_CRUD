const { default: mongoose } = require("mongoose");

const userschema = new mongoose.Schema
({
   Email: {type : String,required : true ,unique:true},
   PassWord:{type : String },
   Name: {type : String},
   Age:{type : Number },
   //array becuse i want all item not just one item
   items:[{type : mongoose.Schema.Types.ObjectId,ref: "Item"}]  //relation between item and user like this, ref: "Item" انو هي id  تتعلق بسكيما تبعت item

})
module.exports=mongoose.model("User",userschema);
//ref: "Item"   "name model from schema" like up the name schemauser is user between carly braket