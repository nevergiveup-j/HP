# jQuery-Popup 弹层 插件


### 先引入jQuery 框架
-----------------------

    <script src="http://code.jquery.com/jquery-1.8.3.min.js"></script>

### 引用jQuery.share插件
-----------------------

    <script src="jquery.popup.js"></script>
    
### 弹层 $.popup说明
-----------------------

    $(elem).popup(options, callback);
    
#### $(elem)<code>Object</code> 参数弹层内容

简单demo:<br />
    
    $('.hp-popup').popup();
    
#### options<code>Object</code> 弹层配置
appendTo <code>String</code> 可选，加载位置（默认：body）<br />
escClose <code>Boolean</code> 可选，按ESC关闭弹层 <br />
position <code>Array</code> 可选，弹层定位位置（默认：居中）<br />
positionManner <code>String</code> 可选，定位方式（默认：fixed） <br />
mask <code>Boolean</code> 可选，是否显示遮罩层（默认：true） <br />
opacity <code>String</code> 可选，遮罩层透明度 (默认：0.7)<br />
maskClose <code>String</code> 可选，遮罩层背景颜色（默认：#000） <br />
zIndex <code>String</code> 可选，定位层级（默认：999） <br />
onOpenCallback <code>Function</code> 可选，显示弹层回调函数 <br />
onCloseCallback <code>Function</code> 可选，关闭弹层回调函数 <br /> 


options demo:<br />

    $('.hp-popup').popup({});
    
### 附加功能事件
-----------------------
自定义关闭弹出层

    $('.hp-popup').trigger('close');
    
// 刷新定位

    $('.hp-popup').trigger('refresh');
