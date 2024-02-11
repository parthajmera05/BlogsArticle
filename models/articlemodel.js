import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
    title : {
        type : String , 
        required : true
    },
    description : {
        type : String , 
        
    },
    markdown : {
        type : String , 
        required : true
    }, 
    createdAt : {
        type:Date , 
        default : Date.now()
    }

}) ; 


const Articles = mongoose.model('Articles' , articleSchema) ; 

export default Articles ; 