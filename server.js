require("dotenv").config();
const express = require("express");
var bodyParser = require("body-parser");
const redis = require("redis");

//Setting Dynamic port to Express server
const PORT = process.env.PORT || 3000;

//Setting Dynamic port to Redis
const REDIS_PORT = process.env.PORT || 6379;

//Creating Redis Client instance
const client = redis.createClient(REDIS_PORT);

client.on("error", function (err) {
  console.log("Error " + err);
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Getting ENV variablesfrom .env file. Replace your API Key with GOOGLE_API_KEY
var api = process.env.GOOGLE_API_KEY;
var googleTranslate = require("google-translate")(api);



//Function to translate the passed message
async function translate(req, res, next) {
  try {
    console.log("Data fetched");
    console.log(req.body);
    //getting message data out of req
    const message = req.body.message;
    const lang = req.body.lang;
    //Language shortcodes provided by google we can add more as per google docs
    let langArray = ["en", "mr", "hi", "kn", "ml", "pa", "te"];


    for (let i = 0; i < langArray.length; i++) {
      let data = langArray[i];
      googleTranslate.translate(message, data, function (err, translation) {
        if(data===lang){
          res.send(translation.translatedText);
        }
        client.setex(data, 3600, translation.translatedText);
      });
    }
  } catch (err) {
    console.log(err);
  }
}


function cache(req, res, next) {
  const lang = req.body.lang;

  client.get(lang, (err, data) => {
    if (err) throw err;

    if (data !== null) {
      res.send(data);
    } else {
      next();
    }
  });
}
//translate route where we will pass data Pass message and lang data
// and lang parameters must be among ["en", "mr", "hi", "kn", "ml", "pa", "te"]
app.post("/translate",cache, translate);

app.listen(PORT, () => {
  console.log("Server started at " + PORT);
});
