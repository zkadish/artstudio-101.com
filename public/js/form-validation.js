'use strict';

var submitBtn = document.getElementById('contact-submit-btn');
var verifyCallback = function( response ) {
    submitBtn.removeAttribute('disabled');
};

function ajaxMailer(postData) {
  $.post('php/mailer.php', postData);
}

function validateForm() {
  var fullName = document.getElementById('fullname');
  var companyName = document.getElementById('companyname');
  var email = document.getElementById('email');
  var subject = document.getElementById('subject');
  var message = document.getElementById('message');
  var recaptcha = document.getElementById('g-recaptcha-response');

  var postData = {
    full_name: fullName.value,
    company_name: companyName.value,
    email: email.value,
    subject: subject.value,
    message: message.value,
    recaptcha: recaptcha.value
  }

  if(email.value === "") {
    email.focus();
    email.style.borderColor = "#d10000";
    email.setAttribute('placeholder', 'your email is required...');
    return false;
  } else {
    if(validateEmail(email.value) === false){
      email.focus();
      email.style.borderColor = "#d10000";
      email.setAttribute('placeholder', 'you must enter a valid email...');
      return false;
    }
  }

  ajaxMailer(postData).then(function() {
    // reset form values
    fullName.value = '';
    companyName.value = '';
    email.value = '';
    subject.value = '';
    message.value = '';
  });
}

function validateEmail(elementValue){
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+([.-]?[a-zA-Z0-9]+)?([\.]{1}[a-zA-Z]{2,4}){1,4}$/;
    return emailPattern.test(elementValue);
}
