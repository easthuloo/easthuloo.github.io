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
  
/* 欢迎信息 start */
//get请求
$.ajax({
    type: 'get',
    url: 'https://apis.map.qq.com/ws/location/v1/ip',
    data: {
      key: 'S4ABZ-6DDCZ-NYXXB-ZI2TE-25S43-7RFBQ',  // 这里要写你的KEY!!!
      output: 'jsonp',
    },
    dataType: 'jsonp',
    success: function (res) {
      ipLoacation = res;
    }
})
function getDistance(e1, n1, e2, n2) {
    const R = 6371
    const { sin, cos, asin, PI, hypot } = Math
    let getPoint = (e, n) => {
      e *= PI / 180
      n *= PI / 180
      return { x: cos(n) * cos(e), y: cos(n) * sin(e), z: sin(n) }
    }
  
    let a = getPoint(e1, n1)
    let b = getPoint(e2, n2)
    let c = hypot(a.x - b.x, a.y - b.y, a.z - b.z)
    let r = asin(c / 2) * 2 * R
    return Math.round(r);
}
  
function showWelcome() {
  
    let dist = getDistance(116.00869000, 29.67691000, ipLoacation.result.location.lng, ipLoacation.result.location.lat); //这里换成自己的经纬度
    let pos = ipLoacation.result.ad_info.nation;   
    let ip;
    let posdesc;
    //根据国家、省份、城市信息自定义欢迎语
    switch (ipLoacation.result.ad_info.nation) {
      case "日本":
        posdesc = "よろしく，一起去看樱花吗";
        break;
      case "美国":
        posdesc = "Let us live in peace!";
        break;
      case "英国":
        posdesc = "想同你一起夜乘伦敦眼";
        break;
      case "俄罗斯":
        posdesc = "干了这瓶伏特加！";
        break;
      case "法国":
        posdesc = "C'est La Vie";
        break;
      case "德国":
        posdesc = "Die Zeit verging im Fluge.";
        break;
      case "澳大利亚":
        posdesc = "一起去大堡礁吧！";
        break;
      case "加拿大":
        posdesc = "拾起一片枫叶赠予你";
        break;
      case "中国":
        pos = ipLoacation.result.ad_info.province + " " + ipLoacation.result.ad_info.city + " " + ipLoacation.result.ad_info.district;
        ip = ipLoacation.result.ip;
        switch (ipLoacation.result.ad_info.province) {
          case "北京市":
            posdesc = "北——京——欢迎你~~~";
            break;
          case "天津市":
            posdesc = "讲段相声吧。";
            break;
          case "河北省":
            posdesc = "山势巍巍成壁垒，天下雄关。铁马金戈由此向，无限江山。";
            break;
          case "山西省":
            posdesc = "展开坐具长三尺，已占山河五百余。";
            break;
          case "内蒙古自治区":
            posdesc = "天苍苍，野茫茫，风吹草低见牛羊。";
            break;
          case "辽宁省":
            posdesc = "我想吃烤鸡架！";
            break;
          case "吉林省":
            posdesc = "状元阁就是东北烧烤之王。";
            break;
          case "黑龙江省":
            posdesc = "很喜欢哈尔滨大剧院。";
            break;
          case "上海市":
            posdesc = "众所周知，中国只有两个城市。";
            break;
          case "江苏省":
            switch (ipLoacation.result.ad_info.city) {
              case "南京市":
                posdesc = "这是我挺想去的城市啦。";
                break;
              case "苏州市":
                posdesc = "上有天堂，下有苏杭。";
                break;
              default:
                posdesc = "散装是必须要散装的。";
                break;
            }
            break;
          case "浙江省":
            posdesc = "东风渐绿西湖柳，雁已还人未南归。";
            break;
          case "河南省":
            switch (ipLoacation.result.ad_info.city) {
              case "郑州市":
                posdesc = "豫州之域，天地之中。";
                break;
              case "南阳市":
                posdesc = "臣本布衣，躬耕于南阳。此南阳非彼南阳！";
                break;
              case "驻马店市":
                posdesc = "峰峰有奇石，石石挟仙气。嵖岈山的花很美哦！";
                break;
              case "开封市":
                posdesc = "刚正不阿包青天。";
                break;
              case "洛阳市":
                posdesc = "洛阳牡丹甲天下。";
                break;
              default:
                posdesc = "可否带我品尝河南烩面啦？";
                break;
            }
            break;
          case "安徽省":
            posdesc = "蚌埠住了，芜湖起飞。";
            break;
          case "福建省":
            posdesc = "井邑白云间，岩城远带山。";
            break;
          case "江西省":
            switch (ipLoacation.result.ad_info.city) {
              case "南昌市":
                posdesc = "落霞与孤鹜齐飞，秋水共长天一色。";
                break;
              case "九江市":
                posdesc = "九江悠悠万古情 古人行尽今人行。";
                break;
              default:
                posdesc = "千里来寻故地，旧貌变新颜。";
                break;
            }
            break;
          case "山东省":
            posdesc = "遥望齐州九点烟，一泓海水杯中泻。";
            break;
          case "湖北省":
            posdesc = "来碗热干面！";
            break;
          case "湖南省":
            posdesc = "74751，长沙斯塔克。";
            break;
          case "广东省":
            posdesc = "老板来两斤福建人。";
            break;
          case "广西壮族自治区":
            posdesc = "桂林山水甲天下。";
            break;
          case "海南省":
            posdesc = "朝观日出逐白浪，夕看云起收霞光。";
            break;
          case "四川省":
            posdesc = "康康川妹子。";
            break;
          case "贵州省":
            posdesc = "茅台，学生，再塞200。";
            break;
          case "云南省":
            posdesc = "玉龙飞舞云缠绕，万仞冰川直耸天。";
            break;
          case "西藏自治区":
            posdesc = "躺在茫茫草原上，仰望蓝天。";
            break;
          case "陕西省":
            posdesc = "来份臊子面加馍。";
            break;
          case "甘肃省":
            posdesc = "羌笛何须怨杨柳，春风不度玉门关。";
            break;
          case "青海省":
            posdesc = "牛肉干和老酸奶都好好吃。";
            break;
          case "宁夏回族自治区":
            posdesc = "大漠孤烟直，长河落日圆。";
            break;
          case "新疆维吾尔自治区":
            posdesc = "驼铃古道丝绸路，胡马犹闻唐汉风。";
            break;
          case "台湾省":
            posdesc = "我在这头，大陆在那头。";
            break;
          case "香港特别行政区":
            posdesc = "永定贼有残留地鬼嚎，迎击光非岁玉。";
            break;
          case "澳门特别行政区":
            posdesc = "性感荷官，在线发牌。";
            break;
          default:
            posdesc = "带我去你的城市逛逛吧！";
            break;
        }
        break;
      default:
        posdesc = "带我去你的国家逛逛吧。";
        break;
    }
  
    //根据本地时间切换欢迎语
    let timeChange;
    let date = new Date();
    if (date.getHours() >= 5 && date.getHours() < 11) timeChange = "<span>上午好</span>，一日之计在于晨！";
    else if (date.getHours() >= 11 && date.getHours() < 13) timeChange = "<span>中午好</span>，该摸鱼吃午饭了。";
    else if (date.getHours() >= 13 && date.getHours() < 15) timeChange = "<span>下午好</span>，懒懒地睡个午觉吧！";
    else if (date.getHours() >= 15 && date.getHours() < 16) timeChange = "<span>三点几啦</span>，一起饮茶呀！";
    else if (date.getHours() >= 16 && date.getHours() < 19) timeChange = "<span>夕阳无限好！</span>";
    else if (date.getHours() >= 19 && date.getHours() < 24) timeChange = "<span>晚上好</span>，夜生活嗨起来！";
    else timeChange = "夜深了，早点休息，少熬夜。";
  
    try {
      //自定义文本和需要放的位置
      document.getElementById("welcome-info").innerHTML =
        `<b><center>🎉 欢迎信息 🎉</center>&emsp;&emsp;欢迎来自 <span style="color: #87CEFA;font-weight: bold;">${pos}</span> 的小伙伴，${timeChange}您现在距离站长约 <span style="color: #87CEFA">${dist}</span> 公里，当前的IP地址为： <span style="color: #87CEFA">${ip}</span>。<center> ${posdesc}</center></b>`;
    } catch (err) {
      // console.log("Pjax无法获取#welcome-info元素🙄🙄🙄")
    }
}

