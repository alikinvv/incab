// Главное меню
$(function() {
	$('.header__menu').append("<span class='bar'></span>"); // create new element
	var $bar = $('.header__menu .bar');
	if($('.header__menu a').is('.active')) {
		var barLeft =  $('.header__menu a.active').position().left;
		var barWidth = $('.header__menu a.active').outerWidth();
	} else {
		var barLeft =  0;
		var barWidth = 0;
	}	
	$bar.css('width', barWidth).css('left', barLeft);

	// get hover menu item position and width
	$('.header__menu a').hover(function() {
		$bar.css('width', $(this).outerWidth()).css('left', $(this).position().left);  // get hover menu item position and width
	});

	// return to the original position of the active list item
	$('.header__menu').mouseleave(function() {
		$bar.css('width', barWidth).css('left', barLeft);
	});

	// сhanging the active menu item
	$('.header__menu a').click(function() {
		barLeft =  $(this).position().left;
		barWidth = $(this).outerWidth();
		$('.header__menu a').removeClass('active');
		$(this).addClass('active');
	});
});

// задаем одинаковую высоту всем блокам
function sameHeight(block) {
	if($('*').is(block)) {
		var maxHeight = 0;
        $(block).each(function () {
            var h_block = parseInt($(this).height());
            if(h_block > maxHeight) {
                maxHeight = h_block;
            };
        });
        $(block).height(maxHeight);
    }
}

// задаем одинаковую высоту всем блокам с учетом отступов
function sameOuterHeight(block) {
	if($('*').is(block)) {
		var maxHeight = 0;
        $(block).each(function () {
            var h_block = parseInt($(this).outerHeight());
            if(h_block > maxHeight) {
                maxHeight = h_block;
            };
        });
        $(block).height(maxHeight);
    }
}

// определяем левый отступ .incabFeatures__info в блоке .incabFeatures
function incabFeatures() {	
    if($('*').is('.incabFeatures')) {
    	$('.incabFeatures').each(function() {
    		var left = $(this).find('.incabFeatures__count').position().left;
    		$(this).find('.incabFeatures__info').css('left',left);    		
    	})
    }
}

// сжимаем блок на 30px 
function pinch() {
	if($('*').is('.pinch')) {
		$('.pinch').each(function() {
			var w = $(this).width();
			$(this).width(w-30);
		});		
	}	
}

var slickTrigger = false;
var searchTrigger = false;

$(document).ready(function(){
	sameHeight('.fourP__over');		
	incabFeatures();
	pinch();
	if($(window).width() >= 1024) 
		sameHeight('.useful-col');	

	// анимация поиска в шапке
	$('.header__search .searchForm__button').click(function(e) {
		e.preventDefault();
		$('.header__search .searchForm__input').addClass('slide');
		$('.header__search .searchForm__input').focus();
		$('.header__search').addClass('slide');
		searchTrigger = true;
	});

	$('.header__search .searchForm__input').focusout(function() {
		if(!$('.header__search .searchForm__input').val()) {
			$('.header__search .searchForm__input').removeClass('slide');
			$('.header__search').removeClass('slide');
		}
	})
	
	// 4П триггер
	if($('*').is('.fourPWrap') && $(window).width() <= 767 && !slickTrigger) {
		$('.fourPWrap .col-xs-12').slick({
		  slidesToShow: 1,
		  slidesToScroll: 1,
		  arrows: false
		});
		slickTrigger = true;
	} else if($('*').is('.fourPWrap') && $(window).width() >= 768 && slickTrigger) {
		$('.fourPWrap .col-xs-12').slick('destroy');
		slickTrigger = false;
	}

	// анимация блоков 4П
	if($('*').is('.fourP')) {
		$('.fourP').hover(function() {
			var left = $(this).position().left,
				right = $('.fourPWrap .col-xs-12').width() - ($(this).position().left +  $(this).width())
			$(this).siblings().css('pointer-events','none');
			$(this).addClass('active');
			$(this).find('.fourP__under').animate({
				left: -left,
				right: -right,
			},100);
		});
		$('.fourPWrap .fourP').mouseleave(function() {
			$('.fourP').css('pointer-events','all');
			setTimeout(function() {
				$('.fourP').removeClass('active');
			},0);
			$(this).find('.fourP__under').animate({
				left: '50%',
				right: '50%',
			},200);
		});
	}

	// Фильтрация кабелей в категории
	if($('*').is('.category__nav')) {
		var w = $('.cableItem').width();
		$('.category__nav a').click(function(e) {
			e.preventDefault();			

			if($('.category').find('.cableItem[data-target="' + $(this).attr('data-target') + '"]').hasClass('cableItem-hide')) {
				$('.category')
				.find('.cableItem[data-target="' + $(this).attr('data-target') + '"]')
				.removeClass('cableItem-hide')
				.animate({
					width: w,
					'margin-left': 15,
					'margin-right': 15
				});
				$('.category')
				.find('.cableItem:not([data-target="' + $(this).attr('data-target') + '"])')
				.addClass('cableItem-hide');
				$('.cableItem.cableItem-hide')					
					.css('width','0')
					.css('margin','0');
			} else {
				$('.category')
				.find('.cableItem:not([data-target="' + $(this).attr('data-target') + '"])')
				.addClass('cableItem-hide');
				setTimeout(function() {
					$('.cableItem.cableItem-hide')					
					.animate({
						width: 0,
					 	'margin': 0
					});
				},100);
			}			
		});
	}

	// точки на странице кабеля
	if($('*').is('.cable__dot')) {
		$('.cable__dot').each(function() {
			var parentHeight = $(this).parent().outerHeight();
			var dotPosition = $(this).position().top;
			$(this).css('height', parentHeight - dotPosition - 48);
			$(this).find('.cable__partNumber').hover(function() {
				$(this).parent().toggleClass('show');
			});
		});
	}
	
	// слайдер с пагинацией
    if($('*').hasClass('dotSlider')) {
    	var dotSwiper = new Swiper('.dotSlider', {
	      pagination: {
	        el: '.swiper-pagination',
	      },
	    });

	    if($('.dotSlider .swiper-slide').length <= 1) {
	    	$('.dotSlider .swiper-pagination').hide();
	    	$('.dotSlider').css('pointer-events','none');
	    }
    }

    // bootstrap tabs
	if($('*').hasClass('nav-tabs')) {
		$('.nav-tabs').append("<span class='bar'></span>"); // create new element
		var $bar = $('.nav-tabs .bar');
		var barLeft =  $('.nav-tabs li.active').position().left;
		var barWidth = $('.nav-tabs li.active').width();
		$bar.css('width', barWidth).css('left', barLeft);

		// get hover menu item position and width
		$('.nav-tabs li').hover(function() {
			$bar.css('width', $(this).width()).css('left', $(this).position().left);
		});

		// return to the original position of the active list item
		$('.nav-tabs').mouseleave(function() {
			$bar.css('width', barWidth).css('left', barLeft);  
		});

		// сhanging the active menu item
		$('.nav-tabs li').click(function() {
			barLeft =  $(this).position().left;
			barWidth = $(this).width();
		});
	}

	// селекты
	if($('*').hasClass('custom-select')) {
		$(".custom-select").each(function() {
		  var classes = $(this).attr("class"),
		      id      = $(this).attr("id"),
		      name    = $(this).attr("name");
		  var template =  '<div class="' + classes + '">';
		      template += '<span class="custom-select-trigger">' + $(this).attr("placeholder") + '</span>';
		      template += '<div class="custom-options">';
		      $(this).find("option").each(function() {
		        template += '<span class="custom-option" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
		      });
		  template += '</div></div>';
		  
		  $(this).wrap('<div class="custom-select-wrapper"></div>');
		  $(this).hide();
		  $(this).after(template);
		});
		$('.custom-options .custom-option[data-value="'+ $('.custom-select option.selection').attr('value') +'"]').addClass('selection');
		$(".custom-option:first-of-type").hover(function() {
		  $(this).parents(".custom-options").addClass("option-hover");
		}, function() {
		  $(this).parents(".custom-options").removeClass("option-hover");
		});
		$(".custom-select-trigger").on("click", function(event) {
		  $('html').one('click',function() {
		    $(".custom-select").removeClass("opened");
		  });
		  $(this).parents(".custom-select").toggleClass("opened");
		  event.stopPropagation();
		});
		$(".custom-option").on("click", function() {
		  $(this).parents(".custom-select-wrapper").find("select").val($(this).data("value"));
		  $(this).parents(".custom-options").find(".custom-option").removeClass("selection");
		  $(this).addClass("selection");
		  $(this).parents(".custom-select").removeClass("opened");
		  $(this).parents(".custom-select").find(".custom-select-trigger").text($(this).text());
		  changeTable();
		});

		changeTable();
		function changeTable() {
			var activeOption = $('.custom-select .custom-option.selection').attr('data-value');
			console.log('Active option: ' + activeOption);
			$('.cableOptions__table table').hide();
			$('.cableOptions__table table[data-value="'+ activeOption +'"]').show();
		};
	}

	// слайдер с миниатюрами
	if($('*').hasClass('thumbSliderMain'))  {		
		 $('.thumbSliderMain').slick({
		  slidesToShow: 1,
		  slidesToScroll: 1,
		  arrows: true,
		  fade: true,
		  asNavFor: '.thumbSliderNav'
		});
		$('.thumbSliderNav').slick({
		  slidesToShow: 3,
		  slidesToScroll: 1,
		  asNavFor: '.thumbSliderMain',
		  infinite: true,
		  arrows: false,
		  centerMode: true,
		  focusOnSelect: true,
		  variableWidth: true
		});
	}

	// подгон точек по размеру картинки
	if($('*').hasClass('cable__imgWrap') && $(window).width() >= 1024) {
		$('.cable__imgWrap').css('width',$(this).find('.cable__img').width());
	} else {
		$('.cable__imgWrap').css('width','100%');
	}

	// подгон высоты секции по размеру видео
	if($('*').hasClass('mainVideo') && $(window).width() <= 1023 && $(window).width() > 414) {
		$('.mainVideo').css('height',$('.mainVideo__video').height());
	} else if($('*').hasClass('mainVideo') && $(window).width() < 414) {
		$('.mainVideo').css('height','');
	}

	// перевод кабельного меню в горизонтальный вид
	if($('*').hasClass('cableMenuWrap') && $(window).width() <= 767) {
		var w = 0;
		$('.cableMenu').each(function() {
			w += $(this).width();			
		});

		$('.cableMenuWrap').css('min-width',w);
		console.log('Cable menu width: ' + w);
	}

	// подгон высоты картинки коротких новостей
	if($('*').hasClass('secondEvents') && $(window).width() <= 767)
		$('.secondEvents .mainEvent__img').css('height',$('.secondEvents .mainEvent__info').outerHeight());
	

	// создание мобильного меню
	if(!$('*').hasClass('hamburger') && $(window).width() <= 767) {
		$('.header .row').append('<div class="hamburger"><span></span></div>');
	} else if($('*').hasClass('hamburger') && $(window).width() > 767) {
		$('.hamburger').hide();
	} else if($('*').hasClass('hamburger') && $(window).width() <= 767) {
		$('.hamburger').show();
	}

	// Форма подбора кабеля
	if($('*').hasClass('choice')) {
		$('.choice__mark input').change(function() {
			if($('.choice__mark input').val() == "ДПТ") {
				$('.choice').addClass('show');
				$('.choice__mark .material-input').removeClass('alert-msg');
			} else if($('.choice__mark input').val() == "") {
				$('.choice').removeClass('show');
				$('.choice__mark .material-input').removeClass('alert-msg');
			} else {				
				$('.choice').removeClass('show');
				$('.choice__mark .material-input').addClass('alert-msg');
			}
		}) 
	}

	//
	if($('*').is('.companyItem')) {
		// добавление круга к каждой комании
		$('.companyItem').append('<span class="circle"></span>');

		// Перебор блоков информации
		for(var i = 0, posX = 0, row = 1; i <= $('.companyInfo').length + 1; i++) {
			$('.companyInfo').eq(i).each(function() {
				$(this).attr('data-height', $(this).height()).css('height',0);
			});
		}

		// Перебор блоков команий
		for(var i = 0, posX = 0, row = 1; i <= $('.companyItem').length + 1; i++) {
			$('.companyItem').eq(i).each(function() {
				if($(this).position().top > posX) { // Если стоят на одной строке
					row++;
					posX = $(this).position().top;
					$(this).attr('data-row', row);
					$(this).next('.companyInfo').attr('data-row', row).css('top', posX + $(this).height() + 30);
				} else {
					$(this).attr('data-row', row);
					$(this).next('.companyInfo').attr('data-row', row).css('top', posX + $(this).height() + 30);
				}
			});
		}

		// Развертывание блока с информацией и сдвиг нижних строк
		$('.companyItem').click(function(e) {
			e.preventDefault();

			// Определение позиции курсора для анимации круга
			var parentOffset = $(this).offset(); 
			var relX = e.pageX - parentOffset.left;
			var relY = e.pageY - parentOffset.top;
			$('.companyItem').removeClass('active');
			$('.cards .radio .circle').removeClass('animate').css('left','initial').css('top','initial');
	        $(this).find('.circle').css('left',relX).css('top',relY).toggleClass('animate');
	        $(this).toggleClass('active');


			if($(this).next('.companyInfo').hasClass('slide')) {
				$(this).next('.companyInfo').removeClass('slide').css('height', 0);

				var row = parseInt($(this).attr('data-row')) + 1;
				$('.companyItem[data-row="'+ row +'"]').each(function() {
					$(this).css('margin-top', 0);
				});
			} else {
				$('.companyInfo').removeClass('slide').css('height', 0);
				$('.companyItem[data-row="'+ row +'"]').each(function() {
					$(this).css('margin-top', 0);
				});
				
				var infoHeight = parseInt($(this).next('.companyInfo').attr('data-height')) + 30;
				$(this).next('.companyInfo').addClass('slide').css('height', infoHeight);

				var row = parseInt($(this).attr('data-row')) + 1;
				$('.companyItem[data-row="'+ row +'"]').each(function() {
					$(this).css('margin-top', infoHeight);
				});
			}
			
		});
	}	

});

