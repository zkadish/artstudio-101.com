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

eval("const thumbnails = [...document.querySelector('.thumbnails').children];\nconst imagesDOM = [document.querySelector('.image-one'), document.querySelector('.image-two')];\nconst imageOne = document.querySelector('.image-one');\nconst imageTwo = document.querySelector('.image-two');\nlet images = [];\n\nconst seconds = 0.5;\nlet frame = 1;\nlet positionOne = 0;\nlet positionTwo = 600;\n\nimageOne.id = '0';\nimageTwo.id = '1';\n\nfunction getGalleryImages(posts) {\n  fetch(`https://www.googleapis.com/blogger/v3/blogs/8516826462384228760/posts?maxResults=${posts}&key=AIzaSyA8_fFmLFLDRKBruVDp19y7ddrtHR3PhAw`, { method: 'GET' }).then(response => {\n    return response.json();\n  }).then(json => {\n    console.log('posts:', json.items);\n    images = json.items.map(item => {\n      const url = item.content.slice(item.content.indexOf('https://'), item.content.indexOf('.jpg') + 4);\n      console.log(url);\n      debugger;\n    });\n  });\n}\n\nfunction getNewWorkBlog() {\n  fetch('https://www.googleapis.com/blogger/v3/blogs/8516826462384228760/?key=AIzaSyA8_fFmLFLDRKBruVDp19y7ddrtHR3PhAw', { method: 'GET' }).then(response => {\n    console.log(response);\n    return response.json();\n  }).then(json => {\n    console.log(json);\n    getGalleryImages(json.posts.totalItems);\n  });\n}\ngetNewWorkBlog();\n\n// arrange images after animation\nfunction resetImages() {\n  imagesDOM.reverse();\n  imagesDOM[1].style.left = '600px';\n}\n\n// animate the images...\nfunction slideFrames() {\n  if (frame > 60 * seconds) {\n    // reset state\n    frame = 1;\n    positionOne = 0;\n    positionTwo = 600;\n    resetImages();\n    return;\n  }\n  const rate = -(600 / (60 * seconds));\n\n  positionOne += rate;\n  positionTwo += rate;\n\n  imagesDOM[0].style.left = `${positionOne}px`;\n  imagesDOM[1].style.left = `${positionTwo}px`;\n\n  frame += 1;\n  requestAnimationFrame(slideFrames);\n}\n\nfunction clickHandler() {\n  console.log('click', this.id.split('-')[1], imagesDOM[0].id);\n  if (this.id.split('-')[1] === imagesDOM[0].id) return;\n  // assign thumb id to image container id\n  const thumbId = this.id.split('-')[1];\n  imagesDOM[1].id = thumbId;\n  // assign image content to image container\n  imagesDOM[1].innerHTML = this.innerHTML;\n  // start the animation\n  if (frame === 1) {\n    slideFrames();\n  }\n}\n\n// select a thumbnail...\nthumbnails.forEach((t, i) => {\n  const thumbnail = t;\n  thumbnail.id = `thumb-${i}`;\n  thumbnail.onclick = clickHandler;\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvanMvZ2FsbGVyeS5qcz9iY2ZjIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHRodW1ibmFpbHMgPSBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRodW1ibmFpbHMnKS5jaGlsZHJlbl07XG5jb25zdCBpbWFnZXNET00gPSBbZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltYWdlLW9uZScpLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW1hZ2UtdHdvJyldO1xuY29uc3QgaW1hZ2VPbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW1hZ2Utb25lJyk7XG5jb25zdCBpbWFnZVR3byA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWFnZS10d28nKTtcbmxldCBpbWFnZXMgPSBbXTtcblxuY29uc3Qgc2Vjb25kcyA9IDAuNTtcbmxldCBmcmFtZSA9IDE7XG5sZXQgcG9zaXRpb25PbmUgPSAwO1xubGV0IHBvc2l0aW9uVHdvID0gNjAwO1xuXG5pbWFnZU9uZS5pZCA9ICcwJztcbmltYWdlVHdvLmlkID0gJzEnO1xuXG5mdW5jdGlvbiBnZXRHYWxsZXJ5SW1hZ2VzKHBvc3RzKSB7XG4gIGZldGNoKFxuICAgIGBodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9ibG9nZ2VyL3YzL2Jsb2dzLzg1MTY4MjY0NjIzODQyMjg3NjAvcG9zdHM/bWF4UmVzdWx0cz0ke3Bvc3RzfSZrZXk9QUl6YVN5QThfZkZtTEZMRFJLQnJ1VkRwMTl5N2RkcnRIUjNQaEF3YCxcbiAgICB7IG1ldGhvZDogJ0dFVCcgfSxcbiAgKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gIH0pLnRoZW4oKGpzb24pID0+IHtcbiAgICBjb25zb2xlLmxvZygncG9zdHM6JywganNvbi5pdGVtcyk7XG4gICAgaW1hZ2VzID0ganNvbi5pdGVtcy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IHVybCA9IGl0ZW0uY29udGVudC5zbGljZShpdGVtLmNvbnRlbnQuaW5kZXhPZignaHR0cHM6Ly8nKSwgaXRlbS5jb250ZW50LmluZGV4T2YoJy5qcGcnKSArIDQpO1xuICAgICAgY29uc29sZS5sb2codXJsKTtcbiAgICAgIGRlYnVnZ2VyXG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBnZXROZXdXb3JrQmxvZygpIHtcbiAgZmV0Y2goXG4gICAgJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2Jsb2dnZXIvdjMvYmxvZ3MvODUxNjgyNjQ2MjM4NDIyODc2MC8/a2V5PUFJemFTeUE4X2ZGbUxGTERSS0JydVZEcDE5eTdkZHJ0SFIzUGhBdycsXG4gICAgeyBtZXRob2Q6ICdHRVQnIH0sXG4gICkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgfSkudGhlbigoanNvbikgPT4ge1xuICAgIGNvbnNvbGUubG9nKGpzb24pO1xuICAgIGdldEdhbGxlcnlJbWFnZXMoanNvbi5wb3N0cy50b3RhbEl0ZW1zKTtcbiAgfSk7XG59XG5nZXROZXdXb3JrQmxvZygpO1xuXG4vLyBhcnJhbmdlIGltYWdlcyBhZnRlciBhbmltYXRpb25cbmZ1bmN0aW9uIHJlc2V0SW1hZ2VzKCkge1xuICBpbWFnZXNET00ucmV2ZXJzZSgpO1xuICBpbWFnZXNET01bMV0uc3R5bGUubGVmdCA9ICc2MDBweCc7XG59XG5cbi8vIGFuaW1hdGUgdGhlIGltYWdlcy4uLlxuZnVuY3Rpb24gc2xpZGVGcmFtZXMoKSB7XG4gIGlmIChmcmFtZSA+ICg2MCAqIHNlY29uZHMpKSB7XG4gICAgLy8gcmVzZXQgc3RhdGVcbiAgICBmcmFtZSA9IDE7XG4gICAgcG9zaXRpb25PbmUgPSAwO1xuICAgIHBvc2l0aW9uVHdvID0gNjAwO1xuICAgIHJlc2V0SW1hZ2VzKCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IHJhdGUgPSAtKDYwMCAvICg2MCAqIHNlY29uZHMpKTtcblxuICBwb3NpdGlvbk9uZSArPSByYXRlO1xuICBwb3NpdGlvblR3byArPSByYXRlO1xuXG4gIGltYWdlc0RPTVswXS5zdHlsZS5sZWZ0ID0gYCR7cG9zaXRpb25PbmV9cHhgO1xuICBpbWFnZXNET01bMV0uc3R5bGUubGVmdCA9IGAke3Bvc2l0aW9uVHdvfXB4YDtcblxuICBmcmFtZSArPSAxO1xuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc2xpZGVGcmFtZXMpO1xufVxuXG5mdW5jdGlvbiBjbGlja0hhbmRsZXIoKSB7XG4gIGNvbnNvbGUubG9nKCdjbGljaycsIHRoaXMuaWQuc3BsaXQoJy0nKVsxXSwgaW1hZ2VzRE9NWzBdLmlkKTtcbiAgaWYgKHRoaXMuaWQuc3BsaXQoJy0nKVsxXSA9PT0gaW1hZ2VzRE9NWzBdLmlkKSByZXR1cm47XG4gIC8vIGFzc2lnbiB0aHVtYiBpZCB0byBpbWFnZSBjb250YWluZXIgaWRcbiAgY29uc3QgdGh1bWJJZCA9IHRoaXMuaWQuc3BsaXQoJy0nKVsxXTtcbiAgaW1hZ2VzRE9NWzFdLmlkID0gdGh1bWJJZDtcbiAgLy8gYXNzaWduIGltYWdlIGNvbnRlbnQgdG8gaW1hZ2UgY29udGFpbmVyXG4gIGltYWdlc0RPTVsxXS5pbm5lckhUTUwgPSB0aGlzLmlubmVySFRNTDtcbiAgLy8gc3RhcnQgdGhlIGFuaW1hdGlvblxuICBpZiAoZnJhbWUgPT09IDEpIHtcbiAgICBzbGlkZUZyYW1lcygpO1xuICB9XG59XG5cbi8vIHNlbGVjdCBhIHRodW1ibmFpbC4uLlxudGh1bWJuYWlscy5mb3JFYWNoKCh0LCBpKSA9PiB7XG4gIGNvbnN0IHRodW1ibmFpbCA9IHQ7XG4gIHRodW1ibmFpbC5pZCA9IGB0aHVtYi0ke2l9YDtcbiAgdGh1bWJuYWlsLm9uY2xpY2sgPSBjbGlja0hhbmRsZXI7XG59KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvZ2FsbGVyeS5qcyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///2\n");

/***/ })

/******/ });