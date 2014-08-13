/**
 * @Description: jQuery 弹出层 插件
 * @Author: wangjun
 * @Update: 2014-8-8 16:00
 * @version: 1.0
 * @Github URL: https://github.com/nevergiveup-j/HP/tree/master/popup
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
        appendTo:         'body',
        // ESC 关闭层
        escClose:          true,
        // 透明度
        opacity:           0.7,
        // x, y
        position:          ['auto', 'auto'],
        // 定位办法
        positionStyle:     'fixed',
        // 显示遮罩层
        mask:              true,
        // 遮罩层,click隐藏层
        maskClose:         true,
        // 遮罩层，背景颜色
        maskColor:         '#000',
        speed:             250,
        zIndex:            999,
        onOpenCallback:    function() {},
        onCloseCallback:   function() {}
    }

    var $doc = $(document),
        $win = $(window);

    function Popup( $this, options, callback ) {

        if ( $.isFunction(options) ) {
            callback = options;
            options = null;
        };

        this.$popup = $($this);

        this.options = $.extend(true, {}, defaults, options || {});
        this.callback = callback;
        this.ID_NUMBER = ($win.data('popup') || 0) + 1;
        this.ID_NAME = 'J_popup_mask_' + this.ID_NUMBER;
        this.T_RESIZE = null;

        this.triggerCall(this.options.onOpenCallback);

        this.init();
    };

    Popup.prototype = {
        version: '1.0',
        init: function() {
            var that = this;

            $win.data('popup', that.ID_NUMBER);

            that.render();
            that.bind();

        },
        render: function() {
            var that = this;

            if ( that.options.mask ) {
                $('<div class="hp-popup-mask '+ that.ID_NAME +'"></div>')
                .css({
                    'background-color': that.options.maskColor,
                    'position': 'fixed',
                    'top': 0,
                    'right': 0,
                    'bottom': 0,
                    'left': 0,
                    'opacity': 0,
                    'cursor': 'pointer',
                    'z-index': that.options.zIndex + that.ID_NUMBER
                })
                .appendTo(that.options.appendTo)
                .fadeTo(that.options.speed, that.options.opacity);
            }

            that.$popup
                .data('id', that.ID_NUMBER)
                .css({
                    'position': that.options.positionStyle || 'absolute',
                    'z-index': that.options.zIndex + that.ID_NUMBER + 1
                }).each(function() {
                    $(this).appendTo(that.options.appendTo);
                });

            var calcPosition = that.calcPosition();

            that.$popup.css({
                top: calcPosition.fixedVPos,
                left: calcPosition.fixedHPos
            });

            that.$popup.stop().fadeTo(that.options.speed, 1);

            that.onCompleteCallback(true);
        },
        calcPosition: function() {
            var getViewWidth = $win.width(),
                getViewHeight = $win.height(),
                fixedVPos = this.options.position[1],
                fixedHPos = this.options.position[0];

                if (this.options.position[1] === 'auto') {
                    fixedVPos = Math.max(0, ((getViewHeight - this.$popup.outerHeight(true)) / 2));
                }

                if (this.options.position[0] === 'auto') {
                    fixedHPos = (getViewWidth - this.$popup.outerWidth(true)) / 2;
                }

            return {
                fixedVPos : fixedVPos,
                fixedHPos : fixedHPos
            }
        },
        /**
         * 绑定事件
         */
        bind: function() {
            var that = this;

            if ( that.options.maskClose ) {
                $('.' + that.ID_NAME).bind('click', function() {
                    that.close();
                });
            }

            // esc
            if ( that.options.escClose ) {
                $doc.bind('keydown.' + that.ID_NUMBER, function(event) {
                    if ( event.which === 27 ) {
                        that.close();
                    }
                })
            }
            
            $win.bind('resize.' + that.ID_NUMBER, function() {
                that.reposition();
            });

        },
        /**
         * 取消绑定
         */
        unbind: function() {
            var that = this,
                ID = $win.data('popup') - 1;

            $('.' + that.ID_NAME).unbind('click');
            $doc.unbind('keydown.' + that.ID_NUMBER);
            $win.data('popup', (ID > 0) ? ID : null);
        },
        /**
         * 关闭层
         */
        close: function() {
            var that = this;

            if ( that.options.mask ) {
                $('.' + that.ID_NAME).fadeTo(that.options.speed, 0, function() {
                    $(this).remove();
                })
            }

            that.unbind();

            that.$popup.stop().fadeTo(that.options.speed, 0, function() {
                $(this).hide();
                that.onCompleteCallback();
            });

            return false;
        },
        /**
         * 完成回调
         */
        onCompleteCallback: function( state ) {
            if ( state ) {
                this.triggerCall(this.callback);
            } else {
                this.triggerCall(this.options.onCloseCallback);
            }
        },
        /**
         * 重新定位
         */
        reposition: function() {
            var that = this,
                calcPosition;

            that.T_RESIZE = setTimeout(function() {
                calcPosition = that.calcPosition();

                that.$popup
                    .dequeue()
                    .each(function() {
                        $(this).css({
                            left: calcPosition.fixedHPos, 
                            top: calcPosition.fixedVPos
                        });
                    });
            }, 50);
        },
        triggerCall: function(func, arg) {
            $.isFunction(func) && func.call(this.$popup, arg);
        }
    }

    $.fn.popup = function( options, callback ) {
        return this.each(function() {
            new Popup( this, options, callback );
        })
    };
    
    // ADM 
    return Popup;
}));
