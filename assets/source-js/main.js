/**
 * CUSTOM SCRIPTS
 **/

$(document).ready(function () {
  $('a[href="#"]').on('click', function (e) {
    e.preventDefault();
  });

  /**
   * STICKY-HEADER
   **/
  var scrolled;

  function addScrollClass () {
    scrolled = window.pageYOffset || document.documentElement.scrollTop;
    if (scrolled > 120) {
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
   * MOB MENU SCRIPT
   **/

  var nav = $('.menu-header');
  $('.burger').click(function (e) {
    e.preventDefault();
    nav.addClass('open');
    jQuery('.backdrop').fadeIn();
  });
  $('.close-nav').click(function (e) {
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
        errContainer.append('<p error-id="'+ errorId +'">'+ message +'</p>');
        $(el).addClass('is-invalid');
      }
    }
    else {
      errContainer.find('[error-id='+ errorId +']').remove();
      $(el).removeClass('is-invalid');
    }
  }

  function requiredField (node) {
    var fieldVal = $(node).val().trim();
    var errContainer = $(node).siblings('.invalid-feedback');
    var msg = "Required field";

    showError(!fieldVal,"empty", node, errContainer,  msg);
  }

  function isEmail (node) {
    var regEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var fieldVal = $(node).val().trim();
    var errContainer = $(node).siblings('.invalid-feedback');
    var msg = "Not valid email";

    showError(!regEmail.test(fieldVal), "email", node, errContainer,  msg);
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
      defWidth = $(window).width();

    function setDimensions () {
      var newWidth = $(window).width();
      if (defWidth <= 991 && defWidth !== newWidth) {
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
    }

    resetStyles();
    setDimensions();

    function moveLeft () {
      if (Math.abs(offset) < slideListWidth - slideWidth) {
        offset += slideWidth;
        $('.col-card-list').css({
          'transform': 'translateX(' + '-' + offset + 'px)'
        });
      }
    }

    function moveRight () {
      if (offset !== 0 && Math.abs(offset) >= slideWidth) {
        offset -= slideWidth;
        $('.col-card-list').css({
          'transform': 'translateX(' + '-' + offset + 'px)'
        });
      }
    }

    function addEvents () {
      document.getElementById('responsiveCards').addEventListener('swiped-left', moveLeft);
      document.getElementById('responsiveCards').addEventListener('swiped-right', moveRight);
    }

    function deleteEvents () {
      document.getElementById('responsiveCards').removeEventListener('swiped-left', moveLeft);
      document.getElementById('responsiveCards').removeEventListener('swiped-right', moveRight);
    }

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
          setDimensions();
          addEvents();
        }
      }, pause);
    });
  }

  vSlider();
});