$(document).ready(onReady);

let mode = ''; //This is where we store our mode/operator, we'll send this to the server so it knows what to do with our two numbers later

function onReady(){
  $('#addBtn').on('click', modeChangeAddition); //When we click the + sign, change the mode
  $('#subtractBtn').on('click', modeChangeSubtraction); // When we click the - sign...
  $('#multiplyBtn').on('click', modeChangeMultiplication); // When we click the * sign...
  $('#divideBtn').on('click', modeChangeDivision); // When we click the / sign...
  $('#equalsBtn').on('click', runEquals); // When we click the = sign, send all info to server
}

function modeChangeAddition(){ //When the + sign is clicked...
  $('#modeHere').empty(); // Empty out the 'mode' spot on webpage and show the + sign
  $('#modeHere').append('+');
  mode = '+'; // Change the mode to be a string of the operator we'll use later at the server
}

function modeChangeSubtraction(){
  $('#modeHere').empty(); // Empty out the 'mode' spot on webpage and show the - sign
  $('#modeHere').append('-');
  mode = '-'; // Change the mode to be a string of the operator we'll use later at the server
}

function modeChangeMultiplication(){
  $('#modeHere').empty();// Empty out the 'mode' spot on webpage and show the * sign
  $('#modeHere').append('*');
  mode = '*'; // Change the mode to be a string of the operator we'll use later at the server
}

function modeChangeDivision(){
  $('#modeHere').empty(); // Empty out the 'mode' spot on webpage and show the / sign
  $('#modeHere').append('/');
  mode = '/'; // Change the mode to be a string of the operator we'll use later at the server
}

function runEquals(){ //This runs when we hit the equals button
  let input1 = $('#input1').val();
  let input2 = $('#input2').val();
  // We'll want to check to make sure both fields are filled and that a mode is selected, if not, throw an error
  if (mode === ''){ // If the user hasn't selected a mode yet, throw error
    alert('Please select a mode!');
    return -1;
  } else if ($('#input1').val() === '' || $('#input2').val() === ''){
    // If either input text boxes are empty, throw an error
    alert('Missing an input, please make sure both fields are filled');
  } else { // This else will run if both fields are filled and the user has selected a mode
    $.ajax({
      method: 'POST',
      url: '/compute',
      data: { // Send and object to server containing both field values and the mode to use
          num1: input1,
          num2: input2,
          mode: mode
      }
    }).then(function (){ // Clear out fields and mode, then reach out to server to compute
      $('#input1').val('');
      $('#input2').val('');
      $('#modeHere').empty();
      mode = '';
      getValue(); // After we send data, ask for the server to compute and send an answer back
    });
  }
}

function getValue(){ // This function runs after data is sent to the server
  $.ajax({
    method: 'GET',
    url: '/compute'
  }).then(function (response){ // Ajax should receive a response/object from server containing an object that contains our answer, and our string to append to the history Div
    $('#resultsHere').empty(); // First, empty the results from previous equation
    $('#resultsHere').append(response.key); // Append the new answer to the results space as a new <li>
    $('#historyList').append(`
      <li>${response.history}</li>
    `);
  })
}