'use strict';
(function () {
  var WIDTH_PIN = 50;
  var HEIGHT_PIN = 70;
  var MAX_QUANTIT_PIN = 5;
  var similarMapPinTemplateElement = document.querySelector('template').content.querySelector('.map__pin');

  // Функция возвращает элемент пин.
  var getMapPinElement = function (offer) {
    var pinElement = similarMapPinTemplateElement.cloneNode(true);
    pinElement.style = 'left: ' + (offer.location.x - WIDTH_PIN / 2) + 'px; top: ' + (offer.location.y - HEIGHT_PIN) + 'px';
    pinElement.querySelector('img').src = offer.author.avatar;
    pinElement.querySelector('img').alt = offer.offer.title;
    pinElement.addEventListener('click', function () {
      window.controlMapCard.controlCard(offer);
    });
    return pinElement;
  };

  // Функция возвращает множество элемнтов пин//
  window.getMapPinsElements = function (offers) {
    if (offers.length > MAX_QUANTIT_PIN) {
      offers = offers.slice(0, MAX_QUANTIT_PIN);
    }
    var pinsElements = document.createDocumentFragment();
    for (var i = 0; i < offers.length; i++) {
      pinsElements.appendChild(getMapPinElement(offers[i]));
    }
    return pinsElements;
  };
})();
