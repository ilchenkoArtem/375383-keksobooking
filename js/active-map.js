'use strict';
(function () {
  window.variables.inputAddressElement.value = window.util.getСoordinatesMainPin();
  window.onActiveMap = function () {
    window.util.changeFormState(null);
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    window.form.addHandler();
    window.filter.addChangeHandler();
  };
})();
