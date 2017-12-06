const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Sale} = require('./../models/sale');

beforeEach((done)=> {
    Sale.remove({}).then(() => done());
});

describe('POST /sale', () => {
   it('should create a new sale record', (done) =>{
 //     let transactionDate = "11/30/2017";
//      let settlementDate = "12/25/2017";
      let counterParty = "Suncor";
//     let typeOfCommodity =  "CLB";
//      let exchangeLocation = "Edmonton";
 //     let volume = '200000';
//      let price = '55.60';
     
      request(app)
       .post('/sale')
       .send({counterParty})
       .expect(200)
       .expect((res)=>{
          expect(res.body.counterParty).toBe(counterParty);
      })    
     .end((err, res) =>{
          if(err){
              return done(err);
          }
          
          Sale.find().then((sale) =>{
              expect(sale.length).toBe(1);
              expect(sale[0].counterParty).toBe(counterParty);
              done();
          }).catch((e) => done(e));
      });      
   }); 
});

describe('POST /sale', () => {
   it('should create a new sale record with location', (done) =>{
       let exchangeLocation = "Edmonton";
       let  typeOfCommodity ='CLB';

      request(app)
       .post('/sale')
       .send({exchangeLocation})
       .send({typeOfCommodity})
       .expect(200)
       .expect((res)=>{
          expect(res.body.exchangeLocation).toBe(exchangeLocation);
          expect(res.body.typeOfCommodity).toBe(typeOfCommodity);
      })    
     .end((err, res) =>{
          if(err){
              return done(err);
          }
          
          Sale.find().then((sale) =>{
              expect(sale.length).toBe(1);
              expect(sale[0].exchangeLocation).toBe(exchangeLocation);
              expect(sale[0].typeOfCommodity).toBe(typeOfCommodity);
              done();
          }).catch((e) => done(e));
      });      
   }); 
});
