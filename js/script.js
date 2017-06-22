var s, scrollTimer;

function detectBrowser() {

  var myNav = navigator.userAgent.toLowerCase(),
    html = document.documentElement;

  if ((myNav.indexOf('msie') != -1)) {
    ie = ((myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false);
    html.className += ' mustdie';
    html.className += ' ie' + ie;
  } else if (!!myNav.match(/trident.*rv\:11\./)) {
    ie = 11;
    html.className += ' ie' + ie;
  }

  if (myNav.indexOf('safari') != -1) {
    if (myNav.indexOf('chrome') == -1) {
      html.className += ' safari';
    } else {
      html.className += ' chrome';
    }
  }

  if (myNav.indexOf('firefox') != -1) {
    html.className += ' firefox';
  }

  if ((myNav.indexOf('windows') != -1)) {
    html.className += ' windows';
  }
}

detectBrowser();

var mainSlider,
  wnd,
  doc,
  isotop,
  preload_offset = 200,
  mainSliderSettings = {
    dots: false,
    mobileFirst: true,
    infinite: false,
    arrows: false,
    swipe: false,
    fade: true,
    speed: 500,
    zIndex: 1,
    initialSlide: 0,
    slide: '.mainSlider .slide',
    slidesToShow: 1,
    touchThreshold: 10
  },
  animation_timer,
  animations_exit = [
    "bounce", "flash", "pulse", "rubberBand", "shake", "swing", "tada", "wobble", "jello", "bounceOut", "bounceOutDown", "bounceOutLeft", "bounceOutRight", "bounceOutUp", "fadeOut", "fadeOutDown", "fadeOutDownBig", "fadeOutLeft", "fadeOutLeftBig", "fadeOutRight", "fadeOutRightBig", "fadeOutUp", "fadeOutUpBig", "rotateOut", "rotateOutDownLeft", "rotateOutDownRight", "rotateOutUpLeft", "rotateOutUpRight", "slideOutUp", "slideOutDown", "slideOutLeft", "slideOutRight", "zoomOut", "zoomOutDown", "zoomOutLeft", "zoomOutRight", "zoomOutUp"],
  animations_entrance = [
    "bounce", "flash", "pulse", "rubberBand", "shake", "swing", "tada", "wobble", "jello", "bounceIn", "bounceInDown", "bounceInLeft", "bounceInRight", "bounceInUp", "fadeIn", "fadeInDown", "fadeInDownBig", "fadeInLeft", "fadeInLeftBig", "fadeInRight", "fadeInRightBig", "fadeInUp", "fadeInUpBig", "flip", "flipInX", "flipInY", "flipOutX", "flipOutY", "lightSpeedIn", "lightSpeedOut", "rotateIn", "rotateInDownLeft", "rotateInDownRight", "rotateInUpLeft", "rotateInUpRight", "slideInUp", "slideInDown", "slideInLeft", "slideInRight", "zoomIn", "zoomInDown", "zoomInLeft", "zoomInRight", "zoomInUp", "rollIn", "rollOut"];

$(function ($) {

  wnd = $(window);
  doc = $(document);

  $('.mainSlider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {

    $('.slide_vis').removeClass('slide_vis');

    animateOnce($(slick.$slides[slick.currentSlide]),
      'fadeOutUpBig'
      // animations_exit[~~(Math.random() * animations_exit.length - 1)]
      , 'animated');

  }).on('afterChange', function (event, slick, currentSlide, nextSlide) {
    var slide = $(slick.$slides[slick.currentSlide]);

    // animation_timer = setTimeout(function () {
    //   animateOnce(slide, 'fadeInUpBig' 
    //   // animations_entrance[~~(Math.random() * animations_entrance.length - 1)]
    //     , 'animated');
    // }, 1);

  });

  $('.slideTo').on('click', function () {
    var firedEl = $(this);

    if (mainSlider != void 0) {
      mainSlider.slick('slickGoTo', firedEl.attr('data-slide'));
    } else {
      docScrollTo($(firedEl.attr('href')).offset().top, 800);
    }

    return false;
  });

  initMainSlider();

  // $('.mCSB').each(function (ind) {
  //   $(this).mCustomScrollbar({
  //     documentTouchScroll: true,
  //     theme: "dark",
  //     scrollEasing: "linear",
  //     mouseWheel: {preventDefault: true}
  //   });
  // });

  isotop = $('#grid');

  isotop.imagesLoaded(function () {

    isotop.one('arrangeComplete', function () {
      if (isotop.is(':visible')) isotop.addClass('loaded');
    });

    isotop.isotope({
      layoutMode: 'packery',
      transitionDuration: 0,
      packery: {
        gutter: 0
      },
      itemSelector: '.box',
      percentPosition: true
    });
  });

  $('body')
    .delegate('.projectPreviewBtn', 'click', function (e) {
      var preview = $(this), box = preview.closest('.box'), isotop_item = $('<li class="box _full"><div class="project_main_img"><div class="browser"><span></span><img src=""></div></div></li>');

      if (!box.hasClass('_full')) {
        isotop_item.find('img').one('load', function () {
          box.remove();

          $('.box._full').last().after(isotop_item);

          setTimeout(function () {
            $('#grid').isotope('reloadItems').isotope();
          }, 1);
        }).attr('src', preview.attr('data-target'));
      }
    })
    .delegate('.slide', 'touchmove', function (e) {
      // console.log('touchmove');
      checkNextProjectLoader();
    });

  $('.slide').on('mousewheel', function (event) {
    // console.log('mousewheel');
    checkNextProjectLoader();
  });

});

