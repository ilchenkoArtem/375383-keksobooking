'use strict';

(function () {
  // Функция возвращает координаты главного маркера
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
      }, 2000);
    }
  };
})();
