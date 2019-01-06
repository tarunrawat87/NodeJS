var express =   require("express");  
var app =   express();  
var busboy=require('busboy');
var FormData=require('form-data');  
var Readable = require('stream').Readable;


//This is basic example to redirect file to remote serve without saving it
//Basic Idea is to use Busboy to save file contents in string and make a readable string from it
//use form-data to create form and send it using form-data 
//use file 'data' and 'end'  to create string
//Point to remember is that along with stream,you also need to send size of file and name too
//use options object to send relevant data


app.post('/upload',function(req,res){  

var Busboy = new busboy({ headers: req.headers });
let formData=new FormData();
 Busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
let data='';
let length=0;

//start appending data
file.on('data',function(res){
data+=res;
length+=res.length;
});

//on end of stream ,make a file
file.on('end',function(){
var stream=new Readable();
stream._read = () => {}; //this line is necessary,dont know why ..? :/
let option={
filename: 'myfile.txt', // 
 knownLength:length
}
//push to stream
stream.push(data);
//console.log('file length',length,data.length);
//finally append it
formData.append('file',file,option);
//this below function call is necessary for calling of finish event in busboy
file.resume();
})

  });

//to get field in formdata
  Busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
console.log(fieldname,val);
formData.append(fieldname, val);
    });

    Busboy.on('finish', function() {
console.log('finished');
//send data to another server
formData.submit('http://localhost:3220/upload', function(err, res) {
if(err)
console.log(err);
else
  res.resume();
});
	
        res.sendStatus(200);
    });

    req.pipe(Busboy);});



app.listen(3010,function(){  
    console.log("Server is running on port 3010");  
});  