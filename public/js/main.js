//get current page
var currentPage = null;
var mainMenu = document.querySelectorAll('.main-nav a.btn');

(function () {
  currentPage = window.location.pathname.split('/');
  var length = currentPage.length;
  currentPage = currentPage[length - 1].replace('.php', '');
}());

//add .active to the btn of the current page
_(mainMenu).forEach(function (btn, index) {
  if (btn.classList[1] === currentPage) {
    btn.classList.add('active');
  } else {
    btn.classList.remove('active');
  }
}).value();

//open modal
$('.contact-btn').click(function () {
  $('#contact-modal').foundation('reveal', 'open');
});
