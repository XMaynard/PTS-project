 require('./config/config');

const _ =require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

let {mongoose} = require('./db/mongoose');

let {Sale} = require('./models/sale');
let {User} = require('./models/user');
    
let app = express();
const port = process.env.PORT;

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

app.get('/location/:exchangeLocation', (req, res) =>{
    
    Sale.find({"exchangeLocation": "Hardisty"}).then((sale) =>{
        
        if(!sale||sale.length === 0){
            return res.status(404).send();
        }
        
        res.send({sale});
    }).catch((e) => {
        res.status(400).send();
    });
});

app.get('/commodityType', (req, res) =>{
    Sale.find({"typeOfCommodity": "CLB"}).then((sale) =>{
        res.send({sale});
    }).catch((e) => {
        res.status(400).send();
    });
});

app.get('/counterParty', (req, res) =>{
    Sale.find({"counterParty": "Suncor"}).then((sale) =>{
        res.send({sale});
    }).catch((e) => {
        res.status(400).send();
    });
});

app.get('/transactionDate', (req, res) =>{
    Sale.find({"transactionDate": "11/30/2017"}).then((sale) =>{
        res.send({sale});
    }).catch((e) => {
        res.status(400).send();
    });
});

app.get('/settlementDate', (req, res) =>{
    Sale.find({"settlementDate": "12/25/2017"}).then((sale) =>{
        res.send({sale});
    }).catch((e) => {
        res.status(400).send();
    });
});

app.delete('/sale/:id', (req, res) =>{
    let id = req.params.id;
    
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    
    Sale.findByIdAndRemove(id).then((sale) =>{
        if(!sale){
            return res.status(404).send();
        }
        res.send({sale})
    }).catch((e) => {
        return res.status(404).send();
    });
});

app.patch('/sale/:id', (req, res) =>{
   let id = req.params.id;
   let body = _.pick(req.body, ['counterParty', 'volume', 'price', 'completed', 'settlementDate', 'transactionDate']);
    
   if(!ObjectID.isValid(id)){
       return res.status(404).send();
   } 
    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }
    
    Sale.findByIdAndUpdate(id, {$set: body}, {new: true}).then((sale) => {
        if(!sale){
            return res.status(404).send();
        }
        res.send({sale});
    }).catch((e) => {
        res.status(400).send();
    })
});

app.listen(port, () => {
    console.log(`Started on port: ${port}`);
});

module.exports = {app};