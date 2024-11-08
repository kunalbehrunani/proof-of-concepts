const express = require('express');

const app = express();

const cors = require('cors');

app.use( cors({
    origin: "*"
}))

app.get("/data" , (req,res)=>{
    res.json({
        name:"Kunal Behrunani" , 
        place: "delhi" 
    })

})

app.listen(3000 , ()=>{
    console.log('express server running on port 3000...');
})
