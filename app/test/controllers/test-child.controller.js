angular.module('test').controller('testChildController', function(){
    var self = this;
    self.test = function(){
        console.log(self.val);
    };

    self.val = 'submit';
});
