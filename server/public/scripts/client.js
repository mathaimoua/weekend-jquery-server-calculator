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
  $('#modeDiv').empty();
  $('#modeDiv').append('+');
  mode = '+';
}

function modeChangeSubtraction(){
  $('#modeDiv').empty();
  $('#modeDiv').append('-');
  mode = '-';
}

function modeChangeMultiplication(){
  $('#modeDiv').empty();
  $('#modeDiv').append('*');
  mode = '*';
}

function modeChangeDivision(){
  $('#modeDiv').empty();
  $('#modeDiv').append('/');
  mode = '/';
}

function runEquals(){
  let input1 = $('#input1').val();
  let input2 = $('#input2').val();
  if (mode === ''){
    alert('Please select a mode!');
    return -1;
  } else {
    $('#modeDiv').empty();
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
      getValue();
    });
    // $('#modeDiv').append(input1, mode, input2);
  }
}

function getValue(){
  $.ajax({
    method: 'GET',
    url: '/compute'
  }).then(function (response){
    console.log('answer is', response);
  })
}