'use strict';

(function () {
  var ESC_KEY_CODE = 27;
  var popupCloseButtonElement;
  var mapElement = document.querySelector('.map');
  var onDocumentKeydown = function (evt) {
    if (evt.keyCode === ESC_KEY_CODE) {
      window.util.deleteMapCard();
    }
  };
  var onPopupCloseButtonClick = function () {
    window.util.deleteMapCard();
    popupCloseButtonElement.addEventListener('click', onPopupCloseButtonClick);
  };

  window.controlMapCard = function (offer) {
    window.util.deleteMapCard();
    var offerElement = window.getOfferElement(offer);
    mapElement.insertBefore(offerElement, document.querySelector('.map__filters-container'));
    document.addEventListener('keydown', onDocumentKeydown);
    popupCloseButtonElement = document.querySelector('.popup__close');
    popupCloseButtonElement.addEventListener('click', onPopupCloseButtonClick);
  };
})();
