/**
 * @Description: jQuery 分享到 插件
 * @Author: wangjun
 * @Update: 2014-12-18 19:00
 * @version: 1.0
 * @Github URL: https://github.com/nevergiveup-j/HP/tree/master/share
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
    	shareConfig: {
    		// 标题
	    	title: document.title,
	    	// 链接
	    	url: window.location.href,
	    	// 图片路径，使用多张图片以||隔开[a.jpg||b.jpg] bug 多张不一样
	    	pic: '',
	    	// 分享摘要
	    	summary: '',
	    	// 分享理由 (QQ)
	    	desc: '',
	    	// 自动抓取页面上的图片 (新浪微博)
	    	searchPic: true,
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
	    	}
    	},
    	// 设置按扭
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
    }


	function ShareTo( $elem, options ) {
		this.$elem = $elem;

		if ( !this.$elem.length ) {
			return;
		};

		this.options = $.extend(true,{}, defaults, options || {});
		this.options.social = options.social || defaults.social;

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
					arrayData.push( '<a href="javascript:" data-type="'+ list +'" class="btn-share btn-share-'+ data.className +'" title="'+ data.text +'">'+ data.text +'</a>' );
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

				new ShareAPI( site, config );
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
	 */
	var ShareAPI = function( site, options ) {

		// 分享配置
		var config = defaults.shareConfig;
			config.buttons = defaults.buttons;

		var opts = $.extend(true,{}, config, options || {}),
			title = encodeURIComponent( opts.title ),
			url = encodeURIComponent( opts.url ),
			pic = opts.pic,
			summary = encodeURIComponent( opts.summary ),
			desc = encodeURIComponent( opts.desc ),
			sites = encodeURIComponent( opts.source.site ),
			appkey = Converted( opts.source.appkey.weibo, opts.source.appkey.tqq ),
			ralateUid = Converted( opts.source.ralateUid.weibo, opts.source.ralateUid.tqq );


		// 无分享类型
		if ( typeof opts.buttons[ site ] === "undefined" ) {
			return;
		};

		// 新浪微博分享使用多张图片路径
		var piaArray = pic.split('||');

		if ( piaArray.length > 1 && site !== 'weibo' ) {
			pic = piaArray[0];
		};

		pic = encodeURIComponent( pic );


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

		var width = 600,
			height = 500,
			screenTop = ( window.screen.availHeight - 30 - height ) / 2,
			screenLeft = ( window.screen.availWidth - 10 - width ) / 2,
			features = '';

		// QQ分享全屏
		if ( site !== 'qq' ) {
			features = 'scrollbars=no,width=' + width + ',height=' + height + ',left=' + screenLeft + ',top=' + screenTop + ',status=no,resizable=yes';  
		}

		var sitesURL = opts.buttons[ site ]['url'].replace('{url}', url).replace('{title}', title)
												  .replace('{pic}', pic).replace('{appkey}', appkey)
												  .replace('{ralateUid}', opts.ralateUid).replace('{summary}', summary)
												  .replace('{site}', sites).replace('{desc}', desc)
												  .replace('{searchPic}', opts.searchPic);

		if ( site === 'weixin' ) {
			PopLayer.init({
				title: '打开微信“扫一扫”<br />打开网页后点击屏幕右上角分享按钮',
				content: '<p style="width:162px;height:162px;margin:0 auto;text-align:center;padding:20px 0 45px;" id="J_qrcodeWeixin"></p>'
			});

			// 生成weixin二维码
			var qrcode = new QRCode("J_qrcodeWeixin", {
			    text: opts.url,
			    width: 162,
			    height: 162
			});
		} else {
			window.open(sitesURL, site, features);
		}

	};

	/**
	 * 弹出层,目前用于微信
	 */
	var PopLayer = {
		init: function( options ) {
			var that = this;

			that.options = options;
			that.T_RESIZE = null;
			that.$win = $(window);
			that.$body = $('body');

			that.render();
			that.bind();
		},
		render: function() {
			var that = this;

			var pop_tpl = [
				'<div class="hp-share-mask" id="J_hp_share_mask"></div>',
				'<div id="J_hp_popShare" class="hp-pop-share">',
				    '<div class="hd">',
				        '<h3>',
				        	that.options.title,
				        '</h3>',
                        '<a href="javascript:" class="btn-close">×</a>',
				    '</div>',
				    '<div class="bd">',
				    	that.options.content,
				    '</div>',
				'</div>'
    		].join('');

    		that.$body.append( pop_tpl );

    		that.$mask = $('#J_hp_share_mask')
    		that.$popLayer = $('#J_hp_popShare');
    		that.$btnClose = that.$popLayer.find('.btn-close');

    		that.setResizeSize();
			
		},
		bind: function() {
			var that = this;

			$(document).bind('keydown', 'esc', function ( event ) { 
    			that.hide();
    		});

    		that.$mask.bind('click', function(){
    			that.hide();
    		});

			that.$btnClose.bind('click', function() {
				that.hide();
			});

			that.$win.bind('resize', function() {
				that.T_RESIZE = setTimeout(function() {
					that.setResizeSize();
				}, 200)
			});

		},
		hide: function() {
			var that = this;

			clearTimeout( that.T_RESIZE );

			$(document).unbind();

			that.$mask.unbind().fadeOut('fast', function(){
				$(this).remove();
			});

    		that.$popLayer.addClass('voice-pop-in-share').fadeOut('fast', function(){
				$(this).remove();
			});
		},
		setResizeSize: function() {
			var that = this,
				bodyHeight = Math.max(document.body.clientHeight, document.body.offsetHeight, document.documentElement.clientHeight),
				getPos = that.getPosCenter();

			that.$mask.css({
				display : 'block',
				width : '100%',
				height : bodyHeight
			});

			that.$popLayer.css({
            	position : 'absolute',
                top : getPos.top,
                left : getPos.left
            }).show();
		},
		getPosCenter: function() {
			var that = this,
                getViewWidth = that.$win.width(),
                getViewHeight = that.$win.height(),
                getSrollTop = that.$win.scrollTop(),
                getSrollLeft = that.$win.scrollLeft(),
                width = that.$popLayer.width(),
                height = 300,
                top = getSrollTop + (getViewHeight - height) / 2,
                left = getSrollLeft + (getViewWidth - width) / 2;

            return {
                top : top,
                left : left,
                viewWidth : getViewWidth
            }
		}
	}


	$.extend({
		shareAPI: function( site, options ) {
			new ShareAPI( site, options );
		}
	});

	$.shareAPI.version =  '1.0.1';

	$.fn.share = function( options ) {

		return this.each(function() {
			var $this = $(this);

			new ShareTo( $this, options );
		})
	};

	// ADM 
	return {
		ShareAPI: ShareAPI,
		share: ShareTo
	};
}));
