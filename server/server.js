const express = require('express');

// This will be our equation string which we'll use later once we get the right information
equationString = [];

//create instance of express!
const app = express();
const PORT = 5000;
app.use(express.urlencoded({extended : true}));
app.use(express.static('server/public'));

app.get('/compute', (req, res) => { // This is our get method that sends back the answer to the client after computing
  // We'll create an object variable to store everything we'll need to send back, the answer and the string for the historyDiv.
  let answer = { 
    // This is our history string to append as an <li> later
    history: equationString[0]+equationString[1]+equationString[2],
    // They key is the result of the calculateThings function down below
    // The calculateThings function will take our string from our POST method and compute it
    key: calculateThings(equationString) 
  }

  res.send(answer); // Send the object back to client for use
});

app.post('/compute', (req, res) => { // This is our post route, when information is sent to the server
  // Empty the equation string first so we don't have old data
  equationString = [];
  // Our object sent to us from the client has 3 keys, input1, mode, and input 2, we'll push all 3 to the equationString array we declared at the top.
  equationString.push(req.body.num1); // This will be equationString[0]
  equationString.push(req.body.mode); // This will be equationString[1]
  equationString.push(req.body.num2); // This will be equationString[2]
  console.log(equationString); // Show the server console our completed equation to compute
  res.sendStatus(200); // 'OK'
});

app.listen(PORT, function() {
  console.log('listening on port', PORT)
});

// This function will compute our string and give an answer to send back
function calculateThings(){ 
  // We'll check to see what mode we're in by checking equationString[1], then send accordingly.
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