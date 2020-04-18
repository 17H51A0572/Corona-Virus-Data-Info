const express = require('express')
const path=require('path')
const app = express()
const port = process.env.PORT || 3000
app.use(express.static(__dirname+'/dist/ngproject'));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get('/', (req, res) => res.sendFile(path.join(__dirname+'/dist/ngproject/index.html')))
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))