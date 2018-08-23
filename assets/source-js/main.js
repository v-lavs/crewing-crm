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
   * SIMPLE LIGHTBOX FOR IMAGES
   */

  var lightbox = $('.card-slider a').simpleLightbox();

  /**
   * RESPONSIVE CARDS SWIPER
   */
  function vSlider () {
    var slider = $('#responsiveCards');
    var sliderList = slider.find('.col-card-list');
    var slides = slider.find('.card-slide');

    var slideWidth, slideListWidth, offset;

    function setDimensions () {
      if($(window).width() <= 991) {
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

    function addEvents() {
      document.getElementById('responsiveCards').addEventListener('swiped-left', moveLeft);

      document.getElementById('responsiveCards').addEventListener('swiped-right',moveRight);
    }

    function deleteEvents() {
      document.getElementById('responsiveCards').removeEventListener('swiped-left', moveLeft);
      document.getElementById('responsiveCards').removeEventListener('swiped-right', moveRight);
    }

    addEvents();

    $(window).on('resize', function () {
      if($(window).width() >= 991) {
        resetStyles();
        deleteEvents();
      }
      else {
        setDimensions();
        addEvents();
      }
    });
  }

  vSlider();
});