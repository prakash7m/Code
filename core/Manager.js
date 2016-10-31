Code.Manager = Code.Observable.extend({
    FPS: 30,
    speed: 10,
    constructor: function(){
        this.base.apply(this,arguments);
        this.init();        
    },
    init: function(){
        this.initResources();
        this.xOffset = 0;
        this.yOffset = 0;
        Code.KeyEvent.startListening();
    },
    start: function(scene){
        var me = this;
        this.scene = scene;
        window.requestAnimFrame = (function() {
            return window.requestAnimationFrame ||
                   window.webkitRequestAnimationFrame ||
                   window.mozRequestAnimationFrame ||
                   window.oRequestAnimationFrame ||
                   window.msRequestAnimationFrame ||
                   function( /* function */ callback, /* DOMElement */ element) {
                       window.setTimeout(callback, 1000 / me.FPS);
                   };
        })();
        
        (function animloop(){
            //setTimeout(function() {
                requestAnimFrame(animloop)
                // Drawing code goes here
                me.loop();
            //}, 1000 / me.FPS);
            
        })();
        //this.loop();    
    },
    initResources: function(){
        
    },
    loop: function(){        
        var me = this;
        this.begin = new Date().getTime();
        this.scene.update(this.diff,this.xOffset,this.yOffet);
        this.scene.draw(this.diff,this.xOffset,this.yOffet);
        this.end = new Date().getTime();
        this.diff = this.end-this.begin;
    }
})