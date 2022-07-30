$(document).ready(onReady);

let mode = '';

function onReady(){
  $('#addBtn').on('click', modeChangeAddition);
  $('#subtractBtn').on('click', modeChangeSubtraction);
  $('#multiplyBtn').on('click', modeChangeMultiplication);
  $('#divideBtn').on('click', modeChangeDivision);
  $('#equalsBtn').on('click', runEquals);
}

function modeChangeAddition(){
  $('#modeHere').empty();
  $('#modeHere').append('+');
  mode = '+';
}

function modeChangeSubtraction(){
  $('#modeHere').empty();
  $('#modeHere').append('-');
  mode = '-';
}

function modeChangeMultiplication(){
  $('#modeHere').empty();
  $('#modeHere').append('*');
  mode = '*';
}

function modeChangeDivision(){
  $('#modeHere').empty();
  $('#modeHere').append('/');
  mode = '/';
}

function runEquals(){
  let input1 = $('#input1').val();
  let input2 = $('#input2').val();
  if (mode === ''){
    alert('Please select a mode!');
    return -1;
  } else {
    $.ajax({
      method: 'POST',
      url: '/compute',
      data: {
          num1: input1,
          num2: input2,
          mode: mode
      }
    }).then(function (){
      $('#input1').val('');
      $('#input2').val('');
      $('#modeHere').empty();
      mode = '';
      getValue();
    });
  }
}

function getValue(){
  $.ajax({
    method: 'GET',
    url: '/compute'
  }).then(function (response){
    // console.log('answer is', response.key);
    $('#resultsHere').empty();
    $('#resultsHere').append(response.key);
    $('#historyList').append(`
      <li>${response.history}</li>
    `);
  })
}