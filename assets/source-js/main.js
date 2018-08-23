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
  });
  $('.close-nav').click(function (e) {
    e.preventDefault();
    nav.removeClass('open');
  });

  // /**
  //  * SCROLLING
  //  **/
  // jQuery("#contacts").on("click","a", function (e) {
  //   e.preventDefault();
  //   var id  = jQuery(this).attr('href'),
  //     top = jQuery(id).offset().top;
  //   jQuery('body,html').animate({scrollTop: top}, 6000);
  // });
});