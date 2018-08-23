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
});