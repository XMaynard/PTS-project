const express = require('express');

let app = express();
const mongodb = require('mongodb');

const port = 3000;
let bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.createConnection("mongodb://localhost:27017/Demo");
//mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/Users');

let nameSchema = new mongoose.Schema({
    firstName: String,
    lastName: String
});

let Users = mongoose.model('Users', nameSchema);
//app.get('/', (req, res) =>{
//     res.send('Hello World!') ;  
//        });

app.get('/', (req, res) =>{
   res.sendFile(__dirname + '/index.html'); 
});

app.post("/addname", (req, res)=>{
    let user = new Users(req.body);
    console.log(user);
    user.save().then() => {
        res.send('item saved to database');
    }).catch(err => {
        res.status(400).send('Unable to save to database');
    });
    
    
});

app.listen(port, ()=>{
    console.log(`Server is up on port ${3000}`);
});