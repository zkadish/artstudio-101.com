const thumbnails = [...document.querySelector('.thumbnails').children];
const imagesDOM = [document.querySelector('.image-one'), document.querySelector('.image-two')];
const imageOne = document.querySelector('.image-one');
const imageTwo = document.querySelector('.image-two');
let images = [];

const seconds = 0.5;
let frame = 1;
let positionOne = 0;
let positionTwo = 600;

imageOne.id = '0';
imageTwo.id = '1';

function getGalleryImages(posts) {
  fetch(
    `https://www.googleapis.com/blogger/v3/blogs/8516826462384228760/posts?maxResults=${posts}&key=AIzaSyA8_fFmLFLDRKBruVDp19y7ddrtHR3PhAw`,
    { method: 'GET' },
  ).then((response) => {
    return response.json();
  }).then((json) => {
    console.log('posts:', json.items);
    images = json.items.map((item) => {
      const url = item.content.slice(item.content.indexOf('https://'), item.content.indexOf('.jpg') + 4);
      console.log(url);
      debugger
    });
  });
}

function getNewWorkBlog() {
  fetch(
    'https://www.googleapis.com/blogger/v3/blogs/8516826462384228760/?key=AIzaSyA8_fFmLFLDRKBruVDp19y7ddrtHR3PhAw',
    { method: 'GET' },
  ).then((response) => {
    console.log(response);
    return response.json();
  }).then((json) => {
    console.log(json);
    getGalleryImages(json.posts.totalItems);
  });
}
getNewWorkBlog();

// arrange images after animation
function resetImages() {
  imagesDOM.reverse();
  imagesDOM[1].style.left = '600px';
}

// animate the images...
function slideFrames() {
  if (frame > (60 * seconds)) {
    // reset state
    frame = 1;
    positionOne = 0;
    positionTwo = 600;
    resetImages();
    return;
  }
  const rate = -(600 / (60 * seconds));

  positionOne += rate;
  positionTwo += rate;

  imagesDOM[0].style.left = `${positionOne}px`;
  imagesDOM[1].style.left = `${positionTwo}px`;

  frame += 1;
  requestAnimationFrame(slideFrames);
}

function clickHandler() {
  console.log('click', this.id.split('-')[1], imagesDOM[0].id);
  if (this.id.split('-')[1] === imagesDOM[0].id) return;
  // assign thumb id to image container id
  const thumbId = this.id.split('-')[1];
  imagesDOM[1].id = thumbId;
  // assign image content to image container
  imagesDOM[1].innerHTML = this.innerHTML;
  // start the animation
  if (frame === 1) {
    slideFrames();
  }
}

// select a thumbnail...
thumbnails.forEach((t, i) => {
  const thumbnail = t;
  thumbnail.id = `thumb-${i}`;
  thumbnail.onclick = clickHandler;
});
