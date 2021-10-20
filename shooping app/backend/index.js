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
var admin;
var products;
var orders;
MongoClient.connect(connectionString, { useUnifiedTopology:true }).then(client => {
    console.log('Connected to Database');

    db = client.db('practice1');
    register = db.collection('register')
    admin = db.collection('admin');
    products = db.collection('products');
    orders = db.collection('orders');

})

app.post('/adminlogin', (req,res) => {
    console.log(req.body.email);
    admin.findOne({
        email:req.body.email,
        password:req.body.password
    }).then(function(succ){
        if(succ != null){
            res.send('true');
        }else{
            res.send('false');
        }
    })
})



app.post('/insertpro',(req,res) => {
    products.insertOne({
        Name:req.body.proname,
        Brand:req.body.probrand,
        Price:parseInt(req.body.proprice),
        Description:req.body.prodescription
    }).then(function(succ){
        res.send('true');
    }).catch(function(err){
        res.send('error');
    })
})

app.get('/allprodcuts', (req,res) => {
    products.find().toArray().then(function(succ){
        res.send(succ);
    })
})


app.post('/userregister',(req,res) => {
    register.insertOne({
        Name:req.body.name,
        Email:req.body.email,
        Password:req.body.password,
        Contact:req.body.contact
    }).then(function(succ){
        res.send('true');
    }).catch(function(err){
        res.send('error');
    })
})


app.post('/getprodcuts', (req,res) => {
    var idd = new mongo.ObjectId(req.body.id);
    products.findOne({
        _id:idd
    }).then(function(succ){
        res.send(succ);
    })
})

app.post('/userlogin', (req,res) => {
    console.log(req.body.email);
    register.findOne({
        Email:req.body.email,
        Password:req.body.password
    }).then(function(succ){
        if(succ != null){
            res.send('true');
        }else{
            res.send('false');
        }
    })
})

app.post('/placeorder', (req,res) => {
    var pid = new mongo.ObjectId(req.body.pid);
    products.findOne({_id:pid}).then(function(succ){
        register.findOne({Email:req.body.uid}).then(function(scc){

            orders.insertOne({
                uid:scc._id,
                uname:scc.Name,
                uemail:scc.Email,

                del_name:req.body.uname,
                del_contact:req.body.ucontact,
                del_address:req.body.uaddress,

                pro_qty:parseFloat(req.body.qty),

                pro_name:succ.Name,
                pro_brand:succ.Brand,
                pro_price:succ.Price,
                pro_description:succ.Description,
                
            }).then(function(succcc){
                res.send('true');
            })


        })
    })
})

app.post('/getorder', (req,res) => {
    console.log(req.body.email);
    orders.find({uemail:req.body.email}).toArray().then(function(succ){
        res.send(succ);
        console.log(succ);
    })
})

app.post('/getallorder', (req,res) => {
    orders.find().toArray().then(function(succ){
        res.send(succ);
        console.log(succ);
    })
})

app.listen(1000, () => {
    console.log('Server Started');
})