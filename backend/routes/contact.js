
const router=require("express").Router();
const Contact=require("../models/Contact");

router.post("/",async(req,res)=>res.json(await Contact.create(req.body)));

module.exports=router;
