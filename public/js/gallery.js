/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ 2:
/*!***************************!*\
  !*** ./src/js/gallery.js ***!
  \***************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

eval("const thumbnailSet = document.querySelector('.thumbnail-set');\nconst imagesDOM = [document.querySelector('.image-one'), document.querySelector('.image-two')];\nconst previousThumbs = document.querySelector('.previous-thumb-set');\nconst nextThumbs = document.querySelector('.next-thumb-set');\nconst seconds = 0.5;\nlet thumbnails = [];\nlet groupIndex = 0;\nlet imageEles = [];\nlet frame = 1;\nlet positionOne = 0;\nlet positionTwo = 600;\n\n// arrange images after animation\nfunction resetImages() {\n  imagesDOM.reverse();\n  imagesDOM[1].style.left = '600px';\n}\n\n// animate the images...\nfunction slideFrames() {\n  if (frame > 60 * seconds) {\n    // reset state\n    frame = 1;\n    positionOne = 0;\n    positionTwo = 600;\n    resetImages();\n    return;\n  }\n  const rate = -(600 / (60 * seconds));\n\n  positionOne += rate;\n  positionTwo += rate;\n\n  imagesDOM[0].style.left = `${positionOne}px`;\n  imagesDOM[1].style.left = `${positionTwo}px`;\n\n  frame += 1;\n  requestAnimationFrame(slideFrames);\n}\n\nfunction thumbnailClickHandler() {\n  // if thumb and image match... do nothing\n  if (this.id.split('-')[1] === imagesDOM[0].id) return;\n  // assign thumb id to image container id\n  const thumbId = this.id.split('-')[1];\n  imagesDOM[1].id = thumbId;\n  // assign image content to image container\n  imagesDOM[1].innerHTML = this.innerHTML;\n  // start the animation\n  if (frame === 1) {\n    slideFrames();\n  }\n}\n\nfunction appendThumbnails(index) {\n  thumbnails.forEach((thumbGroup, gIndex) => {\n    if (gIndex === index) {\n      thumbGroup.forEach((t, i) => {\n        const thumbnail = t;\n        thumbnail.id = `thumb-${groupIndex},${i}`;\n        thumbnail.onclick = thumbnailClickHandler;\n        thumbnailSet.appendChild(thumbnail);\n      });\n    }\n  });\n}\n\npreviousThumbs.onclick = function previousThumbsHandler() {\n  thumbnailSet.innerHTML = '';\n  if (groupIndex <= 0) {\n    groupIndex = thumbnails.length - 1;\n  } else {\n    groupIndex -= 1;\n  }\n  appendThumbnails(groupIndex);\n};\n\nnextThumbs.onclick = function nextThumbsHandler() {\n  thumbnailSet.innerHTML = '';\n  if (groupIndex === thumbnails.length - 1) {\n    groupIndex = 0;\n  } else {\n    groupIndex += 1;\n  }\n  appendThumbnails(groupIndex);\n};\n\nfunction getGalleryImages(posts) {\n  fetch(`https://www.googleapis.com/blogger/v3/blogs/8516826462384228760/posts?maxResults=${posts}&key=AIzaSyA8_fFmLFLDRKBruVDp19y7ddrtHR3PhAw`, { method: 'GET' }).then(response => {\n    return response.json();\n  }).then(json => {\n    console.log('blog data:', json);\n    let thumbGroup = [];\n    imageEles = json.items.map((item, i) => {\n      // console.log(item);\n      // debugger\n      const ele = document.createElement('div');\n      const thumbTitle = document.createElement('div');\n      const thumbImg = document.createElement('img');\n      const src = item.content.slice(item.content.search(/https:\\/\\//), item.content.search(/.jpg|.jpeg|.png|.gif/i) + 4);\n\n      if (i === 0) {\n        const titleOne = document.createElement('div');\n        const imageOne = document.createElement('img');\n        titleOne.innerText = item.title;\n        imageOne.src = src;\n        imagesDOM[0].appendChild(titleOne);\n        imagesDOM[0].appendChild(imageOne);\n      }\n      if (i === 1) {\n        const titleTwo = document.createElement('div');\n        const imageTwo = document.createElement('img');\n        titleTwo.innerText = item.title;\n        imageTwo.src = src;\n        imagesDOM[1].appendChild(titleTwo);\n        imagesDOM[1].appendChild(imageTwo);\n      }\n      ele.classList.add('thumbnail');\n      thumbTitle.innerHTML = item.title;\n      thumbTitle.classList.add('thumb_title');\n      thumbImg.classList.add('thumb_image');\n      thumbImg.src = src;\n      ele.appendChild(thumbTitle);\n      ele.appendChild(thumbImg);\n      return ele;\n    });\n    imageEles.forEach((img, i, arr) => {\n      // thumbnails is an array of arrays...\n      // 5 thumbnails at a time...\n      thumbGroup = [...thumbGroup, img];\n      if ((i + 1) % 5 === 0 || i === arr.length - 1) {\n        thumbnails = [...thumbnails, thumbGroup];\n        thumbGroup = [];\n      }\n    });\n    appendThumbnails(groupIndex);\n  });\n}\n\nfunction getNewWorkBlog() {\n  fetch('https://www.googleapis.com/blogger/v3/blogs/8516826462384228760/?key=AIzaSyA8_fFmLFLDRKBruVDp19y7ddrtHR3PhAw', { method: 'GET' }).then(response => {\n    return response.json();\n  }).then(json => {\n    getGalleryImages(json.posts.totalItems);\n  });\n}\ngetNewWorkBlog();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvanMvZ2FsbGVyeS5qcz9iY2ZjIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHRodW1ibmFpbFNldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aHVtYm5haWwtc2V0Jyk7XG5jb25zdCBpbWFnZXNET00gPSBbZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltYWdlLW9uZScpLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW1hZ2UtdHdvJyldO1xuY29uc3QgcHJldmlvdXNUaHVtYnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJldmlvdXMtdGh1bWItc2V0Jyk7XG5jb25zdCBuZXh0VGh1bWJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5leHQtdGh1bWItc2V0Jyk7XG5jb25zdCBzZWNvbmRzID0gMC41O1xubGV0IHRodW1ibmFpbHMgPSBbXTtcbmxldCBncm91cEluZGV4ID0gMDtcbmxldCBpbWFnZUVsZXMgPSBbXTtcbmxldCBmcmFtZSA9IDE7XG5sZXQgcG9zaXRpb25PbmUgPSAwO1xubGV0IHBvc2l0aW9uVHdvID0gNjAwO1xuXG4vLyBhcnJhbmdlIGltYWdlcyBhZnRlciBhbmltYXRpb25cbmZ1bmN0aW9uIHJlc2V0SW1hZ2VzKCkge1xuICBpbWFnZXNET00ucmV2ZXJzZSgpO1xuICBpbWFnZXNET01bMV0uc3R5bGUubGVmdCA9ICc2MDBweCc7XG59XG5cbi8vIGFuaW1hdGUgdGhlIGltYWdlcy4uLlxuZnVuY3Rpb24gc2xpZGVGcmFtZXMoKSB7XG4gIGlmIChmcmFtZSA+ICg2MCAqIHNlY29uZHMpKSB7XG4gICAgLy8gcmVzZXQgc3RhdGVcbiAgICBmcmFtZSA9IDE7XG4gICAgcG9zaXRpb25PbmUgPSAwO1xuICAgIHBvc2l0aW9uVHdvID0gNjAwO1xuICAgIHJlc2V0SW1hZ2VzKCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IHJhdGUgPSAtKDYwMCAvICg2MCAqIHNlY29uZHMpKTtcblxuICBwb3NpdGlvbk9uZSArPSByYXRlO1xuICBwb3NpdGlvblR3byArPSByYXRlO1xuXG4gIGltYWdlc0RPTVswXS5zdHlsZS5sZWZ0ID0gYCR7cG9zaXRpb25PbmV9cHhgO1xuICBpbWFnZXNET01bMV0uc3R5bGUubGVmdCA9IGAke3Bvc2l0aW9uVHdvfXB4YDtcblxuICBmcmFtZSArPSAxO1xuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc2xpZGVGcmFtZXMpO1xufVxuXG5mdW5jdGlvbiB0aHVtYm5haWxDbGlja0hhbmRsZXIoKSB7XG4gIC8vIGlmIHRodW1iIGFuZCBpbWFnZSBtYXRjaC4uLiBkbyBub3RoaW5nXG4gIGlmICh0aGlzLmlkLnNwbGl0KCctJylbMV0gPT09IGltYWdlc0RPTVswXS5pZCkgcmV0dXJuO1xuICAvLyBhc3NpZ24gdGh1bWIgaWQgdG8gaW1hZ2UgY29udGFpbmVyIGlkXG4gIGNvbnN0IHRodW1iSWQgPSB0aGlzLmlkLnNwbGl0KCctJylbMV07XG4gIGltYWdlc0RPTVsxXS5pZCA9IHRodW1iSWQ7XG4gIC8vIGFzc2lnbiBpbWFnZSBjb250ZW50IHRvIGltYWdlIGNvbnRhaW5lclxuICBpbWFnZXNET01bMV0uaW5uZXJIVE1MID0gdGhpcy5pbm5lckhUTUw7XG4gIC8vIHN0YXJ0IHRoZSBhbmltYXRpb25cbiAgaWYgKGZyYW1lID09PSAxKSB7XG4gICAgc2xpZGVGcmFtZXMoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBhcHBlbmRUaHVtYm5haWxzKGluZGV4KSB7XG4gIHRodW1ibmFpbHMuZm9yRWFjaCgodGh1bWJHcm91cCwgZ0luZGV4KSA9PiB7XG4gICAgaWYgKGdJbmRleCA9PT0gaW5kZXgpIHtcbiAgICAgIHRodW1iR3JvdXAuZm9yRWFjaCgodCwgaSkgPT4ge1xuICAgICAgICBjb25zdCB0aHVtYm5haWwgPSB0O1xuICAgICAgICB0aHVtYm5haWwuaWQgPSBgdGh1bWItJHtncm91cEluZGV4fSwke2l9YDtcbiAgICAgICAgdGh1bWJuYWlsLm9uY2xpY2sgPSB0aHVtYm5haWxDbGlja0hhbmRsZXI7XG4gICAgICAgIHRodW1ibmFpbFNldC5hcHBlbmRDaGlsZCh0aHVtYm5haWwpO1xuICAgICAgfSk7XG4gICAgfVxuICB9KTtcbn1cblxucHJldmlvdXNUaHVtYnMub25jbGljayA9IGZ1bmN0aW9uIHByZXZpb3VzVGh1bWJzSGFuZGxlcigpIHtcbiAgdGh1bWJuYWlsU2V0LmlubmVySFRNTCA9ICcnO1xuICBpZiAoZ3JvdXBJbmRleCA8PSAwKSB7XG4gICAgZ3JvdXBJbmRleCA9IHRodW1ibmFpbHMubGVuZ3RoIC0gMTtcbiAgfSBlbHNlIHtcbiAgICBncm91cEluZGV4IC09IDE7XG4gIH1cbiAgYXBwZW5kVGh1bWJuYWlscyhncm91cEluZGV4KTtcbn07XG5cbm5leHRUaHVtYnMub25jbGljayA9IGZ1bmN0aW9uIG5leHRUaHVtYnNIYW5kbGVyKCkge1xuICB0aHVtYm5haWxTZXQuaW5uZXJIVE1MID0gJyc7XG4gIGlmIChncm91cEluZGV4ID09PSB0aHVtYm5haWxzLmxlbmd0aCAtIDEpIHtcbiAgICBncm91cEluZGV4ID0gMDtcbiAgfSBlbHNlIHtcbiAgICBncm91cEluZGV4ICs9IDE7XG4gIH1cbiAgYXBwZW5kVGh1bWJuYWlscyhncm91cEluZGV4KTtcbn07XG5cbmZ1bmN0aW9uIGdldEdhbGxlcnlJbWFnZXMocG9zdHMpIHtcbiAgZmV0Y2goXG4gICAgYGh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2Jsb2dnZXIvdjMvYmxvZ3MvODUxNjgyNjQ2MjM4NDIyODc2MC9wb3N0cz9tYXhSZXN1bHRzPSR7cG9zdHN9JmtleT1BSXphU3lBOF9mRm1MRkxEUktCcnVWRHAxOXk3ZGRydEhSM1BoQXdgLFxuICAgIHsgbWV0aG9kOiAnR0VUJyB9LFxuICApLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgfSkudGhlbigoanNvbikgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdibG9nIGRhdGE6JywganNvbik7XG4gICAgbGV0IHRodW1iR3JvdXAgPSBbXTtcbiAgICBpbWFnZUVsZXMgPSBqc29uLml0ZW1zLm1hcCgoaXRlbSwgaSkgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coaXRlbSk7XG4gICAgICAvLyBkZWJ1Z2dlclxuICAgICAgY29uc3QgZWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBjb25zdCB0aHVtYlRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBjb25zdCB0aHVtYkltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgY29uc3Qgc3JjID0gaXRlbS5jb250ZW50LnNsaWNlKGl0ZW0uY29udGVudC5zZWFyY2goL2h0dHBzOlxcL1xcLy8pLCBpdGVtLmNvbnRlbnQuc2VhcmNoKC8uanBnfC5qcGVnfC5wbmd8LmdpZi9pKSArIDQpO1xuXG4gICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICBjb25zdCB0aXRsZU9uZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBpbWFnZU9uZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICB0aXRsZU9uZS5pbm5lclRleHQgPSBpdGVtLnRpdGxlO1xuICAgICAgICBpbWFnZU9uZS5zcmMgPSBzcmM7XG4gICAgICAgIGltYWdlc0RPTVswXS5hcHBlbmRDaGlsZCh0aXRsZU9uZSk7XG4gICAgICAgIGltYWdlc0RPTVswXS5hcHBlbmRDaGlsZChpbWFnZU9uZSk7XG4gICAgICB9XG4gICAgICBpZiAoaSA9PT0gMSkge1xuICAgICAgICBjb25zdCB0aXRsZVR3byA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBpbWFnZVR3byA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICB0aXRsZVR3by5pbm5lclRleHQgPSBpdGVtLnRpdGxlO1xuICAgICAgICBpbWFnZVR3by5zcmMgPSBzcmM7XG4gICAgICAgIGltYWdlc0RPTVsxXS5hcHBlbmRDaGlsZCh0aXRsZVR3byk7XG4gICAgICAgIGltYWdlc0RPTVsxXS5hcHBlbmRDaGlsZChpbWFnZVR3byk7XG4gICAgICB9XG4gICAgICBlbGUuY2xhc3NMaXN0LmFkZCgndGh1bWJuYWlsJyk7XG4gICAgICB0aHVtYlRpdGxlLmlubmVySFRNTCA9IGl0ZW0udGl0bGU7XG4gICAgICB0aHVtYlRpdGxlLmNsYXNzTGlzdC5hZGQoJ3RodW1iX3RpdGxlJyk7XG4gICAgICB0aHVtYkltZy5jbGFzc0xpc3QuYWRkKCd0aHVtYl9pbWFnZScpO1xuICAgICAgdGh1bWJJbWcuc3JjID0gc3JjO1xuICAgICAgZWxlLmFwcGVuZENoaWxkKHRodW1iVGl0bGUpO1xuICAgICAgZWxlLmFwcGVuZENoaWxkKHRodW1iSW1nKTtcbiAgICAgIHJldHVybiBlbGU7XG4gICAgfSk7XG4gICAgaW1hZ2VFbGVzLmZvckVhY2goKGltZywgaSwgYXJyKSA9PiB7XG4gICAgICAvLyB0aHVtYm5haWxzIGlzIGFuIGFycmF5IG9mIGFycmF5cy4uLlxuICAgICAgLy8gNSB0aHVtYm5haWxzIGF0IGEgdGltZS4uLlxuICAgICAgdGh1bWJHcm91cCA9IFsuLi50aHVtYkdyb3VwLCBpbWddO1xuICAgICAgaWYgKChpICsgMSkgJSA1ID09PSAwIHx8IGkgPT09IGFyci5sZW5ndGggLSAxKSB7XG4gICAgICAgIHRodW1ibmFpbHMgPSBbLi4udGh1bWJuYWlscywgdGh1bWJHcm91cF07XG4gICAgICAgIHRodW1iR3JvdXAgPSBbXTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBhcHBlbmRUaHVtYm5haWxzKGdyb3VwSW5kZXgpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0TmV3V29ya0Jsb2coKSB7XG4gIGZldGNoKFxuICAgICdodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9ibG9nZ2VyL3YzL2Jsb2dzLzg1MTY4MjY0NjIzODQyMjg3NjAvP2tleT1BSXphU3lBOF9mRm1MRkxEUktCcnVWRHAxOXk3ZGRydEhSM1BoQXcnLFxuICAgIHsgbWV0aG9kOiAnR0VUJyB9LFxuICApLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgfSkudGhlbigoanNvbikgPT4ge1xuICAgIGdldEdhbGxlcnlJbWFnZXMoanNvbi5wb3N0cy50b3RhbEl0ZW1zKTtcbiAgfSk7XG59XG5nZXROZXdXb3JrQmxvZygpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9nYWxsZXJ5LmpzIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///2\n");

/***/ })

/******/ });