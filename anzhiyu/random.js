var posts=["posts/96f2062d.html","posts/43448.html","posts/16107.html"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };