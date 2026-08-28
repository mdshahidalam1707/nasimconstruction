
const mongoose=require("mongoose");
const projectSchema=new mongoose.Schema({
 title:String,
 image:String,
 location:String,
 description:String,
 category:{type:String,enum:["Residential","Commercial"],default:"Residential"}
});
module.exports=mongoose.model("Project",projectSchema);