window.onload = showWelcome;
  // 如果使用了pjax在加上下面这行代码
document.addEventListener('pjax:complete', showWelcome);
  
  /* 欢迎信息 end */


/* 农历转换 start */
/**

* @1900-2100区间内的公历、农历互转

* @charset UTF-8

* @Author  jiangjiazhi

* @公历转农历：calendar.solar2lunar(1987,11,01); //[you can ignore params of prefix 0]

* @农历转公历：calendar.lunar2solar(1987,09,10); //[you can ignore params of prefix 0]

*/



/**

* 农历1900-2100的润大小信息表

* @Array Of Property

* @return Hex

*/

var lunarInfo = [0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, // 1900-1909

  0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, // 1910-1919

  0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, // 1920-1929

  0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, // 1930-1939

  0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, // 1940-1949

  0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, // 1950-1959

  0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, // 1960-1969

  0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6, // 1970-1979

  0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, // 1980-1989

  0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x05ac0, 0x0ab60, 0x096d5, 0x092e0, // 1990-1999

  0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, // 2000-2009

  0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, // 2010-2019

  0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, // 2020-2029

  0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, // 2030-2039

  0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, // 2040-2049

  0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0, // 2050-2059

  0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4, // 2060-2069

  0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0, // 2070-2079

  0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160, // 2080-2089

  0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252, // 2090-2099

  0x0d520] // 2100



var solarMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]



/**

* 天干地支之天干速查表

* @Array Of Property trans['甲','乙','丙','丁','戊','己','庚','辛','壬','癸']

* @return Cn string

*/

var Gan = ['\u7532', '\u4e59', '\u4e19', '\u4e01', '\u620a', '\u5df1', '\u5e9a', '\u8f9b', '\u58ec', '\u7678']



/**

* 天干地支之地支速查表

* @Array Of Property

* @trans['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥']

* @return Cn string

*/

var Zhi = ['\u5b50', '\u4e11', '\u5bc5', '\u536f', '\u8fb0', '\u5df3', '\u5348', '\u672a', '\u7533', '\u9149', '\u620c', '\u4ea5']



/**

* 天干地支之地支速查表<=>生肖

* @Array Of Property

* @trans['鼠','牛','虎','兔','龙','蛇','马','羊','猴','鸡','狗','猪']

* @return Cn string

*/

var Animals = ['\u9f20', '\u725b', '\u864e', '\u5154', '\u9f99', '\u86c7', '\u9a6c', '\u7f8a', '\u7334', '\u9e21', '\u72d7', '\u732a']



/**

* 24节气速查表

* @Array Of Property

* @trans['小寒','大寒','立春','雨水','惊蛰','春分','清明','谷雨','立夏','小满','芒种','夏至','小暑','大暑','立秋','处暑','白露','秋分','寒露','霜降','立冬','小雪','大雪','冬至']

* @return Cn string

*/

var solarTerm = ['\u5c0f\u5bd2', '\u5927\u5bd2', '\u7acb\u6625', '\u96e8\u6c34', '\u60ca\u86f0', '\u6625\u5206', '\u6e05\u660e', '\u8c37\u96e8', '\u7acb\u590f', '\u5c0f\u6ee1', '\u8292\u79cd', '\u590f\u81f3', '\u5c0f\u6691', '\u5927\u6691', '\u7acb\u79cb', '\u5904\u6691', '\u767d\u9732', '\u79cb\u5206', '\u5bd2\u9732', '\u971c\u964d', '\u7acb\u51ac', '\u5c0f\u96ea', '\u5927\u96ea', '\u51ac\u81f3']



/**

* 1900-2100各年的24节气日期速查表

* @Array Of Property

* @return 0x string For splice

*/

