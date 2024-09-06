var posts=["posts/43900.html","posts/96f2062d.html","posts/40293.html","posts/240822.html","posts/42075.html","posts/42659.html","posts/240824.html","posts/16107.html"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };