/**
 * @Description: jQuery 分享到 插件
 * @Author: wangjun
 * @Update: 2014-07-10 16:00
 * @version: 1.0
 * @Github URL: https://github.com/nevergiveup-j
 */

;(function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD模式
        define([ "jquery" ], factory);
    } else {
        // 全局模式
        factory(jQuery);
    }
}(function ($) {
	"use strict";

	// 分享默认配置
    var defaults = {
    	social: ['weibo', 'tqq', 'qzone', 'renren'],
    	theme: 'icon',
    	channel: 'sports',
    	shareConfig: {
    		// 标题
	    	title: document.title,
	    	// 链接
	    	url: window.location.href,
	    	// 图片路径，使用多张图片以||隔开[a.jpg||b.jpg] bug 多张不一样
	    	pic: '',
	    	// 分享摘要
	    	summary: '',
	    	appkey: '',
	    	ralateUid: '',
	    	// 分享来源 (QQ空间、QQ)
	    	site: '',
	    	// 分享理由 (QQ)
	    	desc: '',
	    	// 自动抓取页面上的图片 (新浪微博)
	    	searchPic: true
    	},
    	// 设置按扭
    	buttons: {
    		'weibo': {
    			text: '新浪微博', 
    			className: 'btn-share-weibo', 
    			url: 'http://service.weibo.com/share/share.php?url={url}&title={title}&pic={pic}&appkey={appkey}&ralateUid={ralateUid}&searchPic={searchPic}'
    		},
	    	'tqq': {
	    		text: '腾讯微博', 
	    		className: 'btn-share-tqq', 
	    		url: 'http://v.t.qq.com/share/share.php?url={url}&title={title}&pic={pic}&appkey={appkey}'
	    	},
	    	'qzone': {
	    		text: 'QQ空间', 
	    		className: 'btn-share-qzone', 
	    		url: 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={url}&title={title}&pics={pic}&summary={summary}&site={site}'
	    	},
	    	'renren': {
	    		text: '人人网', 
	    		className: 'btn-share-renren', 
	    		url: 'http://widget.renren.com/dialog/share?link={url}&title={title}&pic={pic}'
	    	},
	    	'qq': {
	    		text: 'QQ', 
	    		className: 'btn-share-qq', 
	    		url: 'http://connect.qq.com/widget/shareqq/index.html?url={url}&title={title}&pics={pic}&summary={summary}&desc={desc}&site={site}'
	    	},
	    	'weixin': {
	    		text: '微信', 
	    		className: 'btn-share-weixin', 
	    		url: ''
	    	}
    	}
    }


	function ShareTo( $elem, options ) {
		this.$elem = $elem;

		if ( !this.$elem.length ) {
			return;
		};

		this.options = $.extend({}, defaults, options);

		this.init();
	};

	ShareTo.prototype = {
		version: '1.0',
		init: function() {
			var that = this;

			that.render();

			that.$list = that.$elem.find('.btn-share');

			that.bind();
		},
		render: function() {
			var that = this,
				social = that.options.social,
				data = null,
				arrayData = ['<div class="hp-shareTo-inner">'];

			for ( var list in social ) {
				list = social[list];
				data = that.options.buttons[list];

				if ( typeof data !== "undefined" ) {
					arrayData.push( '<a href="javascript:" data-type="'+ list +'" class="btn-share '+ data.className +'" title="'+ data.text +'">'+ data.text +'</a>' );
				}
				
			};

			arrayData.push('</div>');

			that.$elem.append( arrayData.join('') );
		},
		bind: function() {
			var that = this,
				site = null,
				config = that.options.shareConfig;
				config.buttons = that.options.buttons;

			that.$list.bind('click', function() {
				site = $(this).data('type');

				new ShareAPI( site, config, that.options.channel );
			})
		}
	}

	/**
	 * 分享API
	 * @param  {string}  site        类型(*必写)
	 * @param  {object}  options     分享配置
	 * @config {string}  [title]     可选，分享标题
	 * @config {string}  [url]       可选，分享链接
	 * @config {string}  [pic]       可选，分享图片的路径。使用多张图片以||隔开[a.jpg||b.jpg] bug 多张不一样
	 * @config {string}  [summary]   可选，分享摘要
	 * @param  {string}  channel     频道名
	 */
	var ShareAPI = function( site, options, channel ) {

		if ( !$.isPlainObject( options ) ) {
			channel = options;
			options = null;
		};

		// 分享配置
		var config = defaults.shareConfig;
			config.buttons = defaults.buttons;

		var opts = $.extend(true,{}, config, options || {}),
			title = encodeURIComponent( opts.title ),
			url = encodeURIComponent( opts.url ),
			pic = encodeURIComponent( opts.pic ),
			summary = encodeURIComponent( opts.summary ),
			desc = encodeURIComponent( opts.desc ),
			siteName = '虎扑体育',
			appkey = Converted( '2175967801', 'abe3b0bfec0044ea852fbf1456497950' ),
			ralateUid = Converted( '1937280734', '@the_real_hoopchina' );

		// 类型appkey
		function Converted( weibo, tqq ) {
			var newAppkey = '';

			if ( site === 'tqq' ) {
				newAppkey = tqq;
			} else {
				newAppkey = weibo;
			}

			return newAppkey;
		}

		switch( channel ) {
			// 篮球
			case "basketball":
			case "nba":
			case "cba":
				siteName = '虎扑篮球';
				ralateUid = Converted( '1642292081', '@the_real_hoopchina' );

				break;
			// 足球
			case "soccer":
				siteName = '虎扑足球';
				appkey = Converted( '1104732554', '3a152727fa2d4926bf9e82bc76e32360' );
				ralateUid = Converted( '1698513182', '@goalhi4u' );

				break;
			// 赛车
			case "f1":
			case "racing":
				siteName = '虎扑赛车';
				appkey = Converted( '2175967801', '788d3087f3844146af2a051dfcaa9ceb' );
				ralateUid = Converted( '1750778357', '@the_real_hoopchina' );

				break;
			// 新声
			case "voice":
				siteName = '虎扑新声';
				appkey = Converted( '1414486651', '801094981' );
				ralateUid = Converted( '1841109261', '@the_real_hoopchina' );

				break;
			default:
				break;
		};

		var sites = encodeURIComponent( opts.site || siteName ),
			width = 600,
			height = 500,
			screenTop = ( window.screen.availHeight - 30 - height ) / 2,
			screenLeft = ( window.screen.availWidth - 10 - width ) / 2,
			features = 'scrollbars=no,width=' + width + ',height=' + height + ',left=' + screenLeft + ',top=' + screenTop + ',status=no,resizable=yes';  


		var sitesURL = opts.buttons[ site ]['url'].replace('{url}', url).replace('{title}', title)
												  .replace('{pic}', pic).replace('{appkey}', appkey)
												  .replace('{ralateUid}', opts.ralateUid).replace('{summary}', summary)
												  .replace('{site}', sites).replace('{desc}', desc)
												  .replace('{searchPic}', opts.searchPic);


		// console.log(sitesURL);									
		window.open(sitesURL, site, features);

	};



	$.extend({
		shareAPI: function( site, options, channel ) {
			new ShareAPI( site, options, channel );
		}
	});

	$.shareAPI.version =  '1.0';

	$.fn.share = function( options ) {

		return this.each(function() {
			var $this = $(this);

			new ShareTo( $this, options );
		})
	};

	// ADM 
	return ShareAPI;
}));

// http://plugins.in1.com/share/demo
// https://github.com/iatek/jquery-share/blob/master/jquery.share.js

// http://tolgaergin.com/files/social/index.html#
// http://tolgaergin.com/files/social/assets/javascripts/socialShare.js
// 
// https://github.com/Julienh/Sharrre/blob/master/jquery.sharrre.js
// jquery share To 插件