window.onload = function() {
	var fuc = {
		config: {},
		init: function() {
			this.newAnimate();
			this.bindEvent();
		},
		newAnimate: function() {
			fuc.animate1 = new YYJUI.Animate({
				element: "#caseOne",
				attributes: ['height', 'width'],
				duration: 500,
				callback: function() {
					alert("让你点就点真乖！！");
				}
			});
			fuc.animate2 = new YYJUI.Animate({
				element: "#caseTwo",
				attributes: ['height', 'width', 'left', 'top'],
				duration: 500,
				callback: function() {
					alert("让你点就点真乖！！");
				}
			});
		},
		bindEvent: function() {
			$("#caseOneBtn")[0].addEventListener("click", function(e) {
				fuc.animate1.start(10).stop(300);
			});
			$("#caseTwoBtn")[0].addEventListener("click", function(e) {
				fuc.animate2.stop(100);
			})
		}
	}

	fuc.init();
}