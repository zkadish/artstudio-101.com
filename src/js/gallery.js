const thumbnailSet = document.querySelector('.thumbnail-set');
const imagesDOM = [document.querySelector('.image-one'), document.querySelector('.image-two')];
const previousThumbs = document.querySelector('.previous-thumb-set');
const nextThumbs = document.querySelector('.next-thumb-set');
const seconds = 0.5;
let thumbnails = [];
let groupIndex = 0;
let imageEles = [];
let frame = 1;
let positionOne = 0;
let positionTwo = 600;

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
  // if thumb and image match... do nothing
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
        thumbnail.id = `thumb-${groupIndex},${i}`;
        thumbnail.onclick = thumbnailClickHandler;
        thumbnailSet.appendChild(thumbnail);
      });
    }
  });
}

previousThumbs.onclick = function previousThumbsHandler() {
  thumbnailSet.innerHTML = '';
  if (groupIndex <= 0) {
    groupIndex = thumbnails.length - 1;
  } else {
    groupIndex -= 1;
  }
  appendThumbnails(groupIndex);
};

nextThumbs.onclick = function nextThumbsHandler() {
  thumbnailSet.innerHTML = '';
  if (groupIndex === thumbnails.length - 1) {
    groupIndex = 0;
  } else {
    groupIndex += 1;
  }
  appendThumbnails(groupIndex);
};

function getGalleryImages(posts) {
  fetch(
    `https://www.googleapis.com/blogger/v3/blogs/8516826462384228760/posts?maxResults=${posts}&key=AIzaSyA8_fFmLFLDRKBruVDp19y7ddrtHR3PhAw`,
    { method: 'GET' },
  ).then((response) => {
    return response.json();
  }).then((json) => {
    console.log('blog data:', json);
    let thumbGroup = [];
    imageEles = json.items.map((item, i) => {
      // console.log(item);
      // debugger
      const ele = document.createElement('div');
      const thumbTitle = document.createElement('div');
      const thumbImg = document.createElement('img');
      const src = item.content.slice(item.content.search(/https:\/\//), item.content.search(/.jpg|.jpeg|.png|.gif/i) + 4);

      if (i === 0) {
        const titleOne = document.createElement('div');
        const imageOne = document.createElement('img');
        titleOne.innerText = item.title;
        imageOne.src = src;
        imagesDOM[0].appendChild(titleOne);
        imagesDOM[0].appendChild(imageOne);
      }
      if (i === 1) {
        const titleTwo = document.createElement('div');
        const imageTwo = document.createElement('img');
        titleTwo.innerText = item.title;
        imageTwo.src = src;
        imagesDOM[1].appendChild(titleTwo);
        imagesDOM[1].appendChild(imageTwo);
      }
      ele.classList.add('thumbnail');
      thumbTitle.innerHTML = item.title;
      thumbTitle.classList.add('thumb_title');
      thumbImg.classList.add('thumb_image');
      thumbImg.src = src;
      ele.appendChild(thumbTitle);
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
    appendThumbnails(groupIndex);
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
