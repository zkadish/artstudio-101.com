var caroImg = document.querySelectorAll('.carousel div.caro-img');
var i = 0;
var j = 0;

(function () {
  _(caroImg).forEach(function (img) {
    var imgWidth = img.getBoundingClientRect().width;
    img.style.marginLeft = ((imgWidth / 2) * -1) + 'px';
  }).value();
}());

function revealNextSlide () {
  console.log('revealNextSlide');
  caroImg[j + 1].classList.add('caro-reveal');
  caroImg[i].removeEventListener('transitionend', revealNextSlide, false);

  i++;
  j++;

  if (i === caroImg.length) {
    i = 0;
  }
  if (j === caroImg.length - 1) {
    j = -1;
  }
};

function runCarousel () {
  console.log('runCarousel');
  caroImg[i].classList.remove('caro-reveal');

  caroImg[i].addEventListener('transitionend', revealNextSlide, false);

};

var caroTime = setInterval(runCarousel, 4000);


window.addEventListener('focus', function () {
    clearInterval(caroTime);
    caroTime = setInterval(runCarousel, 4000);
},false)

window.addEventListener("blur",function() {
    clearInterval(caroTime);
},false);
