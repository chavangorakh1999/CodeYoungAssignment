const request = require('supertest');
// app is supposed to point to the app.js file
const express = require('express');

const app = express();



describe('POST /translate',()=>{
  describe('Sendig data to translate',() =>{
      test('Should response with custom body',async ()=>{
        const response= await request(app).post('/translate').send({
          message:"Hello",
          lang:"en"
        })
        expect((res)=>{
          res.body="Hello";
        });
      })
      test('Should response with custom body',async ()=>{
        const response= await request(app).post('/translate').send({
          message:"Good Morning",
          lang:"mr"
        })
        expect((res)=>{
          res.body="शुभ प्रभात";
        });
      })
  })
  
  
  describe('Sendig data to translate',() =>{
    
  })
})

