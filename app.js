const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  console.log(req.body.cityName);
  const query = req.body.cityName;
  const apiKey = "ca6173f02a2d9c7c7bbf750c831458c4";
  const unit = "metric#";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" +query+ "&appid=" +apiKey+ "&units=" +unit+ "";
  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temperature = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"

      res.write("<p>The weather condition is "+weatherDescription+".</p>");
      res.write("<h1>The temperature in "+ query +" is "+temperature+" degrees celsius.</h1>");
      res.write("<img src="+imageUrl+">");
      res.send();

    });

  });
});

app.listen(3000, function() {
  console.log("server is running on port 3000");
});
