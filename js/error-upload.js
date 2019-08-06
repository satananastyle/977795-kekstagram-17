'use strict';
(function () {
  var errorPopup = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');

  var renderPopupError = function () {
    main.appendChild(errorPopup);
  };

  window.renderPopupError = renderPopupError;
})();
