'use strict';
(function () {
  var PRICE_LOW = 10000;
  var PRICE_MAX = 50000;
  var INTERVAL_UPDATE_PIN = 500; // мс
  var offers = [];

  var mapPinsElement = document.querySelector('.map__filters');
  var mapFeaturesElement = document.querySelector('.map__features');
  var filterTypeElement = mapPinsElement.querySelector('#housing-type');
  var filterPriceElement = mapPinsElement.querySelector('#housing-price');
  var filterRoomsElement = mapPinsElement.querySelector('#housing-rooms');
  var filterGuestsElement = mapPinsElement.querySelector('#housing-guests');
  var filterFeaturesElements = mapFeaturesElement.querySelectorAll('.map__checkbox');
  var selectFormElement = mapPinsElement.querySelectorAll('select');
  selectFormElement = Array.from(selectFormElement);
  selectFormElement.push(mapFeaturesElement);

  var filterOnType = function (item) {
    if (filterTypeElement.value === 'any') {
      return true;
    }
    return filterTypeElement.value === item.offer.type;
  };

  var filterOnPrice = function (item) {
    switch (filterPriceElement.value) {
      case 'middle':
        return item.offer.price >= PRICE_LOW && item.offer.price < PRICE_MAX;
      case 'low':
        return item.offer.price < PRICE_LOW;
      case 'high':
        return item.offer.price > PRICE_MAX;
      default:
        return true;
    }
  };

  var filterOnRooms = function (item) {
    if (filterRoomsElement.value === 'any') {
      return true;
    }
    return Number(filterRoomsElement.value) === item.offer.rooms;
  };

  var filterOnGuests = function (item) {
    if (filterGuestsElement.value === 'any') {
      return true;
    }
    return Number(filterGuestsElement.value) === item.offer.guests;
  };

  var filterOnFeatures = function (item) {
    for (var i = 0; i < filterFeaturesElements.length; i++) {
      if (filterFeaturesElements[i].checked && item.offer.features.indexOf(filterFeaturesElements[i].value) === -1) {
        return false;
      }
    }
    return true;
  };

  var newPins = function () {
    window.util.deletePin();
    window.util.deleteMapCard();

    var filtredPins = offers.filter(function (item) {
      return filterOnType(item) &&
        filterOnPrice(item) &&
        filterOnRooms(item) &&
        filterOnGuests(item) &&
        filterOnFeatures(item);
    });

    window.util.render(filtredPins);
  };

  window.filter = {
    onSuccess: function (uploadedData) {
      offers = uploadedData;
      window.onActiveMap();
      window.util.render(offers);
    },
    reset: function () {
      mapPinsElement.reset();
    },
    addChangeHandler: function () {
      mapPinsElement.addEventListener('change', onReadPin);
    }
  };

  var disabledFilter = function (flag) {
    for (var i = 0; i < selectFormElement.length; i++) {
      selectFormElement[i].disabled = flag;
    }
  };

  var onReadPin = function () {
    disabledFilter('disabled');
    setTimeout(function () {
      newPins();
      disabledFilter(null);
    }, INTERVAL_UPDATE_PIN);
  };
})();
