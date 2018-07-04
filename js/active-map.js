'use strict';
(function () {
  window.onActiveMap = function () {
    window.util.changeFormState(null);
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    window.variables.inputAdress.value = window.util.getСoordinatesMainPin();
  };
})();