var sTermInfo = ['9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f',

  '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',

  '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa',

  '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f',

  'b027097bd097c36b0b6fc9274c91aa', '9778397bd19801ec9210c965cc920e', '97b6b97bd19801ec95f8c965cc920f',

  '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd197c36c9210c9274c91aa',

  '97b6b97bd19801ec95f8c965cc920e', '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2',

  '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec95f8c965cc920e', '97bcf97c3598082c95f8e1cfcc920f',

  '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e',

  '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',

  '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722',

  '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f',

  '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',

  '97bcf97c359801ec95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',

  '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd07f595b0b6fc920fb0722',

  '9778397bd097c36b0b6fc9210c8dc2', '9778397bd19801ec9210c9274c920e', '97b6b97bd19801ec95f8c965cc920f',

  '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e',

  '97b6b97bd19801ec95f8c965cc920f', '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',

  '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bd07f1487f595b0b0bc920fb0722',

  '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',

  '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',

  '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',

  '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f531b0b0bb0b6fb0722',

  '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',

  '97bcf7f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',

  '97b6b97bd19801ec9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',

  '9778397bd097c36b0b6fc9210c91aa', '97b6b97bd197c36c9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722',

  '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e',

  '97b6b7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',

  '9778397bd097c36b0b70c9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722',

  '7f0e397bd097c35b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721',

  '7f0e27f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',

  '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',

  '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',

  '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721',

  '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9274c91aa',

  '97b6b7f0e47f531b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',

  '9778397bd097c36b0b6fc9210c91aa', '97b6b7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',

  '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '977837f0e37f149b0723b0787b0721',

  '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c35b0b6fc9210c8dc2',

  '977837f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722',

  '7f0e397bd097c35b0b6fc9210c8dc2', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',

  '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '977837f0e37f14998082b0787b06bd',

  '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',

  '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',

  '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',

  '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd',

  '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',

  '977837f0e37f14998082b0723b06bd', '7f07e7f0e37f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',

  '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721',

  '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e37f0e37f14898082b0723b02d5',

  '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f531b0b0bb0b6fb0722',

  '7f0e37f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',

  '7f0e37f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',

  '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35',

  '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',

  '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f149b0723b0787b0721',

  '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0723b06bd',

  '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e37f0e366aa89801eb072297c35',

  '7ec967f0e37f14998082b0723b06bd', '7f07e7f0e37f14998083b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',

  '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14898082b0723b02d5', '7f07e7f0e37f14998082b0787b0721',

  '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66aa89801e9808297c35', '665f67f0e37f14898082b0723b02d5',

  '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66a449801e9808297c35',

  '665f67f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',

  '7f0e36665b66a449801e9808297c35', '665f67f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',

  '7f07e7f0e47f531b0723b0b6fb0721', '7f0e26665b66a449801e9808297c35', '665f67f0e37f1489801eb072297c35',

  '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722']



/**

 * 数字转中文速查表

* @Array Of Property

* @trans ['日','一','二','三','四','五','六','七','八','九','十']

* @return Cn string

 */

var nStr1 = ['\u65e5', '\u4e00', '\u4e8c', '\u4e09', '\u56db', '\u4e94', '\u516d', '\u4e03', '\u516b', '\u4e5d', '\u5341']



/**

* 日期转农历称呼速查表

* @Array Of Property

* @trans ['初','十','廿','卅']

* @return Cn string

*/

var nStr2 = ['\u521d', '\u5341', '\u5eff', '\u5345']



/**

* 月份转农历称呼速查表

* @Array Of Property

* @trans ['正','一','二','三','四','五','六','七','八','九','十','冬','腊']

* @return Cn string

*/

var nStr3 = ['\u6b63', '\u4e8c', '\u4e09', '\u56db', '\u4e94', '\u516d', '\u4e03', '\u516b', '\u4e5d', '\u5341', '\u51ac', '\u814a']



/**

* 返回农历y年一整年的总天数

* @param lunar Year

 * @return Number

* @eg:var count = calendar.lYearDays(1987) ;//count=387

*/

function lYearDays(y) {

  var i

  var sum = 348

  for (i = 0x8000; i > 0x8; i >>= 1) { sum += (lunarInfo[y - 1900] & i) ? 1 : 0 }

  return (sum + leapDays(y))

}



/**

* 返回农历y年闰月是哪个月；若y年没有闰月 则返回0

* @param lunar Year

* @return Number (0-12)

 * @eg:var leapMonth = calendar.leapMonth(1987) ;//leapMonth=6

*/

function leapMonth(y) { // 闰字编码 \u95f0

  return (lunarInfo[y - 1900] & 0xf)

}



/**

* 返回农历y年闰月的天数 若该年没有闰月则返回0

* @param lunar Year

* @return Number (0、29、30)

* @eg:var leapMonthDay = calendar.leapDays(1987) ;//leapMonthDay=29

*/

function leapDays(y) {

  if (leapMonth(y)) {

    return ((lunarInfo[y - 1900] & 0x10000) ? 30 : 29)

  }

  return (0)

}



/**

* 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法

* @param lunar Year

* @return Number (-1、29、30)

 * @eg:var MonthDay = calendar.monthDays(1987,9) ;//MonthDay=29

*/

