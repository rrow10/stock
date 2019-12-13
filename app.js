//jshint esver:6
const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");

const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.listen("3000",function(){
  console.log("server on port 3000");
});

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    var SName=req.body.StockName;
    console.log(SName);

    var options = {
      method: 'GET',
      url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/get-detail',
      qs: {region: 'US', lang: 'en', symbol: 'TSLA'},
      headers: {
        'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
        'x-rapidapi-key': 'a507958740msh25b656c4ba11f06p1bc5e8jsn22707ac96813'
      }
    };

    request(options, function (error, response, body) {
      if (error){
        console.log(error);
      }else{
        console.log(response.statusCode);
        if (response.statusCode===200) {
          // console.log(response.body);
          // var data=response.body;
          var obj=JSON.parse(response.body);
          var companyName=obj.price.longName;
          var businessSummary=obj.summaryProfile.longBusinessSummary;
          var industry=obj.summaryProfile.industry;
          console.log(companyName, businessSummary,industry);
        }else {
          res.send("Error Code"+response.statusCode);
        }

      }

    });
});
