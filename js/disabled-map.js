'use strict';

(function () {
  window.disabledMap = function () {
    window.util.deletePin();
    window.util.changeFormState('disabled');
    document.querySelector('.map').classList.add('map--faded');
    document.querySelector('.ad-form').classList.add('ad-form--disabled');
  };
})();