function monthDays(y, m) {

  if (m > 12 || m < 1) { return -1 }// 月份参数从1至12，参数错误返回-1

  return ((lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29)

}



/**

* 返回公历(!)y年m月的天数

* @param solar Year

* @return Number (-1、28、29、30、31)

* @eg:var solarMonthDay = calendar.leapDays(1987) ;//solarMonthDay=30

*/

function solarDays(y, m) {

  if (m > 12 || m < 1) { return -1 } // 若参数错误 返回-1

  var ms = m - 1

  if (ms === 1) { // 2月份的闰平规律测算后确认返回28或29

    return (((y % 4 === 0) && (y % 100 !== 0) || (y % 400 === 0)) ? 29 : 28)

  } else {

    return (solarMonth[ms])

  }

}



/**

* 农历年份转换为干支纪年

* @param  lYear 农历年的年份数

* @return Cn string

*/

function toGanZhiYear(lYear) {

  var ganKey = (lYear - 3) % 10

  var zhiKey = (lYear - 3) % 12

  if (ganKey === 0) ganKey = 10 // 如果余数为0则为最后一个天干

  if (zhiKey === 0) zhiKey = 12 // 如果余数为0则为最后一个地支

  return Gan[ganKey - 1] + Zhi[zhiKey - 1]

}



/**

* 公历月、日判断所属星座

* @param  cMonth [description]

* @param  cDay [description]

* @return Cn string

*/

function toAstro(cMonth, cDay) {

  var s = '\u9b54\u7faf\u6c34\u74f6\u53cc\u9c7c\u767d\u7f8a\u91d1\u725b\u53cc\u5b50\u5de8\u87f9\u72ee\u5b50\u5904\u5973\u5929\u79e4\u5929\u874e\u5c04\u624b\u9b54\u7faf'

  var arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22]

  return s.substr(cMonth * 2 - (cDay < arr[cMonth - 1] ? 2 : 0), 2) + '\u5ea7' // 座

}



/**

* 传入offset偏移量返回干支

* @param offset 相对甲子的偏移量

* @return Cn string

*/

function toGanZhi(offset) {

  return Gan[offset % 10] + Zhi[offset % 12]

}



/**

* 传入公历(!)y年获得该年第n个节气的公历日期

* @param y公历年(1900-2100)；n二十四节气中的第几个节气(1~24)；从n=1(小寒)算起

* @return day Number

* @eg:var _24 = calendar.getTerm(1987,3) ;//_24=4;意即1987年2月4日立春

*/

function getTerm(y, n) {

  if (y < 1900 || y > 2100) { return -1 }

  if (n < 1 || n > 24) { return -1 }

  var _table = sTermInfo[y - 1900]

  var _info = [

    parseInt('0x' + _table.substr(0, 5)).toString(),

    parseInt('0x' + _table.substr(5, 5)).toString(),

    parseInt('0x' + _table.substr(10, 5)).toString(),

    parseInt('0x' + _table.substr(15, 5)).toString(),

    parseInt('0x' + _table.substr(20, 5)).toString(),

    parseInt('0x' + _table.substr(25, 5)).toString()

  ]

  var _calday = [

    _info[0].substr(0, 1),

    _info[0].substr(1, 2),

    _info[0].substr(3, 1),

    _info[0].substr(4, 2),



    _info[1].substr(0, 1),

    _info[1].substr(1, 2),

    _info[1].substr(3, 1),

    _info[1].substr(4, 2),



    _info[2].substr(0, 1),

    _info[2].substr(1, 2),

    _info[2].substr(3, 1),

    _info[2].substr(4, 2),



    _info[3].substr(0, 1),

    _info[3].substr(1, 2),

    _info[3].substr(3, 1),

    _info[3].substr(4, 2),



    _info[4].substr(0, 1),

    _info[4].substr(1, 2),

    _info[4].substr(3, 1),

    _info[4].substr(4, 2),



    _info[5].substr(0, 1),

    _info[5].substr(1, 2),

    _info[5].substr(3, 1),

    _info[5].substr(4, 2)

  ]

  return parseInt(_calday[n - 1])

}



/**

* 传入农历数字月份返回汉语通俗表示法

* @param lunar month

* @return Cn string

* @eg:var cnMonth = calendar.toChinaMonth(12) ;//cnMonth='腊月'

*/

function toChinaMonth(m) { // 月 => \u6708

  if (m > 12 || m < 1) { return -1 } // 若参数错误 返回-1

  var s = nStr3[m - 1]

  s += '\u6708' // 加上月字

  return s

}



/**

* 传入农历日期数字返回汉字表示法

* @param lunar day

* @return Cn string

* @eg:var cnDay = calendar.toChinaDay(21) ;//cnMonth='廿一'

*/

