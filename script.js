import express from "express" ; 
import bodyParser from "body-parser";
import mongoose from "mongoose";
import path, { dirname } from "path" ; 
import { fileURLToPath } from "url";
import router from "./routes/article.js";
import Articles from "./models/articlemodel.js";
const __dirname = dirname(fileURLToPath(import.meta.url)) ; 
mongoose.connect("mongodb://127.0.0.1:27017/blogDB") ; 
const app = express() ; 
const port = 3000 ; 
app.use(bodyParser.urlencoded({extended : true})) ; 
app.set('views', path.join(__dirname + '/views'));
app.set('view engine' , 'ejs');
app.use("/static" , express.static(__dirname +"/public")) ;

app.set('view engine' , 'ejs') ; 
app.use("/article" , router) ;
app.get("/" , async (req,res) => { 
    const articles = await Articles.find() ; 
    res.render("index.ejs" , {articles : articles}) ; 
}) ;
app.get("/about" , (req , res) => {
    res.send("Coming Soon...");
}) ; 
app.get("/more" ,async (req , res) => {
    const article = await Articles.find() ; 
    res.render("more.ejs" , {articles : article}) ; 
}) ; 

app.listen(port , () => {
    console.log(`Server is running on port ${port}`) ; 
}) ;          