const previousBtn = document.querySelectorAll('.previous');
const nextBtn = document.querySelectorAll('.next');
const footerNextPre = document.querySelectorAll('.quote')[1];
let pageIndex = Number(window.localStorage.getItem('pageIndex')) || 0;
let pages = [];
let blogPages = [];

function getBlogPages(posts) {
  $.get('https://www.googleapis.com/blogger/v3/blogs/1972878712793179553/posts?maxResults=' + posts + '&key=AIzaSyA8_fFmLFLDRKBruVDp19y7ddrtHR3PhAw', function (data) {
    const items = data.items;
    items.forEach((item, i, arr) => {
      pages.push(item);
      if ((i + 1) % 10 === 0 || arr.length - 1 === i) {
        blogPages.push(pages.slice(0));
        pages = [];
      }
    });
  });
}

// Get Blog info...
$.get("https://www.googleapis.com/blogger/v3/blogs/1972878712793179553/?key=AIzaSyA8_fFmLFLDRKBruVDp19y7ddrtHR3PhAw", function (data) {
  const items = data.posts.totalItems;
  getBlogPages(items);
});

// $.get("https://www.googleapis.com/blogger/v3/blogs/1972878712793179553/posts?key=AIzaSyA8_fFmLFLDRKBruVDp19y7ddrtHR3PhAw", function (data) {
// $.get("https://www.googleapis.com/blogger/v3/blogs/1972878712793179553/posts?maxResults=10&pageToken=CgkIChjgkJH-9SsQocve58jXxLAb&key=AIzaSyA8_fFmLFLDRKBruVDp19y7ddrtHR3PhAw", function (data) {
if (pageIndex !== 0) {
  const pole = setInterval(() => {
    if (blogPages.length > 0) {
      if (pageIndex > 0) {
        nextBtn.forEach((nBtn) => {
          nBtn.classList.remove('disabled')
        });
      }
      if (pageIndex === blogPages.length - 1) {
        arr.forEach((btn) => {
          btn.classList.add('disabled');
        });
      }
      insertBlogs(blogPages[pageIndex]);
      clearInterval(pole);
    }
    console.log('poling for blogs');
  }, 100)
} else {
  $.get("https://www.googleapis.com/blogger/v3/blogs/1972878712793179553/posts?maxResults=10&key=AIzaSyA8_fFmLFLDRKBruVDp19y7ddrtHR3PhAw", function (data) {
    insertBlogs(data.items);
    // localStorage.setItem("blogs", JSON.stringify(data.items));
  });
}

function insertBlogs (blogs) {
  // debugger
  const blogList = document.getElementById('blog-list');
  blogList.innerHTML = '';

  _(blogs).forEach(function (blog, index) {
    var contentNodeList = document.createElement('div');
    var content = blog.content;

    contentNodeList.innerHTML = content;
    var arrayList = Array.prototype.slice.call(contentNodeList.children);

    var blogContent = document.createElement('div');
    blogContent.classList.add('blog-text');

    blogContent.innerHTML = '' +
      '<div class="blog-title">' + blog.title + '</div>' +
      '<span class="publish-label">published:</span>' +
      '<span class="blog-date">' + blog.published.split('T')[0] + '</span>' +
      '<br />' +
      '<div class="blog-content">' + content + '</div>';
      
    blogList.appendChild(blogContent);
  }).value();

  footerNextPre.classList.remove('hidden');
}

previousBtn.forEach((pBtn, i, arr) => {
  footerNextPre.classList.add('hidden');  
  pBtn.onclick = function () {
    nextBtn.forEach((nBtn) => {
      nBtn.classList.remove('disabled')
    });
    pageIndex += 1;
    window.localStorage.setItem('pageIndex', pageIndex);
    insertBlogs(blogPages[pageIndex]);
    if (pageIndex === blogPages.length - 1) {
      arr.forEach((btn) => {
        btn.classList.add('disabled');
      });
    }
  }
});

nextBtn.forEach((nBtn, i, arr) => {
  footerNextPre.classList.add('hidden');  
  nBtn.onclick = function () {
    previousBtn.forEach((pBtn) => {
      pBtn.classList.remove('disabled')
    });
    pageIndex -= 1;
    window.localStorage.setItem('pageIndex', pageIndex);    
    insertBlogs(blogPages[pageIndex]);
    if (pageIndex === 0) {
      arr.forEach((btn) => {
        btn.classList.add('disabled');
      });
    }
  }
});
