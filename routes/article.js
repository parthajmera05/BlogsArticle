import express from "express" ; 
import mongoose from "mongoose";
import Articles from "../models/articlemodel.js";
import bodyParser from "body-parser" ; 
const router = express.Router() ;

router.get("/new" , (req , res) =>  {
    res.render("new.ejs") ;
})
router.get("/view/:id" , async (req,res) => {
    const article = await Articles.findById(req.params.id) ; 
    
    if(!article){
        res.redirect("/") ; 
    }
    res.render("view.ejs" , {article : article}) ;
}) ; 
 
router.get("/:id" , async (req,res) => {
    const article = await Articles.findById(req.params.id) ; 
    
    if(!article){
        res.redirect("/") ; 
    }
    try{res.render("view.ejs", {article : article  } )}
    catch(e){
        console.log(e.message) ; 
        res.redirect("/article/new") ;  
    }
    
})
router.get("/delete/:id" , async (req,res) => {
    const article = await Articles.findById(req.params.id) ;
    if(article){
       await Articles.deleteOne(article) ; 
    }
    res.redirect("/") ; 
})   
router.post("/new/submit" , async (req , res) => {
    const article = new Articles({
        title : req.body.title , 
        description : req.body.description , 
        markdown : req.body.markdown
    }) ; 
    
    try{
        const articles  = await article.save() ;
        res.redirect(`/article/${articles.id}`); 
    }
    catch(e){
        console.log(e.message) ; 
        res.redirect("/article/new") ;  
    }


     
})


export default router ; 



 

