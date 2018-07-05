'use strict';

(function () {
  var ESC_KEY_CODE = 27;
  var map = document.querySelector('.map');
  var buttonClosePopup = map.querySelector('.popup__close');

  window.controlMapCard = function (offer) {
    window.util.deleteMapCard();
    var offerElement = window.getOfferElement(offer);
    map.insertBefore(offerElement, document.querySelector('.map__filters-container'));
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEY_CODE) {
        window.util.deleteMapCard();
      }
    });
    buttonClosePopup.addEventListener('click', function () {
      window.util.deleteMapCard();
    });
  };
})();
