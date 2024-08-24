var posts=["posts/16107.html","posts/26279.html","posts/96f2062d.html","posts/43448.html"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };