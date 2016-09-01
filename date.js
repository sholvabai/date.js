var date = function (fmtstr,timestamp){
    this.timestamp = timestamp?timestamp:new Date().getTime();
    this.currentTime = new Date(this.timestamp);
    this.fmtstr = fmtstr;
    var _this  = this;

    _this.d = function(){
        var _this = this;
        var cd = _this.currentTime.getDate();
        return cd < 10 ? '0' + cd : cd;
    },
    _this.Y = function(){
        var _this = this;
        return _this.currentTime.getFullYear();
    },
    _this.m = function(){
        var cm = _this.currentTime.getMonth()+1;
        return cm < 10 ? '0' + cm : cm;
    }

    _this.format = function(){
        var _this = this;
        var fmtArray = _this.fmtstr.split('');
        var result = '';

        fmtArray.map(function(v){
            if (_this[v]) {
                result += _this[v]();
            }else{
                result += v;
            }
        });
        return result;
    }

    return _this.format();
};


var d = date('Y-m-d');
console.log(d)