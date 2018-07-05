'use strict';

(function () {
  var TIMEOUT_ERROR_POPUP = 2000;
  window.util = {
    getСoordinatesMainPin: function () {
      return Math.round(window.variables.mapPinMain.offsetLeft + window.variables.WIDTH_MAIN_PIN / 2) + ', ' + Math.floor(window.variables.mapPinMain.offsetTop + window.variables.HEIGTH_MAIN_PIN);
    },
    onError: function (error) {
      var formError = document.querySelector('.error-popup');
      var errorPoppup = document.querySelector('.error-popup__error');
      errorPoppup.textContent = error;
      formError.classList.remove('error-popup--hidden');
      setTimeout(function () {
        formError.classList.add('error-popup--hidden');
      }, TIMEOUT_ERROR_POPUP);
    },
    changeFormState: function (сonfiguring) {
      var fieldsets = document.querySelectorAll('fieldset');
      for (var i = 0; i < fieldsets.length; i++) {
        fieldsets[i].disabled = сonfiguring;
      }
    },
    deletePin: function () {
      var allPins = window.variables.containerPins.querySelectorAll('[type = button]');
      for (var i = 0; i < allPins.length; i++) {
        allPins[i].remove();
      }
    },
    render: function (array) {
      var mapPinsElement = window.getMapPinsElements(array);
      window.variables.containerPins.appendChild(mapPinsElement);
    },
    deleteMapCard: function () {
      var mapCard = document.querySelector('.map__card');
      if (mapCard) {
        mapCard.remove();
      }
    },
    onLoadData: function (evt) {
      evt.preventDefault();
      window.backend.load(window.filter.onSuccess, window.util.onError);
      window.variables.mapPinMain.removeEventListener('mousedown', window.util.onLoadData);
    }
  };
})();
