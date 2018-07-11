'use strict';

(function () {
  var popupCloseButtonElement;
  var mapElement = document.querySelector('.map');
  var onDocumentKeydown = function (evt) {
    if (evt.keyCode === window.variables.ESC_KEY_CODE) {
      window.util.deleteMapCard();
    }
  };
  var onPopupCloseButtonClick = function () {
    window.util.deleteMapCard();
  };

  window.controlMapCard = {
    controlCard: function (offer) {
      window.util.deleteMapCard();
      var offerElement = window.getOfferElement(offer);
      mapElement.insertBefore(offerElement, document.querySelector('.map__filters-container'));
      document.addEventListener('keydown', onDocumentKeydown);
      popupCloseButtonElement = document.querySelector('.popup__close');
      popupCloseButtonElement.addEventListener('click', onPopupCloseButtonClick);
    },
    removeHandlerCard: function () {
      popupCloseButtonElement.removeEventListener('click', onPopupCloseButtonClick);
      document.removeEventListener('keydown', onDocumentKeydown);
    }
  };
})();
