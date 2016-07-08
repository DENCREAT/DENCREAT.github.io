'use strict';

(function ($) {
	$(function () {
		var $body = $('body');
		var selectors = {
			sliderFront: '.slider-front__inner-wrapper',
			servicesFront: '.services-front__inner-wrapper',
			projectsFront: '.slider-projects__inner-wrapper'
		};

		var $global = {
			sliderFront: $(selectors.sliderFront),
			servicesFront: $(selectors.servicesFront),
			projectsFront: $(selectors.projectsFront)
		};

		(function sliderFrontInit() {
			var $slider = $global.sliderFront;
			var controls = getControls($slider);

			$slider.slick({
				autoplay: true,
				autoplaySpeed: 7000,
				dots: false,
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
				arrows: false,
				asNavFor: $global.sliderFront,
				slidesToShow: 4,
				dots: true,
				focusOnSelect: true
			});
		})();

		(function projectsFrontInit() {
			var $slider = $global.projectsFront;
			var controls = getControls($slider);

			$slider.slick({
				arrows: true,
				slidesToShow: 4,
				slidesToScroll: 1,
				prevArrow: controls.prev,
				nextArrow: controls.next
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