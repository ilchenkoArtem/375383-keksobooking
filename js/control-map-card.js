'use strict';

(function () {
  var map = document.querySelector('.map');

  var deleteMapCard = function () {
    var mapCard = map.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
  };

  window.controlMapCard = function (offer) {
    deleteMapCard();
    var offerElement = window.getOfferElement(offer);
    map.insertBefore(offerElement, document.querySelector('.map__filters-container'));
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        deleteMapCard();
      }
    });
    map.querySelector('.popup__close').addEventListener('click', function () {
      deleteMapCard();
    });
  };
})();
