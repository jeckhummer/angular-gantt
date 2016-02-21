var debug = false;

var log = function(source, msg){
    if(!!debug){
        var txt = source + (msg != void 0 ? (': ' + JSON.stringify(msg)) : '');
        console.log(txt);
    }
}

var logOpenGroup = function(name){
    if(!!debug){
        console.groupCollapsed(name == void 0 ? '' : name);
    }
}

var logCloseGroup = function(){
    if(!!debug){
        console.groupEnd();
    }
}
