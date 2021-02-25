const express = require('express');
const app = express();
const port = 4000;

var Mongodb = require('mongodb');
var MongoClients = Mongodb.MongoClient;
var url = "mongodb+srv://aris:1234@cluster0.ccqdk.mongodb.net/TodoDB"

app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');




app.get('/',function(req,res){
   MongoClients.connect(url,function(err,db){
       if(err) throw err;
       var dbo = db.db("TodoDB");
       dbo.collection('Todos').find({}).toArray(function(err,result){
           if(err) throw err;
           res.render('index',{"target":result});
       })
   })
 })

app.post('/add',function(req,res){
    var{todo} = req.body;
    MongoClients.connect(url,function(err,db){
        if(err)throw err;
        var dbo = db.db("TodoDB");
        var myObj={"Todo":todo}
 

dbo.collection('Todos').insertOne(myObj,function(err,response){
    if(err) throw err;
    db.close();
    res.redirect('/');
})
})
})



app.listen(port,function(){
    console.log("server is up and running on port " + port)
})