var YYJUI = {
	baseAPI: {
		$: function(name) {
			if(name) {
				if(navigator.userAgent.indexOf("MSIE 7.0") > 0 || navigator.userAgent.indexOf("MSIE 8.0") > 0) {
					if(name.match("#")) {
						return document.getElementByID(name.match(/#(\w+)/)[1]);
					} else if(name.match(".")){
						return document.getElementsByClassName(name.match(/#(\w+)/)[1]);
					} else {
						return document.geElementsByTagName(name);
					}
				} else {
					return document.querySelectorAll(name);
				}
			} else {
				return undefined;
			}
		},

	    //判断是否为数组
	    isArray: function(array) {
	        return Object.prototype.toString.call(array) == '[object Array]';
	    },

	    //转换数组
	    makeArray: function(array) {
	        return array ? this.isArray(array) ? array : [array] : [];
	    },

	    //简单迭代数组
	    each: function(obj, callback) {
	        if (this.isArray(obj)) {
	            for (var i = 0; i < obj.length; i++)
	                callback(obj[i], i);
	        } else {
	            for (var i in obj)
	                callback(obj[i], i);
	        }
	    },

	    //查找元素是否在数组中
	    inArray: function(array, item) {
	        array = this.makeArray(array);

	        if (array.indexOf) {
	            return array.indexOf(item) > -1;
	        } else {
	            for (var i = 0; i < array.length; i++) {
	                if (array[i] == item) return true;
	            }

	            return false;
	        }
	    },

	    //是否函数
	    isFunction: function(callback) {
	        return typeof callback == 'function';
	    },

	    filterJSON: function(json, attrs) {
	    	var newJSON = {};
	    	for(var i in json) {
	    		newJSON[i] = json[i]
	    	}
	    	this.each(attrs, function(data, index) {
	    		delete newJSON[data];
	    	});
	    	return newJSON;
	    },
	    extend: function(currentJSON,targetJSON) {
	    	for(var i in targetJSON) {
	    		currentJSON[i] = targetJSON[i]
	    	}
	    	return currentJSON;
	    }
	}
}