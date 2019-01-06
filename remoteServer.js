//this is example of simple file upload in node js using multer and express

var express =   require("express");  
var multer  =   require('multer');  
var app =   express();  

  
//configuring storage engine
var storage =   multer.diskStorage({  
//configuring destination 
 destination: function (req, file, callback) {  
    callback(null, './uploads');  
  },  
//make change in filename if you want
  filename: function (req, file, callback) {  
    callback(null, file.originalname);  
  }  
}); 
//'file' here is key against file in from 
var upload = multer({ storage : storage}).single('file');  




app.post('/upload',function(req,res){  

console.log('req recieved on remote server');

upload(req,res,function(err){
if(err)
console.log(err);
else
console.log(req.body.data);
//you will get data (if you have send) after file uploading 
});



});  
  




app.listen(3220,function(){  
    console.log("Server is running on port 3010");  
});  