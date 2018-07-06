'use strict';

(function () {
  window.disabledMap = function () {
    window.util.deletePin();
    window.util.changeFormState('disabled');
    document.querySelector('.map').classList.add('map--faded');
    document.querySelector('.ad-form').classList.add('ad-form--disabled');
    window.variables.mapPinMainElement.addEventListener('mousedown', window.util.onMapPinMainElementMouseDown);
    window.filter.resetFilter();
    window.util.deleteMapCard();
    window.form.removeHandler();
    window.filter.addChangeFilterHandler();
  };
})();
