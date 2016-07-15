'use strict';

(function ($) {
	$(function () {

		var $body = $('body');
		var selectors = {
			sliderFront: '.slider-front__inner-wrapper',
			servicesFront: '.services-front__inner-wrapper',
			projectsFront: '.slider-projects__inner-wrapper',
			clientsFront: '.slider-clients__inner-wrapper',
			toTopBtnCls: '.js-to-top',
			expandMapFrontCls: '.js-expand-map',
			headerCls: '.header'
		};

		var $global = {
			sliderFront: $(selectors.sliderFront),
			servicesFront: $(selectors.servicesFront),
			projectsFront: $(selectors.projectsFront),
			clientsFront: $(selectors.clientsFront),
			header: $(selectors.headerCls)
		};

		$body.on('click', selectors.toTopBtnCls, toTop);
		$body.on('click', selectors.expandMapFrontCls, expandMapFront);
		$(window).on('scroll', function () {
			if ($(this).scrollTop() && !$global.header.is('scrolled')) {
				$global.header.addClass('scrolled');
			} else {
				$global.header.removeClass('scrolled');
			}
		});
		function expandMapFront() {
			var $map = $('#map-front');
			var posPage = $(document).scrollTop();
			$map.toggleClass('expand');
			$map.is('expand') ? scrollPage(posPage - 300, 260) : scrollPage(posPage + 300, 260);
		}

		function toTop() {
			scrollPage(0, 520);
		}

		function scrollPage(value, speed) {
			$('html, body').animate({
				scrollTop: value
			}, speed);
		}

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

		(function clientsFrontInit() {
			var $slider = $global.clientsFront;
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

		// initMap();
	});
})(jQuery);

function initMap() {
	var myLatLng = { lat: 53.8668267, lng: 27.5078881 };
	var map = new google.maps.Map(document.getElementById('map-front'), {
		center: myLatLng,
		zoom: 15,
		scrollwheel: false
	});
	var marker = new google.maps.Marker({
		position: myLatLng,
		title: 'ООО СтройПрестиж'
	});

	marker.setMap(map);
}

// (function test(){
// 	let str = divider( prompt('Введи сумму: ', 0) );
// 	console.log(str);
	
// })();

// function divider(number) {
// 	let reverseStr = number.split('').reverse().join('').match(/.{1,3}/g);
// 	let newArr = reverseStr.map( item => item.split('').reverse().join('') );
// 	return newArr.reverse().join(' ');
// }