const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Sale} = require('./../models/sale');

const sale = [{
    counterParty: 'CounterParty Test'
}, {
    counterParty: 'CounterParty Test',
    exchangeLocation: 'Location Test',
    typeOfCommodity: 'Commodity Test'
}]

beforeEach((done)=> {
    Sale.remove({}).then(() => {
        return Sale.insertMany(sale);
    }).then(() => done());
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
          
          Sale.find({counterParty}).then((sale) =>{
              expect(sale.length).toBe(1);
              expect(sale[0].counterParty).toBe(counterParty);
              done();
          }).catch((e) => done(e));
      });      
   }); 
    
    it('should not record a sale', (done) => {
       
        request(app)
        .post('/sale')
        .send({})
        .expect(400)
        .end((err, res) =>{
            if(err){
                return done(err);
            }
            Sale.find().then((sale) =>{
                expect(sale.length).toBe(2);
                done();
            }).catch((e) => done(e));
        });      
    });
});

describe('POST /sale', () => {
   it('should create a new sale record with location', (done) =>{
       
       let counterParty = "Encana";
       let exchangeLocation = "Edmonton";
       let  typeOfCommodity ='CLB';

      request(app)
       .post('/sale')
       .send({exchangeLocation})
       .send({typeOfCommodity})
       .send({counterParty})
       .expect(200)
       .expect((res)=>{
          expect(res.body.counterParty).toBe(counterParty);
          expect(res.body.exchangeLocation).toBe(exchangeLocation);
          expect(res.body.typeOfCommodity).toBe(typeOfCommodity);
      })    
     .end((err, res) =>{
          if(err){
              return done(err);
          }
          
          Sale.find().then((sale) =>{
              expect(sale.length).toBe(3);
              expect(sale[2].counterParty).toBe(counterParty);
              expect(sale[2].exchangeLocation).toBe(exchangeLocation);
              expect(sale[2].typeOfCommodity).toBe(typeOfCommodity);
              done();
          }).catch((e) => done(e));
      });      
   }); 
});

describe ('GET /sale', () => {
    it('should return all sales', (done) => {
        
        request(app)
        .get('/sale')
        .expect(200)
        .expect((res) =>{
            expect(res.body.sale.length).toBe(2);
        })
        .end(done);
    });
});
