#jQuery-Share 分享到 插件 #
让分享插件开发更简单，分享到:新浪微博、腾讯微博、QQ空间、人人网、微信、QQ
两个插件Share API 


###先引入jQuery 框架###
-----------------------

    <script src="http://code.jquery.com/jquery-1.8.3.min.js"></script>

###引用jQuery.share插件###
-----------------------

    <script src="jquery.share.js"></script>

如果需要调用微信分享，先引入qrcod.js 生成二维码

    <link rel="stylesheet" href="jquery.share.css">
    <script src="qrcode/qrcode.min.js"></script>
    
###分享 $.shraeAPI说明###
-----------------------

    $.shareAPI(site, options, channel});
    
####参数####
1. site      {string}  分享类型 （weibo || tqq || qzone || renren || qq || weixin） *必写
2. options   {object}  分享配置 可选<br />
--- title    {string}  分享标题 （默认获取当前页面标题）<br />
--- url      {string}  分享链接  (默认当前地址)<br />
--- pic      {string}  分享图片的路径, 使用多张图片以||隔开[a.jpg||b.jpg]<br />
--- summary  {string}  分享摘要
--- appkey   {}

