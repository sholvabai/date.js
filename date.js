var xdate = function (fmtstr,timestamp){
    this.timestamp = timestamp?timestamp:new Date().getTime();
    this.currentTime = new Date(this.timestamp);
    this.fmtstr = fmtstr;
    this.date = this.currentTime.getDate(); //当前日
    this.month = this.currentTime.getMonth(); //当前月
    this.year = this.currentTime.getFullYear();
    var _this  = this;

    //Day of the month, 2 digits with leading zeros   01 to 31
    _this.d = function(){
        var _this = this;
        var cd = this.date;
        return cd < 10 ? '0' + cd : cd;
    };

    //A textual representation of a day, three letters    Mon through Sun
    _this.D = function(){
        var str = this.currentTime.toDateString();
        return str.substr(0,3);
    }

    //Day of the month without leading zeros  1 to 31
    _this.j = function(){
        var _this = this;
        var cd = this.date;
        return cd;
    };

    //(lowercase 'L')   A full textual representation of the day of the week    Sunday through Saturday
    _this.l = function(){
        var dar = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        var currentDay = _this.currentTime.getDay();
        return dar[currentDay];
    }

    //numeric representation of the day of the week  1 (for Monday) through 7 (for Sunday)
    _this.N = function(){
        var day = _this.currentTime.getDay();
        if (day==0) {
            return 7;
        }
        return _this.currentTime.getDay();
    }

    //English ordinal suffix for the day of the month, 2 characters   st, nd, rd or th. Works well with j
    // _this.S = function(){

    // }

    //Numeric representation of the day of the week   0 (for Sunday) through 6 (for Saturday)
    _this.w = function(){
        return _this.currentTime.getDay();
    }

    //The day of the year (starting from 0)   0 through 365
    _this.z = function(){
        var firstDay = new Date(_this.year,0,1); 
        var dateDiff = _this.currentTime-firstDay;
        var msPerDay = 1000 * 60 * 60 * 24; 
        var diffDays = Math.ceil(dateDiff/ msPerDay);
        return diffDays;
    }

    //////////////====WEEK
    // ISO-8601 week number of year, weeks starting on Monday Example: 42 (the 42nd week in the year)
    _this.W = function(){
        var d2 = new Date(_this.year, 0, 1);
        var d1 = _this.currentTime;
        var d = Math.round((d1 - d2) / 86400000); 
        return Math.ceil((d + ((d2.getDay() + 1) - 1)) / 7); 
    }


    //////////////====MONTH
    //A full textual representation of a month, such as January or March  January through December
    _this.F = function(){
        var mar = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        var currentDay = _this.month;
        return mar[currentDay];
    }

    //Numeric representation of a month, with leading zeros   01 through 12
    _this.m = function(){
        var cm = _this.currentTime.getMonth()+1;
        return cm < 10 ? '0' + cm : cm;
    };

    //A short textual representation of a month, three letters    Jan through Dec
    _this.M = function(){
        var str = this.currentTime.toDateString();
        return str.substr(4,3);
    }

    //Numeric representation of a month, without leading zeros    1 through 12
    _this.n = function(){
        var cm = _this.currentTime.getMonth()+1;
        return cm;
    }

    //Number of days in the given month   28 through 31
    _this.t = function(){
        var gt = new Date(_this.year,_this.month,0);
        var cm = gt.getDate();
        return cm < 10 ? '0' + cm : cm;
    };

    ////////////////==YEAR

    //Whether it's a leap year    1 if it is a leap year, 0 otherwise.
    _this.L = function(){
        return _this.year%4>0?false:true;
    }

    //ISO-8601 week-numbering year. This has the same value as Y, except that if the ISO week number (W) belongs to the previous or next year, that year is used instead. (added in PHP 5.1.0)    Examples: 1999 or 2003
    // _this.o = function(){

    // }

    //A full numeric representation of a year, 4 digits   Examples: 1999 or 2003
    _this.Y = function(){
        return _this.currentTime.getFullYear();
    };

    //A two digit representation of a year    Examples: 99 or 03
    _this.y = function(){
        return _this.currentTime.getFullYear().toString().substr(2,2);
    }


    ///////////////////////==TIME
    //Lowercase Ante meridiem and Post meridiem   am or pm
    _this.a = function(){
        var gh = a.getHours();
        return gh>12?'pm':'am'
    }

    //Uppercase Ante meridiem and Post meridiem   AM or PM
    _this.A = function(){
        var gh = a.getHours();
        return gh>12?'PM':'AM'
    }
    //Swatch Internet time    000 through 999
    // _this.B = function(){

    // }

    //12-hour format of an hour without leading zeros 1 through 12
    _this.g = function(){
        var cm = _this.currentTime.getHours();
        if (cm>13) {
            return cm-12;
        }
        return cm;
    }

    //24-hour format of an hour without leading zeros 0 through 23
    _this.G = function(){
        return _this.currentTime.getHours();
    }

    //12-hour format of an hour with leading zeros    01 through 12
    _this.h = function(){
        var cm = _this.currentTime.getHours();
        if (cm>13) {
            return cm-12;
        }
        return cm < 10 ? '0' + cm : cm;
    }

    //24-hour format of an hour with leading zeros    00 through 23
    _this.H = function(){
        var cm = _this.currentTime.getHours();
        return cm < 10 ? '0' + cm : cm;
    }

    //Minutes with leading zeros  00 to 59
    _this.i = function(){
        var cm = _this.currentTime.getMinutes();
        return cm < 10 ? '0' + cm : cm;
    }

    //Seconds, with leading zeros 00 through 59
    _this.s = function(){
        var cm = _this.currentTime.getSeconds();
        return cm < 10 ? '0' + cm : cm;
    }

    //Microseconds (added in PHP 5.2.2). Note that date() will always generate 000000 since it takes an integer parameter,whereas DateTime::format() does support microseconds if DateTime was created with microseconds.    Example: 654321
    _this.u = function(){
        return  _this.currentDay.getMilliseconds();
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

