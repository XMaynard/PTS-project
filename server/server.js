let express = require('express');
let bodyParser = require('body-parser');
let {ObjectID} = require('mongodb');

let {mongoose} = require('./db/mongoose');

let {Sale} = require('./models/sale');
let {User} = require('./models/user');
    
let app = express();

app.use(bodyParser.json());

app.post('/sale', (req, res) =>{
   let sale = new Sale({
       transactionDate: req.body.transactionDate,
       settlementDate: req.body.settlementDate,
       counterParty: req.body.counterParty,
       typeOfCommodity: req.body.typeOfCommodity,
       exchangeLocation: req.body.exchangeLocation,
       volume: req.body.volume,
       price: req.body.price
       
   }); 
    
    sale.save().then((doc) =>{
       res.send(doc); 
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/sale', (req, res) =>{
    Sale.find().then((sale) =>{
        res.send({sale});
    }, (e) =>{
        res.status(400).send(e);
    });
});

app.get('/sale/:id', (req, res) =>{
    let id = req.params.id;
    
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    
    Sale.findById(id).then((sale) => {
        if(!sale){
            return res.status(404).send();
        }
        
        res.send({sale});
        
    }).catch((e) =>{
        res.status(400).send();
    });
  
});


app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = {app};