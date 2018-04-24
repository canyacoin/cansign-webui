(function(global) {
  'use strict';
  $(document).ready(function() {
    var headerDisplayController, headerScrollScene;
    headerDisplayController = new ScrollMagic.Controller();
    headerScrollScene = new ScrollMagic.Scene({
      triggerHook: 'onLeave',
      triggerElement: '.fix-sub-header-trigger',
      // duration: $('.site-content').height(),
      // offset: -70
    }).setClassToggle('.site-wrapper', 'fix-sub-header').addTo(headerDisplayController);
    // headerScrollScene.addIndicators({zindex: 1000, suffix: 1})
  });
}).call(window);
