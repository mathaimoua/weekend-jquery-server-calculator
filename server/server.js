const express = require('express');
// const inventoryList = require('./modules/inventoryList');

equationString = [];

//create instance of express!
const app = express();
const PORT = 5000;
app.use(express.urlencoded({extended : true}));
app.use(express.static('server/public'));

app.get('/compute', (req, res) => {
  res.send(calculateThings(equationString));
});

app.post('/compute', (req, res) => {
  equationString.push(req.body.num1);
  equationString.push(req.body.mode);
  equationString.push(req.body.num2);
  console.log(equationString);
  res.sendStatus(200); // 'OK'
});

app.listen(PORT, function() {
  console.log('listening on port', PORT)
});

function calculateThings(){

}