function toChinaDay(d) { // 日 => \u65e5

  var s

  switch (d) {

    case 10:

      s = '\u521d\u5341'

      break

    case 20:

      s = '\u4e8c\u5341'

      break

    case 30:

      s = '\u4e09\u5341'

      break

    default:

      s = nStr2[Math.floor(d / 10)]

      s += nStr1[d % 10]

  }

  return (s)

}



/**

* 年份转生肖[!仅能大致转换] => 精确划分生肖分界线是“立春”

* @param y year

* @return Cn string

* @eg:var animal = calendar.getAnimal(1987) ;//animal='兔'

*/

function getAnimal(y) {

  return Animals[(y - 4) % 12]

}



/**

* 传入阳历年月日获得详细的公历、农历object信息 <=>JSON

* @param y  solar year

* @param m  solar month

* @param d  solar day

* @return JSON object

* @eg:console.log(calendar.solar2lunar(1987,11,01));

*/

function solar2lunar(y, m, d) { // 参数区间1900.1.31~2100.12.31

  // 年份限定、上限

  if (y < 1900 || y > 2100) {

    return -1 // undefined转换为数字变为NaN

  }

  // 公历传参最下限

  if (y === 1900 && m === 1 && d < 31) {

    return -1

  }

  // 未传参  获得当天

  var objDate = null

  if (!y) {

    objDate = new Date()

  } else {

    objDate = new Date(y, parseInt(m) - 1, d)

  }

  var i

  var leap = 0

  var temp = 0

  // 修正ymd参数

  y = objDate.getFullYear()

  m = objDate.getMonth() + 1

  d = objDate.getDate()

  var offset = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(1900, 0, 31)) / 86400000

  for (i = 1900; i < 2101 && offset > 0; i++) {

    temp = lYearDays(i)

    offset -= temp

  }

  if (offset < 0) {

    offset += temp; i--

  }



  // 是否今天

  var isTodayObj = new Date()

  var isToday = false

  if (isTodayObj.getFullYear() === y && isTodayObj.getMonth() + 1 === m && isTodayObj.getDate() === d) {

    isToday = true

  }

  // 星期几

  var nWeek = objDate.getDay()

  var cWeek = nStr1[nWeek]

  // 数字表示周几顺应天朝周一开始的惯例

  if (nWeek === 0) {

    nWeek = 7

  }

  // 农历年

  var year = i

  leap = leapMonth(i) // 闰哪个月

  var isLeap = false



  // 效验闰月

  for (i = 1; i < 13 && offset > 0; i++) {

    // 闰月

    if (leap > 0 && i === (leap + 1) && isLeap === false) {

      --i

      isLeap = true; temp = leapDays(year) // 计算农历闰月天数

    } else {

      temp = monthDays(year, i)// 计算农历普通月天数

    }

    // 解除闰月

    if (isLeap === true && i === (leap + 1)) { isLeap = false }

    offset -= temp

  }

  // 闰月导致数组下标重叠取反

  if (offset === 0 && leap > 0 && i === leap + 1) {

    if (isLeap) {

      isLeap = false

    } else {

      isLeap = true; --i

    }

  }

  if (offset < 0) {

    offset += temp; --i

  }

  // 农历月

  var month = i

  // 农历日

  var day = offset + 1

  // 天干地支处理

  var sm = m - 1

  var gzY = toGanZhiYear(year)



  // 当月的两个节气

  // bugfix-2017-7-24 11:03:38 use lunar Year Param `y` Not `year`

  var firstNode = getTerm(y, (m * 2 - 1)) // 返回当月「节」为几日开始

  var secondNode = getTerm(y, (m * 2)) // 返回当月「节」为几日开始



  // 依据12节气修正干支月

  var gzM = toGanZhi((y - 1900) * 12 + m + 11)

  if (d >= firstNode) {

    gzM = toGanZhi((y - 1900) * 12 + m + 12)

  }

  // 传入的日期的节气与否

  var isTerm = false

  var Term = null

  if (firstNode === d) {

    isTerm = true

    Term = solarTerm[m * 2 - 2]

  }

  if (secondNode === d) {

    isTerm = true

    Term = solarTerm[m * 2 - 1]

  }

  // 日柱 当月一日与 1900/1/1 相差天数

  var dayCyclical = Date.UTC(y, sm, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10

  var gzD = toGanZhi(dayCyclical + d - 1)

  // 该日期所属的星座

  var astro = toAstro(m, d)

  return { 'lYear': year, 'lMonth': month, 'lDay': day, 'Animal': getAnimal(year), 'IMonthCn': (isLeap ? '\u95f0' : '') + toChinaMonth(month), 'IDayCn': toChinaDay(day), 'cYear': y, 'cMonth': m, 'cDay': d, 'gzYear': gzY, 'gzMonth': gzM, 'gzDay': gzD, 'isToday': isToday, 'isLeap': isLeap, 'nWeek': nWeek, 'ncWeek': '\u661f\u671f' + cWeek, 'isTerm': isTerm, 'Term': Term, 'astro': astro }

}





