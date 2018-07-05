'use strict';

(function () {
  var ESC_KEY_CODE = 27;
  var map = document.querySelector('.map');

  window.controlMapCard = function (offer) {
    window.util.deleteMapCard();
    var offerElement = window.getOfferElement(offer);
    map.insertBefore(offerElement, document.querySelector('.map__filters-container'));
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEY_CODE) {
        window.util.deleteMapCard();
      }
    });
    document.querySelector('.popup__close').addEventListener('click', function () {
      window.util.deleteMapCard();
    });
  };
})();
