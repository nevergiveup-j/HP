/**
 * @Description: 分享api 插件
 * @Author: wangjun
 * @Update: 2014-07-07 16:00
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

	// 默认配置
    var defaults = {

    }

	function ShareApi( element, options ) {

	};

	ShareApi.prototype = {
		version: '1.0',
		init: function() {

		}
	} 

	$.fn.shareApi = function( options ) {
		options = $.extend(true, {}, defaults, options);

		return this.each(function() {
			var $this = $(this);

			//$this.data('plugin', new ShareApi());
			new ShareApi( $this, options );
		})
	}

	// ADM 
	return ShareApi;
}));