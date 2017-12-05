let express = require('express');
let bodyParser = require('body-parser');

let {mongoose} = require('./db/mongoose');

let {Sale} = require('./models/sale');
let {User} = require('./models/user');
    
let app = express();

app.use(bodyParser.json());

app.post('/sale', (req, res) =>{
   let sale = new Sale({
       counterParty: req.body.counterParty,
       exchangeLocation: req.body.exchangeLocation
   }); 
    
    sale.save().then((doc) =>{
       res.send(doc); 
    }, (e) => {
        res.status(400).send(e);
    });
});


app.listen(3000, () => {
    console.log('Started on port 3000');
});