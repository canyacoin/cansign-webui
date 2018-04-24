(function(global){
  $('.accordion-item .top').click(function(event){
    var activeClass = 'active';
    var parent = $(this).closest('.accordion-item');
    if (parent.hasClass(activeClass)) {
      parent.removeClass(activeClass);
      return;
    }
    $('.accordion-wrapper .accordion-item').removeClass(activeClass);
    parent.addClass(activeClass);
  });
}).call(window);
