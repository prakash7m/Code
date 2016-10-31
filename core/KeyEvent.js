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