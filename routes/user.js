const express= require("express");
const { getAllusers, getFilter, creatuser, newuser,addNewItemtouser } = require("../controllers/user.controller");
const usersRouter= express.Router();
usersRouter.get("/",getAllusers);
usersRouter.post("/create",newuser);
usersRouter.post("/newitem/:userid",addNewItemtouser);
module.exports=usersRouter;