// 设置字体
if (localStorage.getItem("font") == undefined) {
    localStorage.setItem("font", "LXGW");
  }
  setFont(localStorage.getItem("font"));
  function setFont(n) {
    localStorage.setItem("font", n)
    if (n == "default") {
      document.documentElement.style.setProperty('--global-font', '-apple-system');
      document.body.style.fontFamily = "-apple-system, Consolas_1, BlinkMacSystemFont, 'Segoe UI' , 'Helvetica Neue' , Lato, Roboto, 'PingFang SC' , 'Microsoft JhengHei' , 'Microsoft YaHei' , sans-serif";
    }
    else {
      document.documentElement.style.setProperty('--global-font', n);
      document.body.style.fontFamily = "var(--global-font),-apple-system, IBM Plex Mono ,monosapce,'微软雅黑', sans-serif";
    }
    try { setFontBorder(); } catch (err) { };
  }
  