const express =
require("express");

const getNews =
require("../services/newsService");

const summarize =
require("../services/aiService");

const risk =
require("../services/riskService");

const router =
express.Router();

router.get("/",async(req,res)=>{

try{

const news =
await getNews();

const processed =
await Promise.all(

news.map(async(item)=>({

title:item.title,

summary:
await summarize(
item.description
),

lat:
20 + Math.random()*40,

lng:
-120 + Math.random()*240,

risk:
risk(),

url:item.url

}))

);

res.json(processed);

}

catch(error){

console.log(error);

res.json([]);

}

});

module.exports=router;
