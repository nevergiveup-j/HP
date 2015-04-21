/** 
 * 首页初始化
 */

/* ie console报错处理  */
!function(){
    if(window['console']){ return; }
    window['console'] = {
        log: function(){}
        ,clear: function(){}
        ,debug: function(){}
        ,error: function(){}
        ,info: function(){}
        ,count: function(){}
        ,time: function(){}
        ,trace: function(){}
        ,warn: function(){}
    }
}();

