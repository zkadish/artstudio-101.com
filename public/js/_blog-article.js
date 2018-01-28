console.log('blog-article.js loaded!')
(function () {
  'use strict';
  debugger

  var articleIndex = document.location.hash.replace('#', '');
  var blogs = JSON.parse(localStorage.getItem("blogs"));
  var blog = blogs[articleIndex];

  var articleTitle = document.getElementById('article-title');
  var articleDate = document.getElementById('article-date');
  var articleContent = document.getElementById('article-content');

  var previousPost = document.getElementById('previous-posts');

  articleTitle.innerHTML = blog.title;
  articleDate.innerHTML = blog.published.split('T')[0];
  articleContent.innerHTML = blog.content;

  _(blogs).forEach(function (blog, index) {
    var previousTitle = document.createElement('a');
    previousTitle.setAttribute('href', 'article.php#' + index)
    previousTitle.classList.add('previous-title');
    previousTitle.innerText = blog.title;

    if (previousPost) {
      previousPost.appendChild(previousTitle);
    }

    previousTitle.onclick = function () {
      articleTitle.innerHTML = blog.title;
      articleDate.innerHTML = blog.published.split('T')[0];
      articleContent.innerHTML = blog.content;
    }

  }).value();

}());
