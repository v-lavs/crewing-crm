/**
 *To include js file from libraries write: `//= include ./path-to-file`
* */

//= include lib/jquery-3.3.1.min.js
//= include lib/pure-swipe.min.js
//= include lib/simple-lightbox.min.js

/**
 * CUSTOM SCRIPTS
 **/

$(document).ready(function () {
  $('a[href="#"]').on('click', function (e) {
    e.preventDefault();
  });

  /***
   * SMOOTH SCROLL TO ANCHOR
   **/

  function smoothScrollToAnchor (selector) {
    $(selector).on('click', function (event) {
      var anchor = $.attr(this, 'href');

      if(anchor.match(/^#/) && anchor !== '#') {
        event.preventDefault();

        $('html, body').animate({
          scrollTop: $($.attr(this, 'href')).offset().top -80
        }, 1000);
      }
    });
  }

  smoothScrollToAnchor('#requestDemo');
  smoothScrollToAnchor('.header .nav-link');

  /**
   * STICKY-HEADER
   **/

  var scrolled;

  function addScrollClass () {
    scrolled = window.pageYOffset || document.documentElement.scrollTop;
    if (scrolled > 40) {
      $('.header').addClass('scroll');
    } else {
      $('.header').removeClass('scroll');
    }
  }

  addScrollClass();

  $(window).on('scroll', function () {
    addScrollClass();
  });

  /**
   *  TOGGLE ACTIVE CLASS
   * */

  $('.header .nav-link').click(function (e) {
    e.preventDefault();
    $('.header .nav-link').removeClass('active');
    $(this).addClass('active');
  });

  /**
   * MOB MENU SCRIPT
   **/

  var nav = $('.header-menu');

  $('.burger').click(function (e) {
    e.preventDefault();
    nav.addClass('open');
    jQuery('.backdrop').fadeIn();
  });

  $('.close-nav, .backdrop').click(function (e) {
    e.preventDefault();
    nav.removeClass('open');
    jQuery('.backdrop').fadeOut();
  });

  /**
   * FORM VALIDATION
   */

  function showError (condition, errorId, el, errContainer, message) {
    if (condition) {
      if (errContainer.empty()) {
        errContainer.append('<p error-id="' + errorId + '">' + message + '</p>');
        $(el).addClass('is-invalid');
      }
    }
    else {
      errContainer.find('[error-id=' + errorId + ']').remove();
      $(el).removeClass('is-invalid');
    }
  }

  function requiredField (node) {
    var fieldVal = $(node).val().trim();
    var errContainer = $(node).siblings('.invalid-feedback');
    var msg = 'Required field';

    showError(!fieldVal, 'empty', node, errContainer, msg);
  }

  function isEmail (node) {
    var regEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var fieldVal = $(node).val().trim();
    var errContainer = $(node).siblings('.invalid-feedback');
    var msg = 'Not valid email';

    showError(!regEmail.test(fieldVal), 'email', node, errContainer, msg);
  }

  $('[required]').on('blur', function () {
    requiredField(this);
  });

  $('[type="email"]').on('blur', function () {
    isEmail(this);
  });

  /**
   * SIMPLE LIGHTBOX FOR IMAGES
   */

  var lightbox = $('.card-slider a').simpleLightbox();

  /**
   * RESPONSIVE CARDS SWIPER
   */

  function vSlider () {
    var slideWidth, slideListWidth, offset,
      slider = $('#responsiveCards'),
      slides = slider.find('.card-slide'),
      index = 0,
      defWidth = $(window).width();

    function setDimensions () {
      if (defWidth <= 991) {
        slideWidth = slider.width();
        slideListWidth = slideWidth * slides.length;
        offset = 0;

        $('.col-card-list').css({
          'width': slideListWidth + 'px',
          'transform': 'translateX(' + '-' + offset + 'px)'
        });
        $('.card-slide').css({'width': slideWidth + 'px'});
      }
    }

    function resetStyles () {
      $('.col-card-list').removeAttr('style');
      $('.card-slide').removeAttr('style');
      index = 0;
    }

    resetStyles();
    setDimensions();

    function moveLeft () {
      if (Math.round(Math.abs(offset)) < Math.round(slideListWidth - slideWidth)) {
        offset += slideWidth;
        ++index;
        $('.col-card-list').css({
          'transform': 'translateX(' + '-' + offset + 'px)'
        });
        changeActiveDot();
      }
    }

    function moveRight () {
      if (offset !== 0 && Math.round(Math.abs(offset)) >= Math.round(slideWidth)) {
        --index;
        offset -= slideWidth;
        $('.col-card-list').css({
          'transform': 'translateX(' + '-' + offset + 'px)'
        });
        changeActiveDot();
      }
    }

    function renderDots () {
      var wrapperDots = $('.dots-wrap');
      var dotsCount = slides.length;
      for (var i = 0; i < dotsCount; i++) {
        if (i === 0) {
          wrapperDots.append('<div class="dot active"></div>');
        }
        else {
          wrapperDots.append('<div class="dot"></div>');
        }
      }
    }

    function changeActiveDot () {
      var dots = $('.dots-wrap .dot');
      dots.removeClass('active');
      dots.eq(index).addClass('active');
    }

    function dotsChangeSlide() {
      $(document).on('click', '.dots-wrap .dot', function () {
        index = $(this).index();
        changeActiveDot();
        offset = slideWidth * index;
        $('.col-card-list').css({
          'transform': 'translateX(' + '-' + offset + 'px)'
        });
      });
    }

    function addEvents () {
      document.getElementById('responsiveCards').addEventListener('swiped-left', moveLeft);
      document.getElementById('responsiveCards').addEventListener('swiped-right', moveRight);
    }

    function deleteEvents () {
      document.getElementById('responsiveCards').removeEventListener('swiped-left', moveLeft);
      document.getElementById('responsiveCards').removeEventListener('swiped-right', moveRight);
    }

    dotsChangeSlide();
    renderDots();
    changeActiveDot();



    addEvents();

    /**
     * RECALCULATE SLIDES DIMENSION AFTER RESIZE EVENT END
     */

    var resizeListener;
    var pause = 150;

    $(window).on('resize', function () {
      clearTimeout(resizeListener);

      resizeListener = setTimeout(function () {
        var windowWidth = $(window).width();

        if (windowWidth >= 991) {
          resetStyles();
          deleteEvents();
        }
        else {
          if (defWidth !== windowWidth) {
            setDimensions();
            addEvents();
          }
        }
      }, pause);
    });
  }

  vSlider();
});