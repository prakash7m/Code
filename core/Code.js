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