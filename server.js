const express = require('express')
const https = require('https')

const app =express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'))

const port = process.env.PORT || 3000

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index.html")
})

app.post("/getWeatherCity",(req,res)=>{
    const city = req.body.Cname
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9f860109e1aa5fa9318c019e18caf5cc&units=metric`
    https.get(url,(resp)=>
    {
       resp.on("data",(data)=>{
        const weatherData = JSON.parse(data)
        const icon = weatherData.weather[0].icon
        console.log(icon);
            res.write("<h1>The Temparature in "+city+" is "+weatherData.main.temp+" Celcius</h1>")
       })
    })
})

app.listen(port,(req,res)=>{
    console.log(`Server running on the port ${port}`)
})