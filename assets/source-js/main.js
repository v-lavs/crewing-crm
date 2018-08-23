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
});