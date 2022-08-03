const express = require('express')
const app = express()
const MongoConnect = require('mongodb').MongoClient
const url = "mongodb://localhost:27017/"
var dbconnected
MongoConnect.connect(url, (err, db) => {
    if (err) { console.log("error") }
    else {
        console.log("=====succesfully connected=====")
        var database = db.db("Aise")
        dbconnected = database
        database.createCollection("items1", (err, suc) => {
            // if (err) console.log(err);
                console.log("=====collection created name items1=====");
            
        })
    }
})

app.get("/insertOne", function (req, res) {
    const stu1 = { id: 1, name: "john" };
    dbconnected.collection("items1").insertOne(stu1, (err, suc) => {
        if (err) console.log(err)
        else {
            console.log("insered succesfully")
            res.send("inserted")
        }
    })
})

app.get("/insertMany",function(req,res){
const stu1={id:2,name:"anwaar"}
const stu2={id:3,name:"alam"}
dbconnected.collection("items1").insertMany([stu1,stu2],(err,suc)=>{
if(err) console.log(err)
else{
    res.send("inserted")
    console.log("inserted many succesfully")
}
})
})


app.get("/findOne",function(req,res){
    dbconnected.collection("items1").findOne({},(err,suc)=>{
        if(err) console.log(err)
        else{
            console.log("one items showing")
            res.json(suc)
        }
    })
})

app.get("/findAll",function(req,res){
    dbconnected.collection("items1").find({}).toArray((err,suc)=>{
        if(err) console.log(err)
        else{
            console.log("All items showing")

            res.json(suc)
        }
    })
})
app.get("/updateOne",function(req,res){
    dbconnected.collection("items1").updateOne({id:2},{$set:{id:2,name:"XYZ"}},function(err,suc){
        if(err) console.log(err)
        else{
            console.log("one item updated")
            res.json(suc)
        }
    })
})

app.get("/updateAll",function(req,res){
    dbconnected.collection("items1").updateMany({id:3},{$set:{id:3,name:"XYZ"}},function(err,suc){
        if(err) console.log(err)
        else{
            console.log("all item updated")
            res.json(suc)
        }
    })
})

app.get("/deleteOne",function(req,res){
    dbconnected.collection("items1").deleteOne({id:2},(err,suc)=>{
        if(err)console.log(err)
        else{
            console.log("one document deleted")
            res.json(suc)
        }
    })
})
app.get("/deleteMany",function(req,res){
    dbconnected.collection("items1").deleteMany({id:1},(err,suc)=>{
        if(err)console.log(err)
        else{
            console.log("one document deleted")
            res.json(suc)
        }
    })
})






























app.listen(4000)
module.exports = MongoConnect