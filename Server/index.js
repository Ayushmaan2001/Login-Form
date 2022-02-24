const express = require("express");
const app = express();

app.get('/sample',(req,res) => {
    res.send('get done');
})

app.listen(5000, console.log("running"));
