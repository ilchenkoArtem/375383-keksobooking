'use strict';
(function () {
  window.onActiveMap = function () {
    window.util.changeFormState(null);
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    window.variables.inputAdressElement.value = window.util.getСoordinatesMainPin();
    window.form.addHandler();
    window.filter.addChangeFilterHandler();
  };
})();
