angular.module('test').controller('testController', function(){
    var self = this;
    self.test = function(){
        console.log(self.val);
    };

    self.val = 'test value';
});
