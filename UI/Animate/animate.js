$ = YYJUI.baseAPI.$;
Base = YYJUI.baseAPI;
YYJUI.AnimateQueue = {}
YYJUI:config = {
	queueNum:0
}
YYJUI.Animate = function(ops) {
	this.ops = {};
	Base.extend(this.ops, ops);
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
		})

		console.log(YYJUI.AnimateQueue);
	}
}