# jQuery-Share 分享到 插件
让分享插件开发更简单，分享到:新浪微博、腾讯微博、QQ空间、人人网、微信、QQ
两个插件Share API 


### 先引入jQuery 框架
-----------------------

    <script src="http://code.jquery.com/jquery-1.8.3.min.js"></script>

### 引用jQuery.share插件
-----------------------

    <script src="jquery.share.js"></script>

如果需要调用微信分享，先引入qrcod.js 生成二维码

    <link rel="stylesheet" href="jquery.share.css">
    <script src="qrcode/qrcode.min.js"></script>
    
### 分享 $.shraeAPI说明
-----------------------

    $.shareAPI(site, options, channel});
    
    
#### site<code>string</code> 分享类型 *必写
默认参数：<br />
<code>weibo</code>新浪微博、<code>tqq</code>腾讯微博、<code>qzone</code>QQ空间、<code>renren</code>人人网、<code>qq</code>QQ分享、<code>weixin</code>微信<br />

自定义参数：

demo：<br />
    
    $.shareAPI('weibo');
    
#### options<code>object</code> 分享配置
<code>title</code> 可选，分享标题（默认获取当前页面标题）<br />
<code>url</code> 可选，分享链接（默认当前地址）<br />
<code>pic</code> 可选，分享图片的路径, 使用多张图片以||隔开[a.jpg||b.jpg]<br />
<code>summary</code> 可选，分享摘要<br />
<code>site</code> 可选，分享来源 (默认根据<code>channel</code>参数为虎扑体育,只有QQ空间、QQ需要)<br />
<code>desc</code> 可选，分享理由 (只有QQ需要)<br />
<code>searchPic</code> 可选，自动抓取页面上的图片 (默认true，只有新浪微博)<br />
<code>buttons</code> 可选，设置按扭<code>object</code><br />

demo：<br />

    $.shareAPI('weibo', {
        title: '虎扑体育 - 你的体育全世界！',
        url: 'http://www.hupu.com',
        pic: 'a.jpg',
        summary '媒评最差11人西班牙4席',
        site: '虎扑体育',
        desc: '这个球不错',
        searchPic: true,
        buttons: {
            'weibo': {
                url: 'http://service.weibo.com/share/share.php?url={url}&title={title}&pic={pic}&appkey={appkey}&ralateUid={ralateUid}&searchPic={searchPic}'
            }
        }
    }});
    
    
#### channel<code>string</code> 频道名，用于分享来源
参数说明：<code>basketball</code>篮球频道、<code>soccer</code>足球频道、<code>racing</code>赛车频道、<code>voice</code>虎扑新声频道,默认值为综合<code>sports</code><br />

demo:<br />

    $.shareAPI('weibo', {}, 'soccer');

如参数<code>options</code>不需要使用，可以使用如下：

    $.shareAPI('weibo', 'soccer');
