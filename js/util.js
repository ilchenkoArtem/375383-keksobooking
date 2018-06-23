'use strict';

(function () {
  // Функция возвращает координаты главного маркера
  window.getСoordinatesMainPin = function () {
    return Math.round(window.variables.mapPinMain.offsetLeft + window.variables.WIDTH_MAIN_PIN / 2) + ', ' + Math.floor(window.variables.mapPinMain.offsetTop + window.variables.HEIGTH_MAIN_PIN);
  };
})();
