var posts=["posts/96f2062d.html","posts/240822.html","posts/16107.html","posts/240824.html"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };