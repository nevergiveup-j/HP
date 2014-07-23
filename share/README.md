# jQuery-Share 分享到 插件
让分享插件开发更简单，分享到:新浪微博、腾讯微博、QQ空间、人人网、微信、QQ、豆瓣、twitter、facebook<br />
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

    $.shareAPI(site, options});
    
    
#### site<code>string</code> 分享类型 *必写
默认参数：<br />
<code>weibo</code>新浪微博、<code>tqq</code>腾讯微博、<code>qzone</code>QQ空间、<code>renren</code>人人网、<code>qq</code>QQ分享、<code>weixin</code>微信、<code>douban</code>豆瓣、<code>twitter</code>twitter、<code>facebook</code>facebook<br />

自定义参数：
添加<code>twitter</code>类型，需要在<code>options.buttons</code>加上对应的值

	buttons: {
		'twitter': {
			text: 'twitter',
			className: 'twitter',
			url: 'https://twitter.com/share?url={url}&text={title}'
		}
	}

demo：<br />
    
    $.shareAPI('weibo');
    
#### options<code>object</code> 分享配置
<code>title</code> 可选，分享标题（默认获取当前页面标题）<br />
<code>url</code> 可选，分享链接（默认当前地址）<br />
<code>pic</code> 可选，分享图片的路径, 使用多张图片以||隔开[a.jpg||b.jpg]<br />
<code>summary</code> 可选，分享摘要<br />
<code>source</code> 可选，分享来源<code>object</code> <br />

如：<br />

	source: {
        appkey: {
			weibo: '',
			tqq: ''
    	},
    	ralateUid: {
    		weibo: '',
    		tqq: ''
    	},
    	// 分享来源 (QQ空间、QQ)
    	siteName: ''
    }
	
<code>desc</code> 可选，分享理由 (只有QQ需要)<br />
<code>searchPic</code> 可选，新浪微博自动抓取页面上的图片 (默认true)<br />
<code>buttons</code> 可选，设置按扭<code>object</code><br />

如：<br />

	buttons: {
    		'weibo': {
    			text: '新浪微博', 
    			className: 'weibo', 
    			url: 'http://service.weibo.com/share/share.php?url={url}&title={title}&pic={pic}&appkey={appkey}&ralateUid={ralateUid}&searchPic={searchPic}'
    		},
	    	'tqq': {
	    		text: '腾讯微博', 
	    		className: 'tqq', 
	    		url: 'http://v.t.qq.com/share/share.php?url={url}&title={title}&pic={pic}&appkey={appkey}'
	    	},
	    	'qzone': {
	    		text: 'QQ空间', 
	    		className: 'qzone', 
	    		url: 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={url}&title={title}&pics={pic}&summary={summary}&site={site}'
	    	},
	    	'renren': {
	    		text: '人人网', 
	    		className: 'renren', 
	    		url: 'http://widget.renren.com/dialog/share?link={url}&title={title}&pic={pic}'
	    	},
	    	'qq': {
	    		text: 'QQ', 
	    		className: 'qq', 
	    		url: 'http://connect.qq.com/widget/shareqq/index.html?url={url}&title={title}&pics={pic}&summary={summary}&desc={desc}&site={site}'
	    	},
	    	'weixin': {
	    		text: '微信', 
	    		className: 'weixin', 
	    		url: ''
	    	},
	    	'douban': {
	    		text: '豆瓣', 
	    		className: 'douban', 
	    		url: 'http://www.douban.com/share/service?href={url}&name={title}&text={summary}'
	    	},
	    	'twitter': {
	    		text: 'twitter', 
	    		className: 'twitter', 
	    		url: 'https://twitter.com/share?url={url}&text={title}'
	    	},
	    	'facebook': {
	    		text: 'facebook', 
	    		className: 'facebook', 
	    		url: 'http://www.facebook.com/sharer.php?u={url}&t={title}'
	    	}
    	}

demo：<br />

    $.shareAPI('weibo', {
        // 标题
        title: '虎扑体育 - 你的体育全世界！',
        // 链接
        url: 'http://www.hupu.com',
        // 图片路径
        pic: 'a.jpg',
        // 分享摘要
        summary: '媒评最差11人西班牙4席',
        // 分享来源
        source: {
            appkey: {
    			weibo: '',
    			tqq: ''
	    	},
	    	ralateUid: {
	    		weibo: '',
	    		tqq: ''
	    	},
	    	// 分享来源 (QQ空间、QQ)
	    	siteName: ''
        },
        // 分享理由
        desc: '这个球不错',
        // 自动抓取页面上的图片
        searchPic: true,
        // 按扭路径
        buttons: {
            'weibo': {
                url: 'http://service.weibo.com/share/share.php?url={url}&title={title}&pic={pic}&appkey={appkey}&ralateUid={ralateUid}&searchPic={searchPic}'
            }
        }
    }});
    
    
### 分享 $.share();插件
-----------------------

    $('#shrae-newList').share({
    	channel: 'sports',
    	shareConfig: {
    	    title: document.title
    		url: window.location.href
    	},
    	social: ['weibo','tqq', 'qzone', 'renren']
    });
