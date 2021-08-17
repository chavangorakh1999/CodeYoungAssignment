require('dotenv').config()
const express = require('express')
const app = express()

										
var api = process.env.GOOGLE_API_KEY;
var googleTranslate = require('google-translate')(api);

app.get("/",(req,res)=>{
    res.send("Working fine");
});

app.get("/translate",(req,res)=>{
    var text = 'I am using google translator to convert this text to spanish'
    console.log("English :>",text);
    googleTranslate.translate(text, 'es', function(err, translation) {
  console.log("Spanish :>",translation.translatedText);
  res.send(translation.translatedText);
});
});


const PORT= process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log("Server started at "+ PORT);
})
										