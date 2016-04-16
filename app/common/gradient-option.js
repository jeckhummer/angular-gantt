function GradientOption(minValue, maxValue, step, defaultValue){
    var self = this;

    self.inc = inc;
    self.dec = dec;
    self.isMax = isMax;
    self.isMin = isMin;
    self.getValue = getValue;

    init();

    function init(){
        if(defaultValue >= minValue && defaultValue <= maxValue){
            self.value = defaultValue;
        }else{
            throw "Default value must between min and max.";
        }
    }

    function inc(){
        if(self.value < maxValue) {
            self.value = Math.min(maxValue, self.value + step);
        }
    }

    function dec(){
        if(self.value > minValue) {
            self.value = Math.max(minValue, self.value - step);
        }
    }

    function getValue(){
        return self.value;
    }

    function isMax(){
        return self.value == maxValue;
    }

    function isMin(){
        return self.value == minValue;
    }
}
