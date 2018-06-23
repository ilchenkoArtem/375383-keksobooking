'use strict';
(function () {
  var QUANTITY_OFFER = 8;
  var fieldsets = document.querySelectorAll('fieldset');
  // определяем контейнера пина
  var containerPins = document.querySelector('.map__pins');

  var changeFormState = function (сonfiguring) {
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = сonfiguring;
    }
  };

  // генерируем 8 случайных объявлений
  var offers = window.getRandomsOffers(QUANTITY_OFFER);
  // генерируем пины для заданного колличтсва объявлений
  var mapPinsElement = window.getMapPinsElements(offers);
  window.onActiveMap = function () {
    changeFormState(null);
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    containerPins.appendChild(mapPinsElement);
    window.variables.inputAdress.value = window.getСoordinatesMainPin();
  };
  // перевод страницы в аквтиное состояние
  changeFormState('disabled');
})();
