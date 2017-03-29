(function() {
  function vendorModule() {
    'use strict';
    return window.L;
  }

  define('leaflet', [], vendorModule);
})();