$(window).resize(function() {
	sameHeight('.fourP__over');
	incabFeatures();	
	// 4П триггер
	if($('*').is('.fourPWrap') && $(window).width() <= 767 && !slickTrigger) {
		$('.fourPWrap .col-xs-12').slick({
		  slidesToShow: 1,
		  slidesToScroll: 1,
		  arrows: false
		});
		slickTrigger = true;
	} else if($('*').is('.fourPWrap') && $(window).width() >= 768 && slickTrigger) {
		$('.fourPWrap .col-xs-12').slick('destroy');
		slickTrigger = false;
	}

	// подгон точек по размеру картинки
	if($('*').hasClass('cable__imgWrap') && $(window).width() >= 1024) {
		$('.cable__imgWrap').css('width',$(this).find('.cable__img').width());
	} else {
		$('.cable__imgWrap').css('width','100%');
	}

	// подгон высоты секции по размеру видео
	if($('*').hasClass('mainVideo') && $(window).width() <= 1023 && $(window).width() > 414) {
		$('.mainVideo').css('height',$('.mainVideo__video').height());
	} else if($('*').hasClass('mainVideo') && $(window).width() < 414) {
		$('.mainVideo').css('height','');
	}

	// создание мобильного меню
	if(!$('*').hasClass('hamburger') && $(window).width() <= 767) {
		$('.header .row').append('<div class="hamburger"><span></span></div>');
	} else if($('*').hasClass('hamburger') && $(window).width() > 767) {
		$('.hamburger').hide();
	} else if($('*').hasClass('hamburger') && $(window).width() <= 767) {
		$('.hamburger').show();
	}

	// подгон высоты картинки коротких новостей
	if($('*').hasClass('secondEvents') && $(window).width() <= 767)
		$('.secondEvents .mainEvent__img').css('height',$('.secondEvents .mainEvent__info').outerHeight());
});

$(document).bind('change', function(e){
    if( $(e.target).is(':invalid') ){
        $(e.target).addClass('invalid-input');
    } else {
        $(e.target).removeClass('invalid-input');
    }
});

$(window).on('load', function(){ 
	console.log('PAGE_ONLOAD');
});

