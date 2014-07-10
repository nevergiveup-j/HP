#jQuery-Share 分享到 插件 #
让分享插件开发更简单，分享到:新浪微博、腾讯微博、QQ空间、人人网、微信、QQ
两个插件Share API 


###分享 API使用###
===

    $.shareAPI(type, {
        url: 'http://voice.hupu.com/my',
        title: '1212',
        buttons: {
            'weibo': {
                url: 'http://service.weibo.com/share/share.php?url={url}&amp;title={title}'
            }
        }
    });

