$ = YYJUI.baseAPI.$;
Base = YYJUI.baseAPI;
YYJUI.AnimateQueue = {}
YYJUI:config = {
	queueNum:0;
}
YYJUI.Animate = function(ops) {
	this.init();
};
YYJUI.AnimateBase = function() {
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
		checkAnimateQueue(this.element) && (YYJUI.AnimateQueue = this.name = this.element);
		this.initAnimate();
	},
	initAnimate: function() {

	}
}