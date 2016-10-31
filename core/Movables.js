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