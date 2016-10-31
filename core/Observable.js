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