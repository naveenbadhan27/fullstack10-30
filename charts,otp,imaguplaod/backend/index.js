const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors');
const fileUpload = require('express-fileupload');

app.use(fileUpload());

const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://naveen:naveen123@cluster0.nmnca.mongodb.net/practice1?retryWrites=true&w=majority';
const client = new MongoClient(connectionString);
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'naveenbadhan27@gmail.com',
        pass: 'fclmdrowqvvftbjo'
    }
})



app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

var db;
var register;
var images;
MongoClient.connect(connectionString, { useUnifiedTopology:true }).then(client => {
    console.log('Connected to Database');

    db = client.db('practice1');
    register = db.collection('register')
    images = db.collection('images')

})

app.post('/sendOTP', (req,res) => {
    // console.log(req.body.email);
    register.findOne({
        Email:req.body.email
    }).then(function(succ){
        // console.log(succ)
        if(succ == null){
            // console.log('no')
            res.send('noemail');
        }else{
            // console.log(Math.floor(Math.random() * 999999));
            var otp = Math.floor(Math.random() * 999999);

            register.updateOne({
                Email:req.body.email
            },{ $set:{
                otp:otp
            }
        }).then(function(succss){
            // console.log(succss);
            var mailOption = {
                from: 'naveenbadhan27@gmail.com',
                to: req.body.email,
                subject: 'OTP Verification',
                text: 'Your OTP is '+otp+', Please dont share with anyone.'
            }

            transporter.sendMail(mailOption, function(error, sccc){
                if(error){
                    console.log(error)
                }else{
                    console.log("Email Sent");
                    res.send(succ);

                }
            })



        })
        }
    }).catch(function(err){
        res.send('error');
    })
})




app.post('/submitOTP', (req,res) => {
    var id = new mongo.ObjectId(req.body.uid);
    var otp = parseInt(req.body.otp);
    console.log(otp);
    register.findOne({
        _id:id,
        otp:otp
    }).then(function(succ){
        if(succ == null){
            // console.log('error');
            res.send('error');
        }else{
            // console.log('yes');
            res.send('true');
        }
    })
})



app.post('/submitPassword', (req,res) => {
    var id = new mongo.ObjectId(req.body.uid);
    var password = req.body.newpass
    register.updateOne({
        _id:id
    },{
        $set:{
         Password:password   
        }
    }).then(function(succ){
        res.send(true);
    }).catch(function(err){
        res.send('error');
    })
})

app.post('/uppp', (req,res) => {
    if(req.files === null){
        res.send('error 404');
    }
    var file = req.files.file;

    file.mv(`${__dirname}/../src/images/${file.name}`).then(function(succ){
        images.insertOne({
            imageName:file.name
        }).then(function(succcc){
            req.send('true');
        })
    })
})

app.get('/getimage', (req,res) => {
    images.find().toArray().then(function(succ){
        res.send(succ);
        console.log(succ)
    })
})

app.listen(30, () => {
    console.log('Server Started');
})