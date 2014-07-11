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
    
###分享 API说明###
-----------------------

    $.shareAPI(site, options, channel});
    
####参数####
* site 分享类型 （weibo || tqq || qzone || renren || qq || weixin） *必写
* options 分享配置

