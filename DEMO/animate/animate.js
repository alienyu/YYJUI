window.onload = function() {
	var fuc = {
		config: {},
		init: function() {
			this.newAnimate();
			console.log(animate);
		},
		newAnimate: function() {
			animate = new YYJUI.Animate({
				element: "#caseOne",
				attributes: ['height', 'width'],
				duration: 2000
			})
		}
	}

	fuc.init();
}