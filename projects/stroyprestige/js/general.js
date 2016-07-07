'use strict';

(function ($) {
	$(function () {
		var $body = $('body');
		var selectors = {
			sliderFront: '.slider-front__inner-wrapper',
			servicesFront: '.services-front__inner-wrapper'
		};

		var $global = {
			sliderFront: $(selectors.sliderFront),
			servicesFront: $(selectors.servicesFront)
		};

		(function sliderFrontInit() {
			var $slider = $global.sliderFront;
			var controls = getControls($slider);

			$slider.slick({
				dots: true,
				fade: true,
				prevArrow: controls.prev,
				nextArrow: controls.next,
				asNavFor: $global.servicesFront
			});
		})();

		(function servicesFrontInit() {
			var $slider = $global.servicesFront;
			var controls = getControls($slider);

			$slider.slick({
				dots: false,
				fade: true,
				arrows: false,
				asNavFor: $global.sliderFront,
				slidesToShow: 4
			});
		})();

		function getControls($slider) {
			var prevCls = '.slider__arrow_prev';
			var nextCls = '.slider__arrow_next';

			return {
				prev: $(prevCls, $slider.closest('.slider')),
				next: $(nextCls, $slider.closest('.slider'))
			};
		}
	});
})(jQuery);