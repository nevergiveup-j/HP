# 移动端H5屏幕适配

### 为什么需要适配？

  * 做H5页面适配一般使用百分比
  * 页面使用像素(px)实际尺寸都一样，会出现iphone 6页面太小

## viewport缩放
视觉稿、页面宽度、viewport width<br /> 使用统一宽度，利用浏览器自身缩放完成适配。页面样式（包括图像元素）完全按照视觉稿的尺寸，使用定值单位（px、em）即可完成。

## rem布局

### 什么是rem?
rem 是指相对于根元素 <code>(html)</code> 的字体大小的单位。简单的说它就是一个相对单位。

### px与rem换算
假如默认浏览器16px，16px=1rem<br />
为了方便计算将在 <code>(html)</code> 元素中设置font-size值为10px。<br />
<pre><code>
html {
  font-size: 10px;
}
</code></pre>
chrome文字最小支持12px，将<code><html></code>元素中设置font-size值为100px
<pre><code>
/* 320px布局 */
html {
  font-size: 100px;
}
body {
  font-size: .14rem;
}
</code></pre>
rem计算查看：[http://www.w3cplus.com/css3/define-font-size-with-css3-rem](http://www.w3cplus.com/css3/define-font-size-with-css3-rem)

### 使用JS自适应
<pre><code>
(function(win, doc){
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;

            docEl.style.fontSize = 100 * (clientWidth / 320) + 'px';
        };

        // Abort if browser does not support addEventListener
        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
})(window, document)
</code></pre>

### 示例
[查看DEMO](//codepen.io/nevergiveup/embed/vOaMvB/?height=268&theme-id=17050&default-tab=result)


### rem兼容
<img src="https://github.com/nevergiveup-j/HP/blob/master/mobileAdapter/rem.png" width="70%" />


参照：[web app变革之rem](http://isux.tencent.com/web-app-rem.html)
