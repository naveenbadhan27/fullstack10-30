const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors');
const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://naveen:naveen123@cluster0.nmnca.mongodb.net/practice1?retryWrites=true&w=majority';
const client = new MongoClient(connectionString);

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

var db;
var register;
MongoClient.connect(connectionString, { useUnifiedTopology:true }).then(client => {
    console.log('Connected to Database');

    db = client.db('practice1');
    register = db.collection('register')

})


app.post('/insertdata',(req,res) => {
    // console.log(req.body.Name);
    // console.log(req.body.Email);
    // console.log(req.body.Password);
    register.insertOne({
        Name:req.body.Name,
        Email:req.body.Email,
        Password:req.body.Password
    }).then(function(succ){
        res.send('true');
    }).catch(function(err){
        res.send('error');
    })
})

app.get('/fetchdata', (req,res) => {
    register.find().toArray().then(function(succ){
        res.send(succ);
    })
})





app.listen(30, () => {
    console.log('Server Started');
})