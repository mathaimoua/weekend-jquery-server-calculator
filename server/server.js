const express = require('express');
// const inventoryList = require('./modules/inventoryList');

equationString = [];

//create instance of express!
const app = express();
const PORT = 5000;
app.use(express.urlencoded({extended : true}));
app.use(express.static('server/public'));

app.get('/compute', (req, res) => {
  let answer = { 
    history: equationString[0]+equationString[1]+equationString[2],
    key: calculateThings(equationString) 
  }
  res.send(answer);
});

app.post('/compute', (req, res) => {
  equationString = [];
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
  if (equationString[1] === '+'){
    return (Number(equationString[0]) + Number(equationString[2]));
  }
  if (equationString[1] === '-'){
    return (Number(equationString[0]) - Number(equationString[2]));
  }
  if (equationString[1] === '*'){
    return (Number(equationString[0]) * Number(equationString[2]));
  }
  if (equationString[1] === '/'){
    return (Number(equationString[0]) / Number(equationString[2]));
  }
}