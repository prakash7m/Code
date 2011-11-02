var Code = Code || {
    apply: function(first,second){
        for(var i in second){
            first[i] = second[i];
        }
        return first;
    },
    newClass: function(config){
        return function(){
            var fn = function(){};
            if(config.extend){
                fn.prototype = new config.extend(arguments);
                delete(config.extend);
            }           
            obj = new fn();
            if(obj.constructor){
                //obj.constructor.apply(obj,arguments);
            }
            obj = Code.apply(obj,config);
            
            if(config.features){
                Code.applyFeatures(obj,config.features);
                delete(config.features);
            }
            if(obj.constructor){
                obj.constructor.apply(obj,arguments);   
            }
            
            return obj;
        }        
    },
    applyFeatures: function(obj,features){
        if(Code.isArray(config.features)){
            Code.each(config.features,function(f){
                if(typeof(f) != 'function'){
                    obj = new f();
                }
                Code.apply(obj,f);
            });
        }
        return obj;
    },
    isArray: function(arr){
        if(typeof(arr) == 'string' || !arr[0]) return false;
        return true;
    },
    inArray: function(key,stack){
        var ia = false;
        Code.each(stack,function(s){
            if(s == key){
                ia = true;
                return;
            }
        });
        return ia;
    },
    each: function(arr,callback,scope){
        scope = scope || {};
        scope.___each_callback_function___ = callback;
        for(var i=0;i<arr.length;i++){
            scope.___each_callback_function___(arr[i],i);
            delete(scope.___each_callback_function);
        }
    }
}

Code.Observable = Base.extend({
    constructor: function(){
        this.events = [];
        this.executeEvents = [];
        this.base.apply(this,arguments);
    },
    addEvents: function(event){
        if(!Code.isArray(event)){
            event = [event];
        }
        Code.each(event,function(e){
            if(!this.events[e]) this.events.push(e);
        },this);
    },
    fireEvent: function(){
        var args = [];
        var name = arguments[0];
        Code.each(arguments, function(a,i){
            if(i!=0){
                args.push(a);
            }
        });
        var events = this.executeEvents[name] || [];
        Code.each(events, function(e){
            var scope = e[1] || {};
            scope.___fire_callback_function___ = e[0] || function(){}
            scope.___fire_callback_function___.apply(scope,args);
            delete(scope.___fire_callback_function);
        })
        
    },
    on: function(event,callback,scope){
        if(!Code.inArray(event,this.events)) throw "Not registered event "+event;
        this.executeEvents[event] = this.executeEvents[event] || [];
        this.executeEvents[event].push([callback,scope]);
    }
})


Code.Scene = Code.Observable.extend({
    constructor: function(){
        this.width = 800;
        this.height = 300;        
        this.base.apply(this,arguments);
        this.createScene();
    },
    createScene: function(){
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.style.border = "1px solid #eee";
        document.body.appendChild(this.canvas);
        
        this.backgroundCanvas = document.createElement('canvas');
        this.backgroundCanvas.width = this.width;
        this.backgroundCanvas.height = this.height;
        this.backgroundCanvas.style.border = "1px solid #eee";
        this.backgroundCanvas.style.display = "none";
        document.body.appendChild(this.backgroundCanvas);
        this.bgCanvasContext = this.backgroundCanvas.getContext("2d");
        this.context = this.canvas.getContext('2d');
    },
    getCanvas: function(){
        return this.canvas;
    },
    getContext: function(){
        return this.context;    
    },
    getDrawItems: function(){
        return this.items;    
    },
    getHeight: function(){
        return this.height;
    },
    getWidth: function(){
        return this.width;
    },
    add: function(item){        
        if(!Code.isArray(item)){
            item = [item]
        }
        
        this.items = this.items || [];
        Code.each(item,function(i){
            this.items.push(i);
            
        },this)
    },
    update: function(){},
    draw: function(){
        this.bgCanvasContext.clearRect(0,0,this.width,this.height);
        var context = this.bgCanvasContext;
        var items = this.getDrawItems();
        
        //Update the items
        Code.each(items,function(item){
            if(item.update)
            item.update(this,this.bgCanvasContext);
        },this);
        
        
        Code.each(items,function(item){
            if(item.draw)
            item.draw(this,this.bgCanvasContext);
        },this);
        this.getContext().clearRect(0,0,this.width,this.height);
        this.getContext().drawImage(this.backgroundCanvas,0,0);
    }
});


