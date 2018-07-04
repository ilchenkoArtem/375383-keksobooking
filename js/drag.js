'use strict';

(function () {
  // ------------------------Drag-and-drop -------------------
  window.variables.mapPinMain.addEventListener('mousedown', function (downEvt) {
    var mapPins = document.querySelector('.map__pins');
    downEvt.preventDefault();
    window.variables.inputAdress.value = window.util.getСoordinatesMainPin();
    window.backend.load(window.activeMap.onActiveMap, window.util.onError);
    var startCoords = {
      x: downEvt.pageX,
      y: downEvt.pageY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.pageX,
        y: startCoords.y - moveEvt.pageY
      };
      startCoords = {
        x: moveEvt.pageX,
        y: moveEvt.pageY
      };

      var widthMapPins = mapPins.offsetWidth;
      var minDistanceLeftPin = 0;
      var maxDistanceLeftPin = widthMapPins - window.variables.WIDTH_MAIN_PIN;
      var minDistanceTopPin = window.variables.LOCATION_MIN_Y - window.variables.HEIGTH_MAIN_PIN;
      var maxnDistanceTopPin = window.variables.LOCATION_MAX_Y - window.variables.HEIGTH_MAIN_PIN;
      var top = window.variables.mapPinMain.offsetTop - shift.y;
      var left = window.variables.mapPinMain.offsetLeft - shift.x;
      if (top <= (minDistanceTopPin)) {
        window.variables.mapPinMain.style.top = minDistanceTopPin + 'px';
        window.variables.mapPinMain.style.left = left + 'px';
      } else if (top >= maxnDistanceTopPin) {
        window.variables.mapPinMain.style.top = maxnDistanceTopPin + 'px';
        window.variables.mapPinMain.style.left = left + 'px';
        startCoords.y = maxnDistanceTopPin;
      } else {
        window.variables.mapPinMain.style.top = top + 'px';
        window.variables.mapPinMain.style.left = left + 'px';
      }
      if (left < minDistanceLeftPin) {
        window.variables.mapPinMain.style.left = minDistanceLeftPin + 'px';
      } else if (left > maxDistanceLeftPin) {
        window.variables.mapPinMain.style.left = maxDistanceLeftPin + 'px';
      } else {
        window.variables.mapPinMain.style.left = left + 'px';
      }
      window.variables.inputAdress.value = window.util.getСoordinatesMainPin();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      mapPins.removeEventListener('mousemove', onMouseMove);
      mapPins.removeEventListener('mouseup', onMouseUp);
    };

    mapPins.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