// карта в контактах
if($('*').hasClass('office__map')) {
	var mapOffice;
	ymaps.ready(init);

	function init () {
	    // Создание экземпляра карты и его привязка к контейнеру
	    mapOffice = new ymaps.Map('mapOffice', {
	        // центр и коэффициент масштабирования.
	        center: [57.999969, 56.270843],
	        zoom: 16
	    }, {
	        searchControlProvider: 'yandex#search'
	    });

	    mapOffice.behaviors.disable('scrollZoom'); 

	}
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vINCT0LvQsNCy0L3QvtC1INC80LXQvdGOXHJcbiQoZnVuY3Rpb24oKSB7XHJcblx0JCgnLmhlYWRlcl9fbWVudScpLmFwcGVuZChcIjxzcGFuIGNsYXNzPSdiYXInPjwvc3Bhbj5cIik7IC8vIGNyZWF0ZSBuZXcgZWxlbWVudFxyXG5cdHZhciAkYmFyID0gJCgnLmhlYWRlcl9fbWVudSAuYmFyJyk7XHJcblx0aWYoJCgnLmhlYWRlcl9fbWVudSBhJykuaXMoJy5hY3RpdmUnKSkge1xyXG5cdFx0dmFyIGJhckxlZnQgPSAgJCgnLmhlYWRlcl9fbWVudSBhLmFjdGl2ZScpLnBvc2l0aW9uKCkubGVmdDtcclxuXHRcdHZhciBiYXJXaWR0aCA9ICQoJy5oZWFkZXJfX21lbnUgYS5hY3RpdmUnKS5vdXRlcldpZHRoKCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHZhciBiYXJMZWZ0ID0gIDA7XHJcblx0XHR2YXIgYmFyV2lkdGggPSAwO1xyXG5cdH1cdFxyXG5cdCRiYXIuY3NzKCd3aWR0aCcsIGJhcldpZHRoKS5jc3MoJ2xlZnQnLCBiYXJMZWZ0KTtcclxuXHJcblx0Ly8gZ2V0IGhvdmVyIG1lbnUgaXRlbSBwb3NpdGlvbiBhbmQgd2lkdGhcclxuXHQkKCcuaGVhZGVyX19tZW51IGEnKS5ob3ZlcihmdW5jdGlvbigpIHtcclxuXHRcdCRiYXIuY3NzKCd3aWR0aCcsICQodGhpcykub3V0ZXJXaWR0aCgpKS5jc3MoJ2xlZnQnLCAkKHRoaXMpLnBvc2l0aW9uKCkubGVmdCk7ICAvLyBnZXQgaG92ZXIgbWVudSBpdGVtIHBvc2l0aW9uIGFuZCB3aWR0aFxyXG5cdH0pO1xyXG5cclxuXHQvLyByZXR1cm4gdG8gdGhlIG9yaWdpbmFsIHBvc2l0aW9uIG9mIHRoZSBhY3RpdmUgbGlzdCBpdGVtXHJcblx0JCgnLmhlYWRlcl9fbWVudScpLm1vdXNlbGVhdmUoZnVuY3Rpb24oKSB7XHJcblx0XHQkYmFyLmNzcygnd2lkdGgnLCBiYXJXaWR0aCkuY3NzKCdsZWZ0JywgYmFyTGVmdCk7XHJcblx0fSk7XHJcblxyXG5cdC8vINGBaGFuZ2luZyB0aGUgYWN0aXZlIG1lbnUgaXRlbVxyXG5cdCQoJy5oZWFkZXJfX21lbnUgYScpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0YmFyTGVmdCA9ICAkKHRoaXMpLnBvc2l0aW9uKCkubGVmdDtcclxuXHRcdGJhcldpZHRoID0gJCh0aGlzKS5vdXRlcldpZHRoKCk7XHJcblx0XHQkKCcuaGVhZGVyX19tZW51IGEnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHQkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHR9KTtcclxufSk7XHJcblxyXG4vLyDQt9Cw0LTQsNC10Lwg0L7QtNC40L3QsNC60L7QstGD0Y4g0LLRi9GB0L7RgtGDINCy0YHQtdC8INCx0LvQvtC60LDQvFxyXG5mdW5jdGlvbiBzYW1lSGVpZ2h0KGJsb2NrKSB7XHJcblx0aWYoJCgnKicpLmlzKGJsb2NrKSkge1xyXG5cdFx0dmFyIG1heEhlaWdodCA9IDA7XHJcbiAgICAgICAgJChibG9jaykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBoX2Jsb2NrID0gcGFyc2VJbnQoJCh0aGlzKS5oZWlnaHQoKSk7XHJcbiAgICAgICAgICAgIGlmKGhfYmxvY2sgPiBtYXhIZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgIG1heEhlaWdodCA9IGhfYmxvY2s7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJChibG9jaykuaGVpZ2h0KG1heEhlaWdodCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vINC30LDQtNCw0LXQvCDQvtC00LjQvdCw0LrQvtCy0YPRjiDQstGL0YHQvtGC0YMg0LLRgdC10Lwg0LHQu9C+0LrQsNC8INGBINGD0YfQtdGC0L7QvCDQvtGC0YHRgtGD0L/QvtCyXHJcbmZ1bmN0aW9uIHNhbWVPdXRlckhlaWdodChibG9jaykge1xyXG5cdGlmKCQoJyonKS5pcyhibG9jaykpIHtcclxuXHRcdHZhciBtYXhIZWlnaHQgPSAwO1xyXG4gICAgICAgICQoYmxvY2spLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgaF9ibG9jayA9IHBhcnNlSW50KCQodGhpcykub3V0ZXJIZWlnaHQoKSk7XHJcbiAgICAgICAgICAgIGlmKGhfYmxvY2sgPiBtYXhIZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgIG1heEhlaWdodCA9IGhfYmxvY2s7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJChibG9jaykuaGVpZ2h0KG1heEhlaWdodCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vINC+0L/RgNC10LTQtdC70Y/QtdC8INC70LXQstGL0Lkg0L7RgtGB0YLRg9C/IC5pbmNhYkZlYXR1cmVzX19pbmZvINCyINCx0LvQvtC60LUgLmluY2FiRmVhdHVyZXNcclxuZnVuY3Rpb24gaW5jYWJGZWF0dXJlcygpIHtcdFxyXG4gICAgaWYoJCgnKicpLmlzKCcuaW5jYWJGZWF0dXJlcycpKSB7XHJcbiAgICBcdCQoJy5pbmNhYkZlYXR1cmVzJykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgIFx0XHR2YXIgbGVmdCA9ICQodGhpcykuZmluZCgnLmluY2FiRmVhdHVyZXNfX2NvdW50JykucG9zaXRpb24oKS5sZWZ0O1xyXG4gICAgXHRcdCQodGhpcykuZmluZCgnLmluY2FiRmVhdHVyZXNfX2luZm8nKS5jc3MoJ2xlZnQnLGxlZnQpOyAgICBcdFx0XHJcbiAgICBcdH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbi8vINGB0LbQuNC80LDQtdC8INCx0LvQvtC6INC90LAgMzBweCBcclxuZnVuY3Rpb24gcGluY2goKSB7XHJcblx0aWYoJCgnKicpLmlzKCcucGluY2gnKSkge1xyXG5cdFx0JCgnLnBpbmNoJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIHcgPSAkKHRoaXMpLndpZHRoKCk7XHJcblx0XHRcdCQodGhpcykud2lkdGgody0zMCk7XHJcblx0XHR9KTtcdFx0XHJcblx0fVx0XHJcbn1cclxuXHJcbnZhciBzbGlja1RyaWdnZXIgPSBmYWxzZTtcclxudmFyIHNlYXJjaFRyaWdnZXIgPSBmYWxzZTtcclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcblx0c2FtZUhlaWdodCgnLmZvdXJQX19vdmVyJyk7XHRcdFxyXG5cdGluY2FiRmVhdHVyZXMoKTtcclxuXHRwaW5jaCgpO1xyXG5cdGlmKCQod2luZG93KS53aWR0aCgpID49IDEwMjQpIFxyXG5cdFx0c2FtZUhlaWdodCgnLnVzZWZ1bC1jb2wnKTtcdFxyXG5cclxuXHQvLyDQsNC90LjQvNCw0YbQuNGPINC/0L7QuNGB0LrQsCDQsiDRiNCw0L/QutC1XHJcblx0JCgnLmhlYWRlcl9fc2VhcmNoIC5zZWFyY2hGb3JtX19idXR0b24nKS5jbGljayhmdW5jdGlvbihlKSB7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHQkKCcuaGVhZGVyX19zZWFyY2ggLnNlYXJjaEZvcm1fX2lucHV0JykuYWRkQ2xhc3MoJ3NsaWRlJyk7XHJcblx0XHQkKCcuaGVhZGVyX19zZWFyY2ggLnNlYXJjaEZvcm1fX2lucHV0JykuZm9jdXMoKTtcclxuXHRcdCQoJy5oZWFkZXJfX3NlYXJjaCcpLmFkZENsYXNzKCdzbGlkZScpO1xyXG5cdFx0c2VhcmNoVHJpZ2dlciA9IHRydWU7XHJcblx0fSk7XHJcblxyXG5cdCQoJy5oZWFkZXJfX3NlYXJjaCAuc2VhcmNoRm9ybV9faW5wdXQnKS5mb2N1c291dChmdW5jdGlvbigpIHtcclxuXHRcdGlmKCEkKCcuaGVhZGVyX19zZWFyY2ggLnNlYXJjaEZvcm1fX2lucHV0JykudmFsKCkpIHtcclxuXHRcdFx0JCgnLmhlYWRlcl9fc2VhcmNoIC5zZWFyY2hGb3JtX19pbnB1dCcpLnJlbW92ZUNsYXNzKCdzbGlkZScpO1xyXG5cdFx0XHQkKCcuaGVhZGVyX19zZWFyY2gnKS5yZW1vdmVDbGFzcygnc2xpZGUnKTtcclxuXHRcdH1cclxuXHR9KVxyXG5cdFxyXG5cdC8vIDTQnyDRgtGA0LjQs9Cz0LXRgFxyXG5cdGlmKCQoJyonKS5pcygnLmZvdXJQV3JhcCcpICYmICQod2luZG93KS53aWR0aCgpIDw9IDc2NyAmJiAhc2xpY2tUcmlnZ2VyKSB7XHJcblx0XHQkKCcuZm91clBXcmFwIC5jb2wteHMtMTInKS5zbGljayh7XHJcblx0XHQgIHNsaWRlc1RvU2hvdzogMSxcclxuXHRcdCAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcblx0XHQgIGFycm93czogZmFsc2VcclxuXHRcdH0pO1xyXG5cdFx0c2xpY2tUcmlnZ2VyID0gdHJ1ZTtcclxuXHR9IGVsc2UgaWYoJCgnKicpLmlzKCcuZm91clBXcmFwJykgJiYgJCh3aW5kb3cpLndpZHRoKCkgPj0gNzY4ICYmIHNsaWNrVHJpZ2dlcikge1xyXG5cdFx0JCgnLmZvdXJQV3JhcCAuY29sLXhzLTEyJykuc2xpY2soJ2Rlc3Ryb3knKTtcclxuXHRcdHNsaWNrVHJpZ2dlciA9IGZhbHNlO1xyXG5cdH1cclxuXHJcblx0Ly8g0LDQvdC40LzQsNGG0LjRjyDQsdC70L7QutC+0LIgNNCfXHJcblx0aWYoJCgnKicpLmlzKCcuZm91clAnKSkge1xyXG5cdFx0JCgnLmZvdXJQJykuaG92ZXIoZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciBsZWZ0ID0gJCh0aGlzKS5wb3NpdGlvbigpLmxlZnQsXHJcblx0XHRcdFx0cmlnaHQgPSAkKCcuZm91clBXcmFwIC5jb2wteHMtMTInKS53aWR0aCgpIC0gKCQodGhpcykucG9zaXRpb24oKS5sZWZ0ICsgICQodGhpcykud2lkdGgoKSlcclxuXHRcdFx0JCh0aGlzKS5zaWJsaW5ncygpLmNzcygncG9pbnRlci1ldmVudHMnLCdub25lJyk7XHJcblx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHQkKHRoaXMpLmZpbmQoJy5mb3VyUF9fdW5kZXInKS5hbmltYXRlKHtcclxuXHRcdFx0XHRsZWZ0OiAtbGVmdCxcclxuXHRcdFx0XHRyaWdodDogLXJpZ2h0LFxyXG5cdFx0XHR9LDEwMCk7XHJcblx0XHR9KTtcclxuXHRcdCQoJy5mb3VyUFdyYXAgLmZvdXJQJykubW91c2VsZWF2ZShmdW5jdGlvbigpIHtcclxuXHRcdFx0JCgnLmZvdXJQJykuY3NzKCdwb2ludGVyLWV2ZW50cycsJ2FsbCcpO1xyXG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdCQoJy5mb3VyUCcpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0fSwwKTtcclxuXHRcdFx0JCh0aGlzKS5maW5kKCcuZm91clBfX3VuZGVyJykuYW5pbWF0ZSh7XHJcblx0XHRcdFx0bGVmdDogJzUwJScsXHJcblx0XHRcdFx0cmlnaHQ6ICc1MCUnLFxyXG5cdFx0XHR9LDIwMCk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8vINCk0LjQu9GM0YLRgNCw0YbQuNGPINC60LDQsdC10LvQtdC5INCyINC60LDRgtC10LPQvtGA0LjQuFxyXG5cdGlmKCQoJyonKS5pcygnLmNhdGVnb3J5X19uYXYnKSkge1xyXG5cdFx0dmFyIHcgPSAkKCcuY2FibGVJdGVtJykud2lkdGgoKTtcclxuXHRcdCQoJy5jYXRlZ29yeV9fbmF2IGEnKS5jbGljayhmdW5jdGlvbihlKSB7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcdFx0XHRcclxuXHJcblx0XHRcdGlmKCQoJy5jYXRlZ29yeScpLmZpbmQoJy5jYWJsZUl0ZW1bZGF0YS10YXJnZXQ9XCInICsgJCh0aGlzKS5hdHRyKCdkYXRhLXRhcmdldCcpICsgJ1wiXScpLmhhc0NsYXNzKCdjYWJsZUl0ZW0taGlkZScpKSB7XHJcblx0XHRcdFx0JCgnLmNhdGVnb3J5JylcclxuXHRcdFx0XHQuZmluZCgnLmNhYmxlSXRlbVtkYXRhLXRhcmdldD1cIicgKyAkKHRoaXMpLmF0dHIoJ2RhdGEtdGFyZ2V0JykgKyAnXCJdJylcclxuXHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ2NhYmxlSXRlbS1oaWRlJylcclxuXHRcdFx0XHQuYW5pbWF0ZSh7XHJcblx0XHRcdFx0XHR3aWR0aDogdyxcclxuXHRcdFx0XHRcdCdtYXJnaW4tbGVmdCc6IDE1LFxyXG5cdFx0XHRcdFx0J21hcmdpbi1yaWdodCc6IDE1XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0JCgnLmNhdGVnb3J5JylcclxuXHRcdFx0XHQuZmluZCgnLmNhYmxlSXRlbTpub3QoW2RhdGEtdGFyZ2V0PVwiJyArICQodGhpcykuYXR0cignZGF0YS10YXJnZXQnKSArICdcIl0pJylcclxuXHRcdFx0XHQuYWRkQ2xhc3MoJ2NhYmxlSXRlbS1oaWRlJyk7XHJcblx0XHRcdFx0JCgnLmNhYmxlSXRlbS5jYWJsZUl0ZW0taGlkZScpXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0LmNzcygnd2lkdGgnLCcwJylcclxuXHRcdFx0XHRcdC5jc3MoJ21hcmdpbicsJzAnKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQkKCcuY2F0ZWdvcnknKVxyXG5cdFx0XHRcdC5maW5kKCcuY2FibGVJdGVtOm5vdChbZGF0YS10YXJnZXQ9XCInICsgJCh0aGlzKS5hdHRyKCdkYXRhLXRhcmdldCcpICsgJ1wiXSknKVxyXG5cdFx0XHRcdC5hZGRDbGFzcygnY2FibGVJdGVtLWhpZGUnKTtcclxuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0JCgnLmNhYmxlSXRlbS5jYWJsZUl0ZW0taGlkZScpXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0LmFuaW1hdGUoe1xyXG5cdFx0XHRcdFx0XHR3aWR0aDogMCxcclxuXHRcdFx0XHRcdCBcdCdtYXJnaW4nOiAwXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9LDEwMCk7XHJcblx0XHRcdH1cdFx0XHRcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0Ly8g0YLQvtGH0LrQuCDQvdCwINGB0YLRgNCw0L3QuNGG0LUg0LrQsNCx0LXQu9GPXHJcblx0aWYoJCgnKicpLmlzKCcuY2FibGVfX2RvdCcpKSB7XHJcblx0XHQkKCcuY2FibGVfX2RvdCcpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciBwYXJlbnRIZWlnaHQgPSAkKHRoaXMpLnBhcmVudCgpLm91dGVySGVpZ2h0KCk7XHJcblx0XHRcdHZhciBkb3RQb3NpdGlvbiA9ICQodGhpcykucG9zaXRpb24oKS50b3A7XHJcblx0XHRcdCQodGhpcykuY3NzKCdoZWlnaHQnLCBwYXJlbnRIZWlnaHQgLSBkb3RQb3NpdGlvbiAtIDQ4KTtcclxuXHRcdFx0JCh0aGlzKS5maW5kKCcuY2FibGVfX3BhcnROdW1iZXInKS5ob3ZlcihmdW5jdGlvbigpIHtcclxuXHRcdFx0XHQkKHRoaXMpLnBhcmVudCgpLnRvZ2dsZUNsYXNzKCdzaG93Jyk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cdFxyXG5cdC8vINGB0LvQsNC50LTQtdGAINGBINC/0LDQs9C40L3QsNGG0LjQtdC5XHJcbiAgICBpZigkKCcqJykuaGFzQ2xhc3MoJ2RvdFNsaWRlcicpKSB7XHJcbiAgICBcdHZhciBkb3RTd2lwZXIgPSBuZXcgU3dpcGVyKCcuZG90U2xpZGVyJywge1xyXG5cdCAgICAgIHBhZ2luYXRpb246IHtcclxuXHQgICAgICAgIGVsOiAnLnN3aXBlci1wYWdpbmF0aW9uJyxcclxuXHQgICAgICB9LFxyXG5cdCAgICB9KTtcclxuXHJcblx0ICAgIGlmKCQoJy5kb3RTbGlkZXIgLnN3aXBlci1zbGlkZScpLmxlbmd0aCA8PSAxKSB7XHJcblx0ICAgIFx0JCgnLmRvdFNsaWRlciAuc3dpcGVyLXBhZ2luYXRpb24nKS5oaWRlKCk7XHJcblx0ICAgIFx0JCgnLmRvdFNsaWRlcicpLmNzcygncG9pbnRlci1ldmVudHMnLCdub25lJyk7XHJcblx0ICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBib290c3RyYXAgdGFic1xyXG5cdGlmKCQoJyonKS5oYXNDbGFzcygnbmF2LXRhYnMnKSkge1xyXG5cdFx0JCgnLm5hdi10YWJzJykuYXBwZW5kKFwiPHNwYW4gY2xhc3M9J2Jhcic+PC9zcGFuPlwiKTsgLy8gY3JlYXRlIG5ldyBlbGVtZW50XHJcblx0XHR2YXIgJGJhciA9ICQoJy5uYXYtdGFicyAuYmFyJyk7XHJcblx0XHR2YXIgYmFyTGVmdCA9ICAkKCcubmF2LXRhYnMgbGkuYWN0aXZlJykucG9zaXRpb24oKS5sZWZ0O1xyXG5cdFx0dmFyIGJhcldpZHRoID0gJCgnLm5hdi10YWJzIGxpLmFjdGl2ZScpLndpZHRoKCk7XHJcblx0XHQkYmFyLmNzcygnd2lkdGgnLCBiYXJXaWR0aCkuY3NzKCdsZWZ0JywgYmFyTGVmdCk7XHJcblxyXG5cdFx0Ly8gZ2V0IGhvdmVyIG1lbnUgaXRlbSBwb3NpdGlvbiBhbmQgd2lkdGhcclxuXHRcdCQoJy5uYXYtdGFicyBsaScpLmhvdmVyKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQkYmFyLmNzcygnd2lkdGgnLCAkKHRoaXMpLndpZHRoKCkpLmNzcygnbGVmdCcsICQodGhpcykucG9zaXRpb24oKS5sZWZ0KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIHJldHVybiB0byB0aGUgb3JpZ2luYWwgcG9zaXRpb24gb2YgdGhlIGFjdGl2ZSBsaXN0IGl0ZW1cclxuXHRcdCQoJy5uYXYtdGFicycpLm1vdXNlbGVhdmUoZnVuY3Rpb24oKSB7XHJcblx0XHRcdCRiYXIuY3NzKCd3aWR0aCcsIGJhcldpZHRoKS5jc3MoJ2xlZnQnLCBiYXJMZWZ0KTsgIFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8g0YFoYW5naW5nIHRoZSBhY3RpdmUgbWVudSBpdGVtXHJcblx0XHQkKCcubmF2LXRhYnMgbGknKS5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdFx0YmFyTGVmdCA9ICAkKHRoaXMpLnBvc2l0aW9uKCkubGVmdDtcclxuXHRcdFx0YmFyV2lkdGggPSAkKHRoaXMpLndpZHRoKCk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8vINGB0LXQu9C10LrRgtGLXHJcblx0aWYoJCgnKicpLmhhc0NsYXNzKCdjdXN0b20tc2VsZWN0JykpIHtcclxuXHRcdCQoXCIuY3VzdG9tLXNlbGVjdFwiKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0ICB2YXIgY2xhc3NlcyA9ICQodGhpcykuYXR0cihcImNsYXNzXCIpLFxyXG5cdFx0ICAgICAgaWQgICAgICA9ICQodGhpcykuYXR0cihcImlkXCIpLFxyXG5cdFx0ICAgICAgbmFtZSAgICA9ICQodGhpcykuYXR0cihcIm5hbWVcIik7XHJcblx0XHQgIHZhciB0ZW1wbGF0ZSA9ICAnPGRpdiBjbGFzcz1cIicgKyBjbGFzc2VzICsgJ1wiPic7XHJcblx0XHQgICAgICB0ZW1wbGF0ZSArPSAnPHNwYW4gY2xhc3M9XCJjdXN0b20tc2VsZWN0LXRyaWdnZXJcIj4nICsgJCh0aGlzKS5hdHRyKFwicGxhY2Vob2xkZXJcIikgKyAnPC9zcGFuPic7XHJcblx0XHQgICAgICB0ZW1wbGF0ZSArPSAnPGRpdiBjbGFzcz1cImN1c3RvbS1vcHRpb25zXCI+JztcclxuXHRcdCAgICAgICQodGhpcykuZmluZChcIm9wdGlvblwiKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0ICAgICAgICB0ZW1wbGF0ZSArPSAnPHNwYW4gY2xhc3M9XCJjdXN0b20tb3B0aW9uXCIgZGF0YS12YWx1ZT1cIicgKyAkKHRoaXMpLmF0dHIoXCJ2YWx1ZVwiKSArICdcIj4nICsgJCh0aGlzKS5odG1sKCkgKyAnPC9zcGFuPic7XHJcblx0XHQgICAgICB9KTtcclxuXHRcdCAgdGVtcGxhdGUgKz0gJzwvZGl2PjwvZGl2Pic7XHJcblx0XHQgIFxyXG5cdFx0ICAkKHRoaXMpLndyYXAoJzxkaXYgY2xhc3M9XCJjdXN0b20tc2VsZWN0LXdyYXBwZXJcIj48L2Rpdj4nKTtcclxuXHRcdCAgJCh0aGlzKS5oaWRlKCk7XHJcblx0XHQgICQodGhpcykuYWZ0ZXIodGVtcGxhdGUpO1xyXG5cdFx0fSk7XHJcblx0XHQkKCcuY3VzdG9tLW9wdGlvbnMgLmN1c3RvbS1vcHRpb25bZGF0YS12YWx1ZT1cIicrICQoJy5jdXN0b20tc2VsZWN0IG9wdGlvbi5zZWxlY3Rpb24nKS5hdHRyKCd2YWx1ZScpICsnXCJdJykuYWRkQ2xhc3MoJ3NlbGVjdGlvbicpO1xyXG5cdFx0JChcIi5jdXN0b20tb3B0aW9uOmZpcnN0LW9mLXR5cGVcIikuaG92ZXIoZnVuY3Rpb24oKSB7XHJcblx0XHQgICQodGhpcykucGFyZW50cyhcIi5jdXN0b20tb3B0aW9uc1wiKS5hZGRDbGFzcyhcIm9wdGlvbi1ob3ZlclwiKTtcclxuXHRcdH0sIGZ1bmN0aW9uKCkge1xyXG5cdFx0ICAkKHRoaXMpLnBhcmVudHMoXCIuY3VzdG9tLW9wdGlvbnNcIikucmVtb3ZlQ2xhc3MoXCJvcHRpb24taG92ZXJcIik7XHJcblx0XHR9KTtcclxuXHRcdCQoXCIuY3VzdG9tLXNlbGVjdC10cmlnZ2VyXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdCAgJCgnaHRtbCcpLm9uZSgnY2xpY2snLGZ1bmN0aW9uKCkge1xyXG5cdFx0ICAgICQoXCIuY3VzdG9tLXNlbGVjdFwiKS5yZW1vdmVDbGFzcyhcIm9wZW5lZFwiKTtcclxuXHRcdCAgfSk7XHJcblx0XHQgICQodGhpcykucGFyZW50cyhcIi5jdXN0b20tc2VsZWN0XCIpLnRvZ2dsZUNsYXNzKFwib3BlbmVkXCIpO1xyXG5cdFx0ICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdH0pO1xyXG5cdFx0JChcIi5jdXN0b20tb3B0aW9uXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XHJcblx0XHQgICQodGhpcykucGFyZW50cyhcIi5jdXN0b20tc2VsZWN0LXdyYXBwZXJcIikuZmluZChcInNlbGVjdFwiKS52YWwoJCh0aGlzKS5kYXRhKFwidmFsdWVcIikpO1xyXG5cdFx0ICAkKHRoaXMpLnBhcmVudHMoXCIuY3VzdG9tLW9wdGlvbnNcIikuZmluZChcIi5jdXN0b20tb3B0aW9uXCIpLnJlbW92ZUNsYXNzKFwic2VsZWN0aW9uXCIpO1xyXG5cdFx0ICAkKHRoaXMpLmFkZENsYXNzKFwic2VsZWN0aW9uXCIpO1xyXG5cdFx0ICAkKHRoaXMpLnBhcmVudHMoXCIuY3VzdG9tLXNlbGVjdFwiKS5yZW1vdmVDbGFzcyhcIm9wZW5lZFwiKTtcclxuXHRcdCAgJCh0aGlzKS5wYXJlbnRzKFwiLmN1c3RvbS1zZWxlY3RcIikuZmluZChcIi5jdXN0b20tc2VsZWN0LXRyaWdnZXJcIikudGV4dCgkKHRoaXMpLnRleHQoKSk7XHJcblx0XHQgIGNoYW5nZVRhYmxlKCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRjaGFuZ2VUYWJsZSgpO1xyXG5cdFx0ZnVuY3Rpb24gY2hhbmdlVGFibGUoKSB7XHJcblx0XHRcdHZhciBhY3RpdmVPcHRpb24gPSAkKCcuY3VzdG9tLXNlbGVjdCAuY3VzdG9tLW9wdGlvbi5zZWxlY3Rpb24nKS5hdHRyKCdkYXRhLXZhbHVlJyk7XHJcblx0XHRcdGNvbnNvbGUubG9nKCdBY3RpdmUgb3B0aW9uOiAnICsgYWN0aXZlT3B0aW9uKTtcclxuXHRcdFx0JCgnLmNhYmxlT3B0aW9uc19fdGFibGUgdGFibGUnKS5oaWRlKCk7XHJcblx0XHRcdCQoJy5jYWJsZU9wdGlvbnNfX3RhYmxlIHRhYmxlW2RhdGEtdmFsdWU9XCInKyBhY3RpdmVPcHRpb24gKydcIl0nKS5zaG93KCk7XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0Ly8g0YHQu9Cw0LnQtNC10YAg0YEg0LzQuNC90LjQsNGC0Y7RgNCw0LzQuFxyXG5cdGlmKCQoJyonKS5oYXNDbGFzcygndGh1bWJTbGlkZXJNYWluJykpICB7XHRcdFxyXG5cdFx0ICQoJy50aHVtYlNsaWRlck1haW4nKS5zbGljayh7XHJcblx0XHQgIHNsaWRlc1RvU2hvdzogMSxcclxuXHRcdCAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcblx0XHQgIGFycm93czogdHJ1ZSxcclxuXHRcdCAgZmFkZTogdHJ1ZSxcclxuXHRcdCAgYXNOYXZGb3I6ICcudGh1bWJTbGlkZXJOYXYnXHJcblx0XHR9KTtcclxuXHRcdCQoJy50aHVtYlNsaWRlck5hdicpLnNsaWNrKHtcclxuXHRcdCAgc2xpZGVzVG9TaG93OiAzLFxyXG5cdFx0ICBzbGlkZXNUb1Njcm9sbDogMSxcclxuXHRcdCAgYXNOYXZGb3I6ICcudGh1bWJTbGlkZXJNYWluJyxcclxuXHRcdCAgaW5maW5pdGU6IHRydWUsXHJcblx0XHQgIGFycm93czogZmFsc2UsXHJcblx0XHQgIGNlbnRlck1vZGU6IHRydWUsXHJcblx0XHQgIGZvY3VzT25TZWxlY3Q6IHRydWUsXHJcblx0XHQgIHZhcmlhYmxlV2lkdGg6IHRydWVcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0Ly8g0L/QvtC00LPQvtC9INGC0L7Rh9C10Log0L/QviDRgNCw0LfQvNC10YDRgyDQutCw0YDRgtC40L3QutC4XHJcblx0aWYoJCgnKicpLmhhc0NsYXNzKCdjYWJsZV9faW1nV3JhcCcpICYmICQod2luZG93KS53aWR0aCgpID49IDEwMjQpIHtcclxuXHRcdCQoJy5jYWJsZV9faW1nV3JhcCcpLmNzcygnd2lkdGgnLCQodGhpcykuZmluZCgnLmNhYmxlX19pbWcnKS53aWR0aCgpKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0JCgnLmNhYmxlX19pbWdXcmFwJykuY3NzKCd3aWR0aCcsJzEwMCUnKTtcclxuXHR9XHJcblxyXG5cdC8vINC/0L7QtNCz0L7QvSDQstGL0YHQvtGC0Ysg0YHQtdC60YbQuNC4INC/0L4g0YDQsNC30LzQtdGA0YMg0LLQuNC00LXQvlxyXG5cdGlmKCQoJyonKS5oYXNDbGFzcygnbWFpblZpZGVvJykgJiYgJCh3aW5kb3cpLndpZHRoKCkgPD0gMTAyMyAmJiAkKHdpbmRvdykud2lkdGgoKSA+IDQxNCkge1xyXG5cdFx0JCgnLm1haW5WaWRlbycpLmNzcygnaGVpZ2h0JywkKCcubWFpblZpZGVvX192aWRlbycpLmhlaWdodCgpKTtcclxuXHR9IGVsc2UgaWYoJCgnKicpLmhhc0NsYXNzKCdtYWluVmlkZW8nKSAmJiAkKHdpbmRvdykud2lkdGgoKSA8IDQxNCkge1xyXG5cdFx0JCgnLm1haW5WaWRlbycpLmNzcygnaGVpZ2h0JywnJyk7XHJcblx0fVxyXG5cclxuXHQvLyDQv9C10YDQtdCy0L7QtCDQutCw0LHQtdC70YzQvdC+0LPQviDQvNC10L3RjiDQsiDQs9C+0YDQuNC30L7QvdGC0LDQu9GM0L3Ri9C5INCy0LjQtFxyXG5cdGlmKCQoJyonKS5oYXNDbGFzcygnY2FibGVNZW51V3JhcCcpICYmICQod2luZG93KS53aWR0aCgpIDw9IDc2Nykge1xyXG5cdFx0dmFyIHcgPSAwO1xyXG5cdFx0JCgnLmNhYmxlTWVudScpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdHcgKz0gJCh0aGlzKS53aWR0aCgpO1x0XHRcdFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0JCgnLmNhYmxlTWVudVdyYXAnKS5jc3MoJ21pbi13aWR0aCcsdyk7XHJcblx0XHRjb25zb2xlLmxvZygnQ2FibGUgbWVudSB3aWR0aDogJyArIHcpO1xyXG5cdH1cclxuXHJcblx0Ly8g0L/QvtC00LPQvtC9INCy0YvRgdC+0YLRiyDQutCw0YDRgtC40L3QutC4INC60L7RgNC+0YLQutC40YUg0L3QvtCy0L7RgdGC0LXQuVxyXG5cdGlmKCQoJyonKS5oYXNDbGFzcygnc2Vjb25kRXZlbnRzJykgJiYgJCh3aW5kb3cpLndpZHRoKCkgPD0gNzY3KVxyXG5cdFx0JCgnLnNlY29uZEV2ZW50cyAubWFpbkV2ZW50X19pbWcnKS5jc3MoJ2hlaWdodCcsJCgnLnNlY29uZEV2ZW50cyAubWFpbkV2ZW50X19pbmZvJykub3V0ZXJIZWlnaHQoKSk7XHJcblx0XHJcblxyXG5cdC8vINGB0L7Qt9C00LDQvdC40LUg0LzQvtCx0LjQu9GM0L3QvtCz0L4g0LzQtdC90Y5cclxuXHRpZighJCgnKicpLmhhc0NsYXNzKCdoYW1idXJnZXInKSAmJiAkKHdpbmRvdykud2lkdGgoKSA8PSA3NjcpIHtcclxuXHRcdCQoJy5oZWFkZXIgLnJvdycpLmFwcGVuZCgnPGRpdiBjbGFzcz1cImhhbWJ1cmdlclwiPjxzcGFuPjwvc3Bhbj48L2Rpdj4nKTtcclxuXHR9IGVsc2UgaWYoJCgnKicpLmhhc0NsYXNzKCdoYW1idXJnZXInKSAmJiAkKHdpbmRvdykud2lkdGgoKSA+IDc2Nykge1xyXG5cdFx0JCgnLmhhbWJ1cmdlcicpLmhpZGUoKTtcclxuXHR9IGVsc2UgaWYoJCgnKicpLmhhc0NsYXNzKCdoYW1idXJnZXInKSAmJiAkKHdpbmRvdykud2lkdGgoKSA8PSA3NjcpIHtcclxuXHRcdCQoJy5oYW1idXJnZXInKS5zaG93KCk7XHJcblx0fVxyXG5cclxuXHQvLyDQpNC+0YDQvNCwINC/0L7QtNCx0L7RgNCwINC60LDQsdC10LvRj1xyXG5cdGlmKCQoJyonKS5oYXNDbGFzcygnY2hvaWNlJykpIHtcclxuXHRcdCQoJy5jaG9pY2VfX21hcmsgaW5wdXQnKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XHJcblx0XHRcdGlmKCQoJy5jaG9pY2VfX21hcmsgaW5wdXQnKS52YWwoKSA9PSBcItCU0J/QolwiKSB7XHJcblx0XHRcdFx0JCgnLmNob2ljZScpLmFkZENsYXNzKCdzaG93Jyk7XHJcblx0XHRcdFx0JCgnLmNob2ljZV9fbWFyayAubWF0ZXJpYWwtaW5wdXQnKS5yZW1vdmVDbGFzcygnYWxlcnQtbXNnJyk7XHJcblx0XHRcdH0gZWxzZSBpZigkKCcuY2hvaWNlX19tYXJrIGlucHV0JykudmFsKCkgPT0gXCJcIikge1xyXG5cdFx0XHRcdCQoJy5jaG9pY2UnKS5yZW1vdmVDbGFzcygnc2hvdycpO1xyXG5cdFx0XHRcdCQoJy5jaG9pY2VfX21hcmsgLm1hdGVyaWFsLWlucHV0JykucmVtb3ZlQ2xhc3MoJ2FsZXJ0LW1zZycpO1xyXG5cdFx0XHR9IGVsc2Uge1x0XHRcdFx0XHJcblx0XHRcdFx0JCgnLmNob2ljZScpLnJlbW92ZUNsYXNzKCdzaG93Jyk7XHJcblx0XHRcdFx0JCgnLmNob2ljZV9fbWFyayAubWF0ZXJpYWwtaW5wdXQnKS5hZGRDbGFzcygnYWxlcnQtbXNnJyk7XHJcblx0XHRcdH1cclxuXHRcdH0pIFxyXG5cdH1cclxuXHJcblx0Ly9cclxuXHRpZigkKCcqJykuaXMoJy5jb21wYW55SXRlbScpKSB7XHJcblx0XHQvLyDQtNC+0LHQsNCy0LvQtdC90LjQtSDQutGA0YPQs9CwINC6INC60LDQttC00L7QuSDQutC+0LzQsNC90LjQuFxyXG5cdFx0JCgnLmNvbXBhbnlJdGVtJykuYXBwZW5kKCc8c3BhbiBjbGFzcz1cImNpcmNsZVwiPjwvc3Bhbj4nKTtcclxuXHJcblx0XHQvLyDQn9C10YDQtdCx0L7RgCDQsdC70L7QutC+0LIg0LjQvdGE0L7RgNC80LDRhtC40LhcclxuXHRcdGZvcih2YXIgaSA9IDAsIHBvc1ggPSAwLCByb3cgPSAxOyBpIDw9ICQoJy5jb21wYW55SW5mbycpLmxlbmd0aCArIDE7IGkrKykge1xyXG5cdFx0XHQkKCcuY29tcGFueUluZm8nKS5lcShpKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdCQodGhpcykuYXR0cignZGF0YS1oZWlnaHQnLCAkKHRoaXMpLmhlaWdodCgpKS5jc3MoJ2hlaWdodCcsMCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vINCf0LXRgNC10LHQvtGAINCx0LvQvtC60L7QsiDQutC+0LzQsNC90LjQuVxyXG5cdFx0Zm9yKHZhciBpID0gMCwgcG9zWCA9IDAsIHJvdyA9IDE7IGkgPD0gJCgnLmNvbXBhbnlJdGVtJykubGVuZ3RoICsgMTsgaSsrKSB7XHJcblx0XHRcdCQoJy5jb21wYW55SXRlbScpLmVxKGkpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0aWYoJCh0aGlzKS5wb3NpdGlvbigpLnRvcCA+IHBvc1gpIHsgLy8g0JXRgdC70Lgg0YHRgtC+0Y/RgiDQvdCwINC+0LTQvdC+0Lkg0YHRgtGA0L7QutC1XHJcblx0XHRcdFx0XHRyb3crKztcclxuXHRcdFx0XHRcdHBvc1ggPSAkKHRoaXMpLnBvc2l0aW9uKCkudG9wO1xyXG5cdFx0XHRcdFx0JCh0aGlzKS5hdHRyKCdkYXRhLXJvdycsIHJvdyk7XHJcblx0XHRcdFx0XHQkKHRoaXMpLm5leHQoJy5jb21wYW55SW5mbycpLmF0dHIoJ2RhdGEtcm93Jywgcm93KS5jc3MoJ3RvcCcsIHBvc1ggKyAkKHRoaXMpLmhlaWdodCgpICsgMzApO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQkKHRoaXMpLmF0dHIoJ2RhdGEtcm93Jywgcm93KTtcclxuXHRcdFx0XHRcdCQodGhpcykubmV4dCgnLmNvbXBhbnlJbmZvJykuYXR0cignZGF0YS1yb3cnLCByb3cpLmNzcygndG9wJywgcG9zWCArICQodGhpcykuaGVpZ2h0KCkgKyAzMCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyDQoNCw0LfQstC10YDRgtGL0LLQsNC90LjQtSDQsdC70L7QutCwINGBINC40L3RhNC+0YDQvNCw0YbQuNC10Lkg0Lgg0YHQtNCy0LjQsyDQvdC40LbQvdC40YUg0YHRgtGA0L7QulxyXG5cdFx0JCgnLmNvbXBhbnlJdGVtJykuY2xpY2soZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0XHQvLyDQntC/0YDQtdC00LXQu9C10L3QuNC1INC/0L7Qt9C40YbQuNC4INC60YPRgNGB0L7RgNCwINC00LvRjyDQsNC90LjQvNCw0YbQuNC4INC60YDRg9Cz0LBcclxuXHRcdFx0dmFyIHBhcmVudE9mZnNldCA9ICQodGhpcykub2Zmc2V0KCk7IFxyXG5cdFx0XHR2YXIgcmVsWCA9IGUucGFnZVggLSBwYXJlbnRPZmZzZXQubGVmdDtcclxuXHRcdFx0dmFyIHJlbFkgPSBlLnBhZ2VZIC0gcGFyZW50T2Zmc2V0LnRvcDtcclxuXHRcdFx0JCgnLmNvbXBhbnlJdGVtJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHQkKCcuY2FyZHMgLnJhZGlvIC5jaXJjbGUnKS5yZW1vdmVDbGFzcygnYW5pbWF0ZScpLmNzcygnbGVmdCcsJ2luaXRpYWwnKS5jc3MoJ3RvcCcsJ2luaXRpYWwnKTtcclxuXHQgICAgICAgICQodGhpcykuZmluZCgnLmNpcmNsZScpLmNzcygnbGVmdCcscmVsWCkuY3NzKCd0b3AnLHJlbFkpLnRvZ2dsZUNsYXNzKCdhbmltYXRlJyk7XHJcblx0ICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcclxuXHJcblxyXG5cdFx0XHRpZigkKHRoaXMpLm5leHQoJy5jb21wYW55SW5mbycpLmhhc0NsYXNzKCdzbGlkZScpKSB7XHJcblx0XHRcdFx0JCh0aGlzKS5uZXh0KCcuY29tcGFueUluZm8nKS5yZW1vdmVDbGFzcygnc2xpZGUnKS5jc3MoJ2hlaWdodCcsIDApO1xyXG5cclxuXHRcdFx0XHR2YXIgcm93ID0gcGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdkYXRhLXJvdycpKSArIDE7XHJcblx0XHRcdFx0JCgnLmNvbXBhbnlJdGVtW2RhdGEtcm93PVwiJysgcm93ICsnXCJdJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdCQodGhpcykuY3NzKCdtYXJnaW4tdG9wJywgMCk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0JCgnLmNvbXBhbnlJbmZvJykucmVtb3ZlQ2xhc3MoJ3NsaWRlJykuY3NzKCdoZWlnaHQnLCAwKTtcclxuXHRcdFx0XHQkKCcuY29tcGFueUl0ZW1bZGF0YS1yb3c9XCInKyByb3cgKydcIl0nKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0JCh0aGlzKS5jc3MoJ21hcmdpbi10b3AnLCAwKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHR2YXIgaW5mb0hlaWdodCA9IHBhcnNlSW50KCQodGhpcykubmV4dCgnLmNvbXBhbnlJbmZvJykuYXR0cignZGF0YS1oZWlnaHQnKSkgKyAzMDtcclxuXHRcdFx0XHQkKHRoaXMpLm5leHQoJy5jb21wYW55SW5mbycpLmFkZENsYXNzKCdzbGlkZScpLmNzcygnaGVpZ2h0JywgaW5mb0hlaWdodCk7XHJcblxyXG5cdFx0XHRcdHZhciByb3cgPSBwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtcm93JykpICsgMTtcclxuXHRcdFx0XHQkKCcuY29tcGFueUl0ZW1bZGF0YS1yb3c9XCInKyByb3cgKydcIl0nKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0JCh0aGlzKS5jc3MoJ21hcmdpbi10b3AnLCBpbmZvSGVpZ2h0KTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdH0pO1xyXG5cdH1cdFxyXG5cclxufSk7XHJcblxyXG4kKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCkge1xyXG5cdHNhbWVIZWlnaHQoJy5mb3VyUF9fb3ZlcicpO1xyXG5cdGluY2FiRmVhdHVyZXMoKTtcdFxyXG5cdC8vIDTQnyDRgtGA0LjQs9Cz0LXRgFxyXG5cdGlmKCQoJyonKS5pcygnLmZvdXJQV3JhcCcpICYmICQod2luZG93KS53aWR0aCgpIDw9IDc2NyAmJiAhc2xpY2tUcmlnZ2VyKSB7XHJcblx0XHQkKCcuZm91clBXcmFwIC5jb2wteHMtMTInKS5zbGljayh7XHJcblx0XHQgIHNsaWRlc1RvU2hvdzogMSxcclxuXHRcdCAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcblx0XHQgIGFycm93czogZmFsc2VcclxuXHRcdH0pO1xyXG5cdFx0c2xpY2tUcmlnZ2VyID0gdHJ1ZTtcclxuXHR9IGVsc2UgaWYoJCgnKicpLmlzKCcuZm91clBXcmFwJykgJiYgJCh3aW5kb3cpLndpZHRoKCkgPj0gNzY4ICYmIHNsaWNrVHJpZ2dlcikge1xyXG5cdFx0JCgnLmZvdXJQV3JhcCAuY29sLXhzLTEyJykuc2xpY2soJ2Rlc3Ryb3knKTtcclxuXHRcdHNsaWNrVHJpZ2dlciA9IGZhbHNlO1xyXG5cdH1cclxuXHJcblx0Ly8g0L/QvtC00LPQvtC9INGC0L7Rh9C10Log0L/QviDRgNCw0LfQvNC10YDRgyDQutCw0YDRgtC40L3QutC4XHJcblx0aWYoJCgnKicpLmhhc0NsYXNzKCdjYWJsZV9faW1nV3JhcCcpICYmICQod2luZG93KS53aWR0aCgpID49IDEwMjQpIHtcclxuXHRcdCQoJy5jYWJsZV9faW1nV3JhcCcpLmNzcygnd2lkdGgnLCQodGhpcykuZmluZCgnLmNhYmxlX19pbWcnKS53aWR0aCgpKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0JCgnLmNhYmxlX19pbWdXcmFwJykuY3NzKCd3aWR0aCcsJzEwMCUnKTtcclxuXHR9XHJcblxyXG5cdC8vINC/0L7QtNCz0L7QvSDQstGL0YHQvtGC0Ysg0YHQtdC60YbQuNC4INC/0L4g0YDQsNC30LzQtdGA0YMg0LLQuNC00LXQvlxyXG5cdGlmKCQoJyonKS5oYXNDbGFzcygnbWFpblZpZGVvJykgJiYgJCh3aW5kb3cpLndpZHRoKCkgPD0gMTAyMyAmJiAkKHdpbmRvdykud2lkdGgoKSA+IDQxNCkge1xyXG5cdFx0JCgnLm1haW5WaWRlbycpLmNzcygnaGVpZ2h0JywkKCcubWFpblZpZGVvX192aWRlbycpLmhlaWdodCgpKTtcclxuXHR9IGVsc2UgaWYoJCgnKicpLmhhc0NsYXNzKCdtYWluVmlkZW8nKSAmJiAkKHdpbmRvdykud2lkdGgoKSA8IDQxNCkge1xyXG5cdFx0JCgnLm1haW5WaWRlbycpLmNzcygnaGVpZ2h0JywnJyk7XHJcblx0fVxyXG5cclxuXHQvLyDRgdC+0LfQtNCw0L3QuNC1INC80L7QsdC40LvRjNC90L7Qs9C+INC80LXQvdGOXHJcblx0aWYoISQoJyonKS5oYXNDbGFzcygnaGFtYnVyZ2VyJykgJiYgJCh3aW5kb3cpLndpZHRoKCkgPD0gNzY3KSB7XHJcblx0XHQkKCcuaGVhZGVyIC5yb3cnKS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJoYW1idXJnZXJcIj48c3Bhbj48L3NwYW4+PC9kaXY+Jyk7XHJcblx0fSBlbHNlIGlmKCQoJyonKS5oYXNDbGFzcygnaGFtYnVyZ2VyJykgJiYgJCh3aW5kb3cpLndpZHRoKCkgPiA3NjcpIHtcclxuXHRcdCQoJy5oYW1idXJnZXInKS5oaWRlKCk7XHJcblx0fSBlbHNlIGlmKCQoJyonKS5oYXNDbGFzcygnaGFtYnVyZ2VyJykgJiYgJCh3aW5kb3cpLndpZHRoKCkgPD0gNzY3KSB7XHJcblx0XHQkKCcuaGFtYnVyZ2VyJykuc2hvdygpO1xyXG5cdH1cclxuXHJcblx0Ly8g0L/QvtC00LPQvtC9INCy0YvRgdC+0YLRiyDQutCw0YDRgtC40L3QutC4INC60L7RgNC+0YLQutC40YUg0L3QvtCy0L7RgdGC0LXQuVxyXG5cdGlmKCQoJyonKS5oYXNDbGFzcygnc2Vjb25kRXZlbnRzJykgJiYgJCh3aW5kb3cpLndpZHRoKCkgPD0gNzY3KVxyXG5cdFx0JCgnLnNlY29uZEV2ZW50cyAubWFpbkV2ZW50X19pbWcnKS5jc3MoJ2hlaWdodCcsJCgnLnNlY29uZEV2ZW50cyAubWFpbkV2ZW50X19pbmZvJykub3V0ZXJIZWlnaHQoKSk7XHJcbn0pO1xyXG5cclxuJChkb2N1bWVudCkuYmluZCgnY2hhbmdlJywgZnVuY3Rpb24oZSl7XHJcbiAgICBpZiggJChlLnRhcmdldCkuaXMoJzppbnZhbGlkJykgKXtcclxuICAgICAgICAkKGUudGFyZ2V0KS5hZGRDbGFzcygnaW52YWxpZC1pbnB1dCcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAkKGUudGFyZ2V0KS5yZW1vdmVDbGFzcygnaW52YWxpZC1pbnB1dCcpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbiQod2luZG93KS5vbignbG9hZCcsIGZ1bmN0aW9uKCl7IFxyXG5cdGNvbnNvbGUubG9nKCdQQUdFX09OTE9BRCcpO1xyXG59KTtcclxuXHJcbi8vINC60LDRgNGC0LAg0LIg0LrQvtC90YLQsNC60YLQsNGFXHJcbmlmKCQoJyonKS5oYXNDbGFzcygnb2ZmaWNlX19tYXAnKSkge1xyXG5cdHZhciBtYXBPZmZpY2U7XHJcblx0eW1hcHMucmVhZHkoaW5pdCk7XHJcblxyXG5cdGZ1bmN0aW9uIGluaXQgKCkge1xyXG5cdCAgICAvLyDQodC+0LfQtNCw0L3QuNC1INGN0LrQt9C10LzQv9C70Y/RgNCwINC60LDRgNGC0Ysg0Lgg0LXQs9C+INC/0YDQuNCy0Y/Qt9C60LAg0Log0LrQvtC90YLQtdC50L3QtdGA0YNcclxuXHQgICAgbWFwT2ZmaWNlID0gbmV3IHltYXBzLk1hcCgnbWFwT2ZmaWNlJywge1xyXG5cdCAgICAgICAgLy8g0YbQtdC90YLRgCDQuCDQutC+0Y3RhNGE0LjRhtC40LXQvdGCINC80LDRgdGI0YLQsNCx0LjRgNC+0LLQsNC90LjRjy5cclxuXHQgICAgICAgIGNlbnRlcjogWzU3Ljk5OTk2OSwgNTYuMjcwODQzXSxcclxuXHQgICAgICAgIHpvb206IDE2XHJcblx0ICAgIH0sIHtcclxuXHQgICAgICAgIHNlYXJjaENvbnRyb2xQcm92aWRlcjogJ3lhbmRleCNzZWFyY2gnXHJcblx0ICAgIH0pO1xyXG5cclxuXHQgICAgbWFwT2ZmaWNlLmJlaGF2aW9ycy5kaXNhYmxlKCdzY3JvbGxab29tJyk7IFxyXG5cclxuXHR9XHJcbn0iXSwiZmlsZSI6Im1haW4uanMifQ==
