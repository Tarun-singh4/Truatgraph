const express=require("express");
const githubRoutes = require("./routes/github");
const app=express();

app.use(express.json());

app.use("/api", githubRoutes);

module.exports=app;



