
const router=require("express").Router();
const Project=require("../models/Project");

router.get("/",async(req,res)=>res.json(await Project.find()));
router.post("/",async(req,res)=>res.json(await Project.create(req.body)));

module.exports=router;
