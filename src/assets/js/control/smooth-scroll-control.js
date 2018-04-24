(function(global) {
  'use strict';
  $(document).ready(function() {
    var scrollToController = new ScrollMagic.Controller();
    scrollToController.scrollTo(function(newpos) { 
      TweenMax.to(window, 0.5, {
        scrollTo: {
          y: newpos - 70
        }
      });
    });
    $(document).on('click', 'a[href^=#]', function(e) {
      $('a[href^=#]').removeClass('current-menu-item');

      var id      = $(this).attr('href');
      var current = 'a[href^=' + id + ']';

      if ($(id).length > 0 || id != '#') {
        $(current).addClass('current-menu-item');
      }

      if ($(id).length > 0 && !id.match(/nav/g) && !id.match(/carousel/g)) {
        e.preventDefault();
        scrollToController.scrollTo(id);
      }
    });
  });
}).call(window);
