'use strict';

(function () {
  var TIMEOUT_ERROR_POPUP = 2000;
  window.util = {
    getСoordinatesMainPin: function () {
      return Math.round(window.variables.mapPinMainElement.offsetLeft + window.variables.WIDTH_MAIN_PIN / 2) + ', ' + Math.floor(window.variables.mapPinMainElement.offsetTop + window.variables.HEIGTH_MAIN_PIN);
    },
    onDeduceErrorText: function (error) {
      var formErrorElement = document.querySelector('.error-popup');
      var errorPoppupElement = document.querySelector('.error-popup__error');
      errorPoppupElement.textContent = error;
      formErrorElement.classList.remove('error-popup--hidden');
      setTimeout(function () {
        formErrorElement.classList.add('error-popup--hidden');
      }, TIMEOUT_ERROR_POPUP);
    },
    changeFormState: function (сonfiguring) {
      var fieldsetsElements = document.querySelectorAll('fieldset');
      for (var i = 0; i < fieldsetsElements.length; i++) {
        fieldsetsElements[i].disabled = сonfiguring;
      }
    },
    deletePin: function () {
      var allPinElements = window.variables.containerPinsElement.querySelectorAll('[type = button]');
      for (var i = 0; i < allPinElements.length; i++) {
        allPinElements[i].remove();
      }
    },
    render: function (array) {
      var mapPinsElement = window.getMapPinsElements(array);
      window.variables.containerPinsElement.appendChild(mapPinsElement);
    },
    deleteMapCard: function () {
      var mapCardElement = document.querySelector('.map__card');
      if (mapCardElement) {
        mapCardElement.remove();
        window.controlMapCard.removeHandlerCard();
      }

    },
    onMapPinMainElementMouseDown: function (evt) {
      evt.preventDefault();
      window.backend.load(window.filter.onSuccess, window.util.onDeduceErrorText);
      window.variables.mapPinMainElement.removeEventListener('mousedown', window.util.onMapPinMainElementMouseDown);
    },

    deleteLoadPhoto: function () {
      document.querySelectorAll('.ad-form__photo--load').forEach(function (it) {
        it.remove();
      });
      window.variables.avatarPreviewHiddenElement.style = '';
      window.variables.avatarPreviewElement.src = 'img/muffin-grey.svg';
    }
  };
})();