Code.Component = Code.Observable.extend({
    constructor: function(config){
        config = config || {};        
        var dimension = config.dimension || {};
        this.setLeft(dimension.left);
        this.setTop(dimension.top);
        this.setWidth(dimension.width);
        this.setHeight(dimension.height);
        this.base.apply(this,arguments);
    },
    setLeft: function(arg){
        this.left = arg;
        this.calculateDimension();
        return this;
    },
    setTop: function(arg){
        this.top = arg;
        this.calculateDimension();
        return this;
    },
    setImage: function(image){
        this.image = image;
        return this;
    },
    getRight: function(){
        return this.getLeft()+this.getWidth();   
    },
    getLeft: function(){
        return this.left;
    },
    getBottom: function(){
       return this.getTop()+this.getHeight();   
    },
    getTop: function(){
        return this.top;
    },
    getWidth: function(){
        return this.width;
    },
    getHeight: function(){
        return this.height;    
    },
    setWidth: function(w){
        this.width = w;
    },
    setHeight: function(h){
        this.height = h;    
    },
    calculateDimension: function(){
        //this.width = this.getRight()-this.getLeft();
        //this.height = this.getTop()-this.getBottom();
    },
    draw: function(scene,ctx){
        if(this.image){
            ctx.drawImage(img, this.getLeft(), scene.getHeight()-this.getTop())
        }else{
            ctx.fillStyle = "#0000ee";
            var y = scene.getHeight()-this.getBottom();
            ctx.fillRect(this.getLeft(),y,this.getWidth(),this.getHeight());
        }
    }
});
Code.World = Code.Observable.extend({
    gravity:9,
    friction:5,
    constructor: function(){
        
    },
    add: function(){
            
    }
})
Code.KeyEvent = {
    listeners: [],
    addListener: function(obj){
        this.listeners.push(obj);
    },
    startListening: function(){
        document.onkeypress = function(e){
            Code.KeyEvent.fire('keypress',e);
        }
        document.onkeydown = function(e){
            Code.KeyEvent.fire('keydown',e);
        }
        document.onkeyup = function(e){
            Code.KeyEvent.fire('keyup',e);
        }        
    },
    fire: function(name,e){
        for(var i=0;i<this.listeners.length;i++){
            this.listeners[i].fireEvent(name,this.listeners[i],e);    
        }
    }
}
Code.Movables = Code.Component.extend({
    //left,right,still
    xdir:'still',
    acceleration:1,
    constructor:function(){
        this.base.apply(this,arguments);
        this.addEvents(['keypress','keydown','keyup']);
        this.bindKeyListeners();
    },
    update: function(){
        if(this.xdir == 'left') this.setLeft(this.getLeft()-this.acceleration);
        if(this.xdir == 'right') this.setLeft(this.getLeft()+this.acceleration);
        this.checkMovingStyle();
    },
    checkMovingStyle: function(){
        if(this.movingStyle){
            var prop = this.movingStyle.prop;
            switch(this.movingStyle.type){
                case 'fixedRange':
                    if(this.getLeft() < prop.left){
                        this.setLeft(prop.left);
                        this.xdir = 'right';
                    }
                    if(this.getRight() > prop.right){
                        this.setLeft(prop.right-this.getWidth());
                        this.xdir = 'left';
                    }
            }
        }
    },
    bindKeyListeners: function(){
        var me = this;
        Code.KeyEvent.addListener(this);
    }
});
Code.Actor = Code.Movables.extend({
    constructor: function(){
        this.base.apply(this,arguments);
    }
});
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
        this.scene = scene;
        this.loop();    
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
        setTimeout(function(){me.loop()},1000/me.FPS);
    }
})
window.onload = function(){    
    var s = new Code.Scene();
    var c = new Code.Actor({
        dimension:{
            left:100,top:10,width:50,height:50
        },
        acceleration:10
    });
    var one = new Code.Movables({
        dimension:{
            left:200,top:100, width:50, height:50
        },
        acceleration:2,
        movingStyle:{
            type:'fixedRange',
            prop:{
                left:0,right:800
            }
        },
        xdir:'right'
    });
    
    c.on('keydown',function(comp,e){
        if(e.keyCode == 37)
        comp.xdir = 'left'
        
        if(e.keyCode == 38)
        comp.setTop(comp.getTop()+comp.acceleration);
        
        if(e.keyCode == 39)
        comp.xdir = 'right';
        
        if(e.keyCode == 40)
        comp.setTop(comp.getTop()-comp.acceleration);
        
    })
    c.on('keyup',function(comp,e){
        comp.xdir = 'still'
    })
    s.add([one,c]);
    var manager = new Code.Manager();
    manager.start(s);    
}