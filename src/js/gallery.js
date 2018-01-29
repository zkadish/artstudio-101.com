const thumbnailSet = document.querySelector('.thumbnail-set');
const imagesDOM = [document.querySelector('.image-one'), document.querySelector('.image-two')];
// const imageOne = document.querySelector('.image-one');
// const imageTwo = document.querySelector('.image-two');
let thumbnails = [];
let imageEles = [];

const seconds = 0.5;
let frame = 1;
let positionOne = 0;
let positionTwo = 600;

// imageOne.id = '0';
// imageTwo.id = '1';

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

function thumbnailClickHandler() {
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

function appendThumbnails(index) {
  thumbnails.forEach((thumbGroup, gIndex) => {
    if (gIndex === index) {
      thumbGroup.forEach((t, i) => {
        const thumbnail = t;
        thumbnail.id = `thumb-${i}`;
        thumbnail.onclick = thumbnailClickHandler;
        thumbnailSet.appendChild(thumbnail);
      });
    }
  });
}

function getGalleryImages(posts) {
  fetch(
    `https://www.googleapis.com/blogger/v3/blogs/8516826462384228760/posts?maxResults=${posts}&key=AIzaSyA8_fFmLFLDRKBruVDp19y7ddrtHR3PhAw`,
    { method: 'GET' },
  ).then((response) => {
    return response.json();
  }).then((json) => {
    let thumbGroup = [];
    imageEles = json.items.map((item, i) => {
      const ele = document.createElement('div');
      const thumbImg = document.createElement('img');
      const src = item.content.slice(item.content.indexOf('https://'), item.content.indexOf('.jpg') + 4);
      if (i === 0) {
        const imageOne = document.createElement('img');
        imageOne.src = src;
        imagesDOM[0].appendChild(imageOne);
      }
      if (i === 1) {
        const imageTwo = document.createElement('img');
        imageTwo.src = src;
        imagesDOM[1].appendChild(imageTwo);
      }
      ele.classList.add('thumbnail');
      thumbImg.classList.add('thumb_image');
      thumbImg.src = src;
      ele.appendChild(thumbImg);
      return ele;
    });
    imageEles.forEach((img, i, arr) => {
      // thumbnails is an array of arrays...
      // 5 thumbnails at a time...
      thumbGroup = [...thumbGroup, img];
      if ((i + 1) % 5 === 0 || i === arr.length - 1) {
        thumbnails = [...thumbnails, thumbGroup];
        thumbGroup = [];
      }
    });
    appendThumbnails(0);
  });
}

function getNewWorkBlog() {
  fetch(
    'https://www.googleapis.com/blogger/v3/blogs/8516826462384228760/?key=AIzaSyA8_fFmLFLDRKBruVDp19y7ddrtHR3PhAw',
    { method: 'GET' },
  ).then((response) => {
    return response.json();
  }).then((json) => {
    getGalleryImages(json.posts.totalItems);
  });
}
getNewWorkBlog();
