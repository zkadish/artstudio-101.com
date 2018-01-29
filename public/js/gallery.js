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

eval("const thumbnailSet = document.querySelector('.thumbnail-set');\nconst imagesDOM = [document.querySelector('.image-one'), document.querySelector('.image-two')];\n// const imageOne = document.querySelector('.image-one');\n// const imageTwo = document.querySelector('.image-two');\nlet thumbnails = [];\nlet imageEles = [];\n\nconst seconds = 0.5;\nlet frame = 1;\nlet positionOne = 0;\nlet positionTwo = 600;\n\n// imageOne.id = '0';\n// imageTwo.id = '1';\n\n// arrange images after animation\nfunction resetImages() {\n  imagesDOM.reverse();\n  imagesDOM[1].style.left = '600px';\n}\n\n// animate the images...\nfunction slideFrames() {\n  if (frame > 60 * seconds) {\n    // reset state\n    frame = 1;\n    positionOne = 0;\n    positionTwo = 600;\n    resetImages();\n    return;\n  }\n  const rate = -(600 / (60 * seconds));\n\n  positionOne += rate;\n  positionTwo += rate;\n\n  imagesDOM[0].style.left = `${positionOne}px`;\n  imagesDOM[1].style.left = `${positionTwo}px`;\n\n  frame += 1;\n  requestAnimationFrame(slideFrames);\n}\n\nfunction thumbnailClickHandler() {\n  console.log('click', this.id.split('-')[1], imagesDOM[0].id);\n  if (this.id.split('-')[1] === imagesDOM[0].id) return;\n  // assign thumb id to image container id\n  const thumbId = this.id.split('-')[1];\n  imagesDOM[1].id = thumbId;\n  // assign image content to image container\n  imagesDOM[1].innerHTML = this.innerHTML;\n  // start the animation\n  if (frame === 1) {\n    slideFrames();\n  }\n}\n\nfunction appendThumbnails(index) {\n  thumbnails.forEach((thumbGroup, gIndex) => {\n    if (gIndex === index) {\n      thumbGroup.forEach((t, i) => {\n        const thumbnail = t;\n        thumbnail.id = `thumb-${i}`;\n        thumbnail.onclick = thumbnailClickHandler;\n        thumbnailSet.appendChild(thumbnail);\n      });\n    }\n  });\n}\n\nfunction getGalleryImages(posts) {\n  fetch(`https://www.googleapis.com/blogger/v3/blogs/8516826462384228760/posts?maxResults=${posts}&key=AIzaSyA8_fFmLFLDRKBruVDp19y7ddrtHR3PhAw`, { method: 'GET' }).then(response => {\n    return response.json();\n  }).then(json => {\n    let thumbGroup = [];\n    imageEles = json.items.map((item, i) => {\n      const ele = document.createElement('div');\n      const thumbImg = document.createElement('img');\n      const src = item.content.slice(item.content.indexOf('https://'), item.content.indexOf('.jpg') + 4);\n      if (i === 0) {\n        const imageOne = document.createElement('img');\n        imageOne.src = src;\n        imagesDOM[0].appendChild(imageOne);\n      }\n      if (i === 1) {\n        const imageTwo = document.createElement('img');\n        imageTwo.src = src;\n        imagesDOM[1].appendChild(imageTwo);\n      }\n      ele.classList.add('thumbnail');\n      thumbImg.classList.add('thumb_image');\n      thumbImg.src = src;\n      ele.appendChild(thumbImg);\n      return ele;\n    });\n    imageEles.forEach((img, i, arr) => {\n      // thumbnails is an array of arrays...\n      // 5 thumbnails at a time...\n      thumbGroup = [...thumbGroup, img];\n      if ((i + 1) % 5 === 0 || i === arr.length - 1) {\n        thumbnails = [...thumbnails, thumbGroup];\n        thumbGroup = [];\n      }\n    });\n    appendThumbnails(0);\n  });\n}\n\nfunction getNewWorkBlog() {\n  fetch('https://www.googleapis.com/blogger/v3/blogs/8516826462384228760/?key=AIzaSyA8_fFmLFLDRKBruVDp19y7ddrtHR3PhAw', { method: 'GET' }).then(response => {\n    return response.json();\n  }).then(json => {\n    getGalleryImages(json.posts.totalItems);\n  });\n}\ngetNewWorkBlog();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvanMvZ2FsbGVyeS5qcz9iY2ZjIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHRodW1ibmFpbFNldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aHVtYm5haWwtc2V0Jyk7XG5jb25zdCBpbWFnZXNET00gPSBbZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltYWdlLW9uZScpLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW1hZ2UtdHdvJyldO1xuLy8gY29uc3QgaW1hZ2VPbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW1hZ2Utb25lJyk7XG4vLyBjb25zdCBpbWFnZVR3byA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWFnZS10d28nKTtcbmxldCB0aHVtYm5haWxzID0gW107XG5sZXQgaW1hZ2VFbGVzID0gW107XG5cbmNvbnN0IHNlY29uZHMgPSAwLjU7XG5sZXQgZnJhbWUgPSAxO1xubGV0IHBvc2l0aW9uT25lID0gMDtcbmxldCBwb3NpdGlvblR3byA9IDYwMDtcblxuLy8gaW1hZ2VPbmUuaWQgPSAnMCc7XG4vLyBpbWFnZVR3by5pZCA9ICcxJztcblxuLy8gYXJyYW5nZSBpbWFnZXMgYWZ0ZXIgYW5pbWF0aW9uXG5mdW5jdGlvbiByZXNldEltYWdlcygpIHtcbiAgaW1hZ2VzRE9NLnJldmVyc2UoKTtcbiAgaW1hZ2VzRE9NWzFdLnN0eWxlLmxlZnQgPSAnNjAwcHgnO1xufVxuXG4vLyBhbmltYXRlIHRoZSBpbWFnZXMuLi5cbmZ1bmN0aW9uIHNsaWRlRnJhbWVzKCkge1xuICBpZiAoZnJhbWUgPiAoNjAgKiBzZWNvbmRzKSkge1xuICAgIC8vIHJlc2V0IHN0YXRlXG4gICAgZnJhbWUgPSAxO1xuICAgIHBvc2l0aW9uT25lID0gMDtcbiAgICBwb3NpdGlvblR3byA9IDYwMDtcbiAgICByZXNldEltYWdlcygpO1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCByYXRlID0gLSg2MDAgLyAoNjAgKiBzZWNvbmRzKSk7XG5cbiAgcG9zaXRpb25PbmUgKz0gcmF0ZTtcbiAgcG9zaXRpb25Ud28gKz0gcmF0ZTtcblxuICBpbWFnZXNET01bMF0uc3R5bGUubGVmdCA9IGAke3Bvc2l0aW9uT25lfXB4YDtcbiAgaW1hZ2VzRE9NWzFdLnN0eWxlLmxlZnQgPSBgJHtwb3NpdGlvblR3b31weGA7XG5cbiAgZnJhbWUgKz0gMTtcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHNsaWRlRnJhbWVzKTtcbn1cblxuZnVuY3Rpb24gdGh1bWJuYWlsQ2xpY2tIYW5kbGVyKCkge1xuICBjb25zb2xlLmxvZygnY2xpY2snLCB0aGlzLmlkLnNwbGl0KCctJylbMV0sIGltYWdlc0RPTVswXS5pZCk7XG4gIGlmICh0aGlzLmlkLnNwbGl0KCctJylbMV0gPT09IGltYWdlc0RPTVswXS5pZCkgcmV0dXJuO1xuICAvLyBhc3NpZ24gdGh1bWIgaWQgdG8gaW1hZ2UgY29udGFpbmVyIGlkXG4gIGNvbnN0IHRodW1iSWQgPSB0aGlzLmlkLnNwbGl0KCctJylbMV07XG4gIGltYWdlc0RPTVsxXS5pZCA9IHRodW1iSWQ7XG4gIC8vIGFzc2lnbiBpbWFnZSBjb250ZW50IHRvIGltYWdlIGNvbnRhaW5lclxuICBpbWFnZXNET01bMV0uaW5uZXJIVE1MID0gdGhpcy5pbm5lckhUTUw7XG4gIC8vIHN0YXJ0IHRoZSBhbmltYXRpb25cbiAgaWYgKGZyYW1lID09PSAxKSB7XG4gICAgc2xpZGVGcmFtZXMoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBhcHBlbmRUaHVtYm5haWxzKGluZGV4KSB7XG4gIHRodW1ibmFpbHMuZm9yRWFjaCgodGh1bWJHcm91cCwgZ0luZGV4KSA9PiB7XG4gICAgaWYgKGdJbmRleCA9PT0gaW5kZXgpIHtcbiAgICAgIHRodW1iR3JvdXAuZm9yRWFjaCgodCwgaSkgPT4ge1xuICAgICAgICBjb25zdCB0aHVtYm5haWwgPSB0O1xuICAgICAgICB0aHVtYm5haWwuaWQgPSBgdGh1bWItJHtpfWA7XG4gICAgICAgIHRodW1ibmFpbC5vbmNsaWNrID0gdGh1bWJuYWlsQ2xpY2tIYW5kbGVyO1xuICAgICAgICB0aHVtYm5haWxTZXQuYXBwZW5kQ2hpbGQodGh1bWJuYWlsKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGdldEdhbGxlcnlJbWFnZXMocG9zdHMpIHtcbiAgZmV0Y2goXG4gICAgYGh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2Jsb2dnZXIvdjMvYmxvZ3MvODUxNjgyNjQ2MjM4NDIyODc2MC9wb3N0cz9tYXhSZXN1bHRzPSR7cG9zdHN9JmtleT1BSXphU3lBOF9mRm1MRkxEUktCcnVWRHAxOXk3ZGRydEhSM1BoQXdgLFxuICAgIHsgbWV0aG9kOiAnR0VUJyB9LFxuICApLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgfSkudGhlbigoanNvbikgPT4ge1xuICAgIGxldCB0aHVtYkdyb3VwID0gW107XG4gICAgaW1hZ2VFbGVzID0ganNvbi5pdGVtcy5tYXAoKGl0ZW0sIGkpID0+IHtcbiAgICAgIGNvbnN0IGVsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgY29uc3QgdGh1bWJJbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgIGNvbnN0IHNyYyA9IGl0ZW0uY29udGVudC5zbGljZShpdGVtLmNvbnRlbnQuaW5kZXhPZignaHR0cHM6Ly8nKSwgaXRlbS5jb250ZW50LmluZGV4T2YoJy5qcGcnKSArIDQpO1xuICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgY29uc3QgaW1hZ2VPbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgaW1hZ2VPbmUuc3JjID0gc3JjO1xuICAgICAgICBpbWFnZXNET01bMF0uYXBwZW5kQ2hpbGQoaW1hZ2VPbmUpO1xuICAgICAgfVxuICAgICAgaWYgKGkgPT09IDEpIHtcbiAgICAgICAgY29uc3QgaW1hZ2VUd28gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgaW1hZ2VUd28uc3JjID0gc3JjO1xuICAgICAgICBpbWFnZXNET01bMV0uYXBwZW5kQ2hpbGQoaW1hZ2VUd28pO1xuICAgICAgfVxuICAgICAgZWxlLmNsYXNzTGlzdC5hZGQoJ3RodW1ibmFpbCcpO1xuICAgICAgdGh1bWJJbWcuY2xhc3NMaXN0LmFkZCgndGh1bWJfaW1hZ2UnKTtcbiAgICAgIHRodW1iSW1nLnNyYyA9IHNyYztcbiAgICAgIGVsZS5hcHBlbmRDaGlsZCh0aHVtYkltZyk7XG4gICAgICByZXR1cm4gZWxlO1xuICAgIH0pO1xuICAgIGltYWdlRWxlcy5mb3JFYWNoKChpbWcsIGksIGFycikgPT4ge1xuICAgICAgLy8gdGh1bWJuYWlscyBpcyBhbiBhcnJheSBvZiBhcnJheXMuLi5cbiAgICAgIC8vIDUgdGh1bWJuYWlscyBhdCBhIHRpbWUuLi5cbiAgICAgIHRodW1iR3JvdXAgPSBbLi4udGh1bWJHcm91cCwgaW1nXTtcbiAgICAgIGlmICgoaSArIDEpICUgNSA9PT0gMCB8fCBpID09PSBhcnIubGVuZ3RoIC0gMSkge1xuICAgICAgICB0aHVtYm5haWxzID0gWy4uLnRodW1ibmFpbHMsIHRodW1iR3JvdXBdO1xuICAgICAgICB0aHVtYkdyb3VwID0gW107XG4gICAgICB9XG4gICAgfSk7XG4gICAgYXBwZW5kVGh1bWJuYWlscygwKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGdldE5ld1dvcmtCbG9nKCkge1xuICBmZXRjaChcbiAgICAnaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYmxvZ2dlci92My9ibG9ncy84NTE2ODI2NDYyMzg0MjI4NzYwLz9rZXk9QUl6YVN5QThfZkZtTEZMRFJLQnJ1VkRwMTl5N2RkcnRIUjNQaEF3JyxcbiAgICB7IG1ldGhvZDogJ0dFVCcgfSxcbiAgKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gIH0pLnRoZW4oKGpzb24pID0+IHtcbiAgICBnZXRHYWxsZXJ5SW1hZ2VzKGpzb24ucG9zdHMudG90YWxJdGVtcyk7XG4gIH0pO1xufVxuZ2V0TmV3V29ya0Jsb2coKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvZ2FsbGVyeS5qcyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///2\n");

/***/ })

/******/ });