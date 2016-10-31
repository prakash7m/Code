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
        var y = scene.getHeight()-this.getBottom();
        
        var img = new Image();
        var me = this;
        img.src="plane.jpeg";
        this.image = img;
        
        if(this.image){
            ctx.drawImage(this.image, this.getLeft(),y,this.getWidth(),this.getHeight());    
        }else{
            ctx.fillStyle = "#eee";            
            ctx.fillRect(this.getLeft(),y,this.getWidth(),this.getHeight());
        }
    }
});