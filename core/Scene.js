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