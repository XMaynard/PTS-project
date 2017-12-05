// const MongoClient = require('mongodb').MongoClient; destruturing

const {MongoClient, ObjectID} = require('mongodb');
let obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/ptsProject', (err,db) => {
    if(err){
        return console.log('Unable to connect to MongoDB server')
    }
    console.log('Connected to MongoDB server');
    
//    db.collection('Sales').insertOne({
//       text: 'counterParty',
//        volume: 200000,
//        completed: false
//    }, (err, result) => {
//        if(err) {
//        return console.log('Unable to insert sales', err);
//        }
//        
//        console.log(JSON.stringify(result.ops, undefined, 2));
//                                    
//    });
    
//    db.collection('Purchase').insertOne({
//    
//       text: 'counterParty',
//        volume: -200000,
//        completed: false
//    }, (err, result) => {
//        if(err) {
//        return console.log('Unable to insert Purchase', err);
//        }
//        
//        console.log(result.ops[0]._id.getTimestamp());
//                                    
//    });
    db.close();
});