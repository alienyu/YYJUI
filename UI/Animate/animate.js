$ = YYJUI.baseAPI.$;
Base = YYJUI.baseAPI;
YYJUI.AnimateQueue = {};
YYJUI.AnimateProcessing = {};
YYJUI:config = {
	queueNum:0
}
YYJUI.Animate = function(ops) {
	this.ops = {};
	Base.extend(this.ops, ops);
	this.actName = this.createProcessing();
	this.init();
};
YYJUI.Animate.prototype = {
	init: function() {
		this.handleData();
		this.createAnimateQueue();
	},
	handleData: function() {
		Base.makeArray(this.attributes);
	},
	createAnimateQueue: function() {
		function checkAnimateQueue(dom) {
			var isExist = false;
			for(var i in YYJUI.AnimateQueue) {
				if(YYJUI.AnimateQueue[dom]) {
					isExist = true;
					break;
				}
			}
			return isExist;
		}
		!checkAnimateQueue(this.ops.element) && (YYJUI.AnimateQueue[this.ops.element] = []);
		this.initAnimate();
	},
	initAnimate: function() {
		var that = this;
		function checkAttr(attr) {
			Base.each(YYJUI.AnimateQueue[that.ops.element], function(eachAttr, i) {
				if(eachAttr.attr == attr) {
					return eachAttr;
				} else {
					return false;
				}
			})
		}
		Base.each(that.ops.attributes,function(data, index) {
			if(checkAttr[data]) {
				YYJUI.AnimateQueue[that.ops.element].push(Base.extend(checkAttr[data],Base.filterJSON(that.ops, ["element","attributes"])));
			} else {
				YYJUI.AnimateQueue[that.ops.element].push(Base.extend({attr:data}, Base.filterJSON(that.ops, ["element","attributes"])));
			}
		});
		this.setAnimateData("element", this.ops.element);

	},
	setAnimateData: function(type, data) {
		var target = YYJUI.AnimateQueue[this.ops.element];
		Base.each(target, function(json) {
			json[type] = data;
		})		
	},
	start: function(data) {
		//设置动画属性的初始值
		this.setAnimateData('beginData', data);
		this.setAnimateData('status', 0);//初始化每个动画属性开始标志位
	},
	stop: function(data) {
		this.setAnimateData('endData', data);
		this.startAnimate();
	},
	startAnimate: function() {
		var that = this;
		var target = YYJUI.AnimateQueue[this.ops.element];
		Base.each(target, function(animateData) {
			that.getBeginData(animateData);
			that.calculateAnimateData(animateData);
		});
		this.actAnaimate(target);
	},
	getBeginData: function(data) {
		if(!data.beginData) {
			this.calculateStyle(data.attr);
		}
	},
	calculateStyle: function(attr) {
		if(navigator.userAgent.indexOf("MSIE") > 0) {
			this.beginData = $(this.ops.element)[0].currentStyle[attr].match(/\d+/);
		} else {
			this.beginData = window.getComputedStyle($(this.ops.element)[0],null)[attr].match(/\d+/);
		}
	},
	calculateAnimateData: function(data) {
		var type = data.attr;
		var difference = 0,
			step = 0, //每帧动画的步长
			direct = 1; //1表示递增，0表示递减
		switch(type) {
			case "color","background-color":
				break;
			case "opacity":
				break;
			default:
				data.difference = parseInt((data.endData - data.beginData), 10);
				data.direct = data.difference > 0 ? 1 : 0;
				data.step = parseInt(difference / (data.duration / 50) ,10);
				break;
		}
	},
	createProcessing: function() {
		return name = "AnimateProcess_" + (YYJUI.config.queueNum++);
	},
	actAnaimate: function(target) {
		var that = this;
		YYJUI.AnimateProcessing[this.actName] = {};
		this.actLength = this.ops.element.length;
		YYJUI.AnimateProcessing[this.actName] = setInterval(function() {
			if(that.actLength > 0) {
				Base.each(target, function(eachTarget) {
					switch(eachTarget.attr) {
						case "color","background-color":
							break;
						case "opacity":
							break;
						default:
							that.actNumChange(eachTarget);
							break;
					}
				})
			} else {
				clearInterval(YYJUI.AnimateProcessing[that.actName]);
			}
		}, 50);
	},
	//height,widht等数字类属性变化
	actNumChange: function(tar) {
		var attr = tar.attr,
			step = tar.step,
			direct = tar.direct;
		if(!tar.status) {
			if(direct > 0) {
				tar.beginData += step;
				if(tar.beginData >= tar.endData) {
					tar.beginData = tar.endData;
					tar.status = 1; //该动画属性已完成
					this.actLength --;
				}
			} else {
				tar.beginData -= step;
				if(tar.beginData <= tar.endData) {
					tar.beginData = tar.endData;
					tar.status = 1; //该动画属性已完成
					this.actLength --;
				}
			}
			$(tar.element).style[attr] = tar.begin;
		}
	}
}