var calendarFormatter = {

  // 传入阳历年月日获得详细的公历、农历object信息 <=>JSON

  solar2lunar: function (y, m, d) { // 参数区间1900.1.31~2100.12.31

    return solar2lunar(y, m, d)

  },

  /**

  * 传入农历年月日以及传入的月份是否闰月获得详细的公历、农历object信息 <=>JSON

  * @param y  lunar year

  * @param m  lunar month

  * @param d  lunar day

  * @param isLeapMonth  lunar month is leap or not.[如果是农历闰月第四个参数赋值true即可]

  * @return JSON object

  * @eg:console.log(calendar.lunar2solar(1987,9,10));

  */

  lunar2solar: function (y, m, d, isLeapMonth) { // 参数区间1900.1.31~2100.12.1

    isLeapMonth = !!isLeapMonth

    if (isLeapMonth && (leapMonth !== m)) { return -1 }// 传参要求计算该闰月公历 但该年得出的闰月与传参的月份并不同

    if (y === 2100 && m === 12 && d > 1 || y === 1900 && m === 1 && d < 31) { return -1 } // 超出了最大极限值

    var day = monthDays(y, m)

    var _day = day

    // bugFix 2016-9-25

    // if month is leap, _day use leapDays method

    if (isLeapMonth) {

      _day = leapDays(y, m)

    }

    if (y < 1900 || y > 2100 || d > _day) { return -1 }// 参数合法性效验



    // 计算农历的时间差

    var offset = 0

    for (var i = 1900; i < y; i++) {

      offset += lYearDays(i)

    }

    var leap = 0

    var isAdd = false

    for (i = 1; i < m; i++) {

      leap = leapMonth(y)

      if (!isAdd) { // 处理闰月

        if (leap <= i && leap > 0) {

          offset += leapDays(y); isAdd = true

        }

      }

      offset += monthDays(y, i)

    }

    // 转换闰月农历 需补充该年闰月的前一个月的时差

    if (isLeapMonth) { offset += day }

    // 1900年农历正月一日的公历时间为1900年1月30日0时0分0秒(该时间也是本农历的最开始起始点)

    var stmap = Date.UTC(1900, 1, 30, 0, 0, 0)

    var calObj = new Date((offset + d - 31) * 86400000 + stmap)

    var cY = calObj.getUTCFullYear()

    var cM = calObj.getUTCMonth() + 1

    var cD = calObj.getUTCDate()

    return solar2lunar(cY, cM, cD)

  }

}

/* 农历转换 end */

//----------------------------------------------------------------

/* 节日弹窗 start */
var d = new Date();
m = d.getMonth() + 1;
dd = d.getDate();
y = d.getFullYear();

// 公祭日
if (m == 9 && dd == 18) {
  document.getElementsByTagName("html")[0].setAttribute("style", "filter: grayscale(60%);");
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("今天是九一八事变" + (y - 1931).toString() + "周年纪念日\n🪔勿忘国耻，振兴中华🪔");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 7 && dd == 7) {
  document.getElementsByTagName("html")[0].setAttribute("style", "filter: grayscale(60%);");
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("今天是卢沟桥事变" + (y - 1937).toString() + "周年纪念日\n🪔勿忘国耻，振兴中华🪔");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 12 && dd == 13) {
  document.getElementsByTagName("html")[0].setAttribute("style", "filter: grayscale(60%);");
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("今天是南京大屠杀" + (y - 1937).toString() + "周年纪念日\n🪔勿忘国耻，振兴中华🪔");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 8 && dd == 14) {
  document.getElementsByTagName("html")[0].setAttribute("style", "filter: grayscale(60%);");
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("今天是世界慰安妇纪念日\n🪔勿忘国耻，振兴中华🪔");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}


