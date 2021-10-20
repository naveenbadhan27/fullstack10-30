const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://naveen:naveen@123@cluster0.nmnca.mongodb.net/practice1?retryWrites=true&w=majority';
const client = new MongoClient(connectionString);

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs');


var db;
var register;
MongoClient.connect(connectionString, { useUnifiedTopology:true }).then(client => {
    console.log('Connected to Database');

    db = client.db('practice1');
    register = db.collection('register')

})


// client.db('name').collection('register').insertOne({
// })

// function ab(){
// }
// const ab = (a,b) => {
// }

app.get('/', (req,res) => {
    var name = 'Ravi';
    var clas = '5';
    var con = 78974;
    register.find().toArray().then(succ => {
        res.render('index.ejs',{Name:name,Class:clas,Contact:con,data:succ});
    })
})




app.get('/About', (req,res) => {
    res.render('about.ejs',{});
})

app.post('/formsubmit', (req,res) => {
    register.insertOne(req.body);
    res.redirect('/');
})

app.post('/delete', (req,res) => {
    var idd = new mongo.ObjectID(req.body.id);
    register.deleteOne({
        _id:idd
    })
    res.redirect('/');
})

app.post('/edit', (req,res) => {
    var idd = new mongo.ObjectID(req.body.id);
    register.findOne({
        _id:idd
    }).then(succ => {
        res.render('edit.ejs',{data:succ});
        console.log(succ);
    })
})

app.post('/formupdate', (req,res) => {
    var idd = new mongo.ObjectID(req.body.id);
    register.updateOne({
        _id:idd
    },{
        $set: {
            Name:req.body.Name,
            Email:req.body.Email,
            Password:req.body.Password,
            Contact:req.body.Contact
        }
    }, function (err, succ){
        if (err) {
            res.redirect('/');
        }
        if (succ){
            res.redirect('/');            
        }
    })
})








app.listen(30, () => {
    console.log('Server Started');
})