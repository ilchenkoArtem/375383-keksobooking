'use strict';

(function () {
  // ------------------------Drag-and-drop -------------------
  window.variables.mapPinMainElement.addEventListener('mousedown', window.util.onMapPinMainElementMouseDown);

  var onMapPinMainElementMouseDown = function (downEvt) {
    window.util.deleteMapCard();
    var mapPinElement = document.querySelector('.map__pins');
    downEvt.preventDefault();
    window.variables.inputAddressElement.value = window.util.getСoordinatesMainPin();
    var startCoords = {
      x: downEvt.pageX,
      y: downEvt.pageY
    };

    var onMouseMoveMapPinElement = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.pageX,
        y: startCoords.y - moveEvt.pageY
      };
      startCoords = {
        x: moveEvt.pageX,
        y: moveEvt.pageY
      };

      var widthMapPins = mapPinElement.offsetWidth;
      var minDistanceLeftPin = 0;
      var maxDistanceLeftPin = widthMapPins - window.variables.WIDTH_MAIN_PIN;
      var minDistanceTopPin = window.variables.LOCATION_MIN_Y - window.variables.HEIGTH_MAIN_PIN;
      var maxnDistanceTopPin = window.variables.LOCATION_MAX_Y - window.variables.HEIGTH_MAIN_PIN;
      var top = window.variables.mapPinMainElement.offsetTop - shift.y;
      var left = window.variables.mapPinMainElement.offsetLeft - shift.x;
      if (top <= (minDistanceTopPin)) {
        window.variables.mapPinMainElement.style.top = minDistanceTopPin + 'px';
        window.variables.mapPinMainElement.style.left = left + 'px';
      } else if (top >= maxnDistanceTopPin) {
        window.variables.mapPinMainElement.style.top = maxnDistanceTopPin + 'px';
        window.variables.mapPinMainElement.style.left = left + 'px';
        startCoords.y = maxnDistanceTopPin;
      } else {
        window.variables.mapPinMainElement.style.top = top + 'px';
        window.variables.mapPinMainElement.style.left = left + 'px';
      }
      if (left < minDistanceLeftPin) {
        window.variables.mapPinMainElement.style.left = minDistanceLeftPin + 'px';
      } else if (left > maxDistanceLeftPin) {
        window.variables.mapPinMainElement.style.left = maxDistanceLeftPin + 'px';
      } else {
        window.variables.mapPinMainElement.style.left = left + 'px';
      }
      window.variables.inputAddressElement.value = window.util.getСoordinatesMainPin();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      mapPinElement.removeEventListener('mousemove', onMouseMoveMapPinElement);
      document.removeEventListener('mouseup', onMouseUp);
    };

    mapPinElement.addEventListener('mousemove', onMouseMoveMapPinElement);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.variables.mapPinMainElement.addEventListener('mousedown', onMapPinMainElementMouseDown);
})();