// 节假日
if (m == 10 && dd <= 3) {//国庆节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("祝祖国" + (y - 1949).toString() + "岁生日快乐！");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 8 && dd == 15) {//搞来玩的，小日子投降
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("小日子已经投降" + (y - 1945).toString() + "年了😃");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 1 && dd == 1) {//元旦节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire(y.toString() + "年元旦快乐！🎉");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 3 && dd == 8) {//妇女节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("各位女神们，妇女节快乐！👩");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
l = ["非常抱歉，因为不可控原因，博客将于明天停止运营！", "好消息，日本没了！", "美国垮了，原因竟然是川普！", "微软垮了！", "你的电脑已经过载，建议立即关机！", "你知道吗？站长很喜欢你哦！", "一分钟有61秒哦", "你喜欢的人跟别人跑了！"]
if (m == 4 && dd == 1) {//愚人节，随机谎话
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire(l[Math.floor(Math.random() * l.length)]);
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 5 && dd == 1) {//劳动节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("劳动节快乐\n为各行各业辛勤工作的人们致敬！");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 5 && dd == 4) {//青年节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("青年节快乐\n青春不是回忆逝去,而是把握现在！");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 5 && dd == 20) {//520
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("今年是520情人节\n快和你喜欢的人一起过吧！💑");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 7 && dd == 1) {//建党节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("祝中国共产党" + (y - 1921).toString() + "岁生日快乐！");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 9 && dd == 10) {//教师节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("各位老师们教师节快乐！👩‍🏫");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 12 && dd == 25) {//圣诞节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("圣诞节快乐！🎄");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 6 && dd == 12) {//站长生日
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("祝站长" + (y - 2003).toString() + "岁生日快乐！🐏🎂");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (y ==2027 && m == 7 && dd == 30) {//域名快到期了
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("感谢一路陪伴，下个域名再见！");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}

//传统节日部分

if ((y == 2023 && m == 4 && dd == 5) || (y == 2024 && m == 4 && dd == 4) || (y == 2025 && m == 4 && dd == 4)) {//清明节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("清明时节雨纷纷,一束鲜花祭故人💐");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if ((y == 2023 && m == 12 && dd == 22) || (y == 2024 && m == 12 && dd == 21) || (y == 2025 && m == 12 && dd == 21)) {//冬至
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("冬至快乐\n快吃上一碗热热的汤圆和饺子吧🧆");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}

var lunar = calendarFormatter.solar2lunar();

//农历采用汉字计算，防止出现闰月导致问题

if ((lunar["IMonthCn"] == "正月" && lunar["IDayCn"] == "初六") || (lunar["IMonthCn"] == "正月" && lunar["IDayCn"] == "初五") || (lunar["IMonthCn"] == "正月" && lunar["IDayCn"] == "初四") || (lunar["IMonthCn"] == "正月" && lunar["IDayCn"] == "初三") || (lunar["IMonthCn"] == "正月" && lunar["IDayCn"] == "初二") || (lunar["IMonthCn"] == "正月" && lunar["IDayCn"] == "初一") || (lunar["IMonthCn"] == "腊月" && lunar["IDayCn"] == "三十") || (lunar["IMonthCn"] == "腊月" && lunar["IDayCn"] == "廿九")) {
  //春节，本来只有大年三十到初六，但是有时候除夕是大年二十九，所以也加上了
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire(y.toString() + "年新年快乐\n🎊祝你心想事成，诸事顺利🎊");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if ((lunar["IMonthCn"] == "正月" && lunar["IDayCn"] == "十五")) {
  //元宵节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("元宵节快乐\n送你一个大大的灯笼🧅");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if ((lunar["IMonthCn"] == "五月" && lunar["IDayCn"] == "初五")) {
  //端午节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("端午节快乐\n请你吃一条粽子🍙");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if ((lunar["IMonthCn"] == "七月" && lunar["IDayCn"] == "初七")) {
  //七夕节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("七夕节快乐\n黄昏后,柳梢头,牛郎织女来碰头");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if ((lunar["IMonthCn"] == "八月" && lunar["IDayCn"] == "十五")) {
  //中秋节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("中秋节快乐\n请你吃一块月饼🍪");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if ((lunar["IMonthCn"] == "九月" && lunar["IDayCn"] == "初九")) {
  //重阳节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("重阳节快乐\n独在异乡为异客，每逢佳节倍思亲");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}

// 切换主题提醒
// if (y == 2022 && m == 12 && (dd >= 18 && dd <= 20)) {
//     if (sessionStorage.getItem("isPopupWindow") != "1") {
//         Swal.fire("网站换成冬日限定主题啦⛄");
//         sessionStorage.setItem("isPopupWindow", "1");
//     }
// }


/* 节日弹窗 end */

//----------------------------------------------------------------
