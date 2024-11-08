const express = require('express');

//parse incoming requests from user before our handlers
const bodyParser = require('body-parser');
const app = express();








const PORT = 5600;
app.listen(PORT , ()=>{
    console.log(`server running on port - http://localhost:${PORT}`);
});