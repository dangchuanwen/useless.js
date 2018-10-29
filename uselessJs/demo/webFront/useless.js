
var asyncOrder = {
    duty:{},
    enrol: function (name, ring, callback) {
       
        if (name in this.duty === false) {
            this.duty[name] = [];
        }
        var duty = Object.defineProperties({}, {
            name: { 
                value: name,
                enumerable: false,
                writable: false,
                configurable: false
            },
            callback: {
                value: callback,
                enumerable: false,
                writable: false,
                configurable: false
            },
            is_end: {
                value: false,
                enumerable: false,
                writable: true,
                configurable: false
            },
        });
        this.duty[name].push(duty);
        ring.call(duty);
    },
    setData: function (that, datas) {
        that.datas = datas;
        that.is_end = true;
        this.check(that);
    },
    check: function(that) {
        var dutys = this.duty[that.name];
        for (var i = 0, len = dutys.length; i < len; i++) {
            if (dutys[i].is_end === true) {
                dutys[i].callback(dutys[i].datas);
                dutys.shift();
                len = dutys.length;
                i--;
                
            }else {
                break;
            }
        }

    }
};