$(window).resize(function () {
  initMainSlider();
});

function checkNextProjectLoader() {

  // console.log(doc.scrollTop(), wnd.height(), nextPr.offset().top, nextPr.outerHeight());

  if (doc.scrollTop()) { // touch
    // if (nextPr.offset().top <= doc.scrollTop() + wnd.height()) {
    //   // nextPr.find('.main_content > .section_inner').addClass('next_loaded animated bounceInUp next_loaded');
    //
    //   console.log(123);
    //  
    //   nextPr.css('margin-top', -(Math.max(nextPr.find('.main_content > .section_inner').offset().top - wnd.height() - doc.scrollTop(), 0)));
    //
    // }

  } else { // desktop


    //clearTimeout(scrollTimer);

    //scrollTimer = setTimeout(function () {

      var nextPr = $('.nextProject'), nextProjectMarker = $('.nextProjectMarker');
      var nextPrSContent = nextPr.find('.projectContainer'), prBlock = nextPrSContent.find('.project_w');

      var project_block_start_pos = wnd.height() * 4 / 5;
      var project_browser_start_pos = wnd.height() / 1.5;
      var browser_scroll_speed = 3;

      //project_block_start_pos = wnd.height() / 5;

      //console.log(project_block_start_pos, wnd.height(), nextPrSContent.outerHeight(), nextProjectMarker.offset().top);


      if (project_block_start_pos > nextProjectMarker.offset().top) {
        if (nextPrSContent.outerHeight() > nextProjectMarker.offset().top) {

        }

        if (project_browser_start_pos <= nextProjectMarker.offset().top) {
          nextPrSContent.css('margin-top', -(project_block_start_pos - nextProjectMarker.offset().top));
        } else {
          prBlock.css('margin-top', -(Math.min(wnd.height() / 2, browser_scroll_speed * (project_browser_start_pos - nextProjectMarker.offset().top))));
        }
      } else {
        nextPrSContent.css('margin-top', 0);
        prBlock.css('margin-top', 0);
      }
    //}, 1);

  }
}

function initMainSlider() {

  if ($(window).width() >= 768) {
    if (mainSlider == void 0) {
      mainSlider = $('.mainSlider').slick(mainSliderSettings);
    }
  } else {
    if (mainSlider != void 0) {
      mainSlider.slick('unslick');
      mainSlider = void 0;
    }
  }
}

function docScrollTo(pos, speed, callback) {

  $('html,body').animate({'scrollTop': pos}, speed, function () {
    if (typeof(callback) == 'function') {
      callback();
    }
  });
}

function animateOnce(el, addClass, removeClass) {
  // console.log(addClass);
  el.addClass(addClass + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
    $(this).removeClass(addClass + ' ' + removeClass);
  });
}

$(window).resize(function () {

}).load(function () {

  //s = skrollr.init();

});
