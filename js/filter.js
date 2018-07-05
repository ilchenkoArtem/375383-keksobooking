'use strict';
(function () {
  var PRICE_LOW = 10000;
  var PRICE_MAX = 50000;
  var INTERVAL_UPDATE_PIN = 500; // мс
  var offers = [];

  var filterForm = document.querySelector('.map__filters');
  var mapFeatures = document.querySelector('.map__features');
  var filterType = filterForm.querySelector('#housing-type');
  var filterPrice = filterForm.querySelector('#housing-price');
  var filterRooms = filterForm.querySelector('#housing-rooms');
  var filterGuests = filterForm.querySelector('#housing-guests');
  var filterFeatures = mapFeatures.querySelectorAll('.map__checkbox');
  var selectForm = filterForm.querySelectorAll('select');
  selectForm = Array.from(selectForm);
  selectForm.push(mapFeatures);

  var filterOnType = function (item) {
    if (filterType.value === 'any') {
      return true;
    }
    return filterType.value === item.offer.type;
  };

  var filterOnPrice = function (item) {
    switch (filterPrice.value) {
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
    if (filterRooms.value === 'any') {
      return true;
    }
    return Number(filterRooms.value) === item.offer.rooms;
  };

  var filterOnGuests = function (item) {
    if (filterGuests.value === 'any') {
      return true;
    }
    return Number(filterGuests.value) === item.offer.guests;
  };

  var filterOnFeatures = function (item) {
    for (var i = 0; i < filterFeatures.length; i++) {
      if (filterFeatures[i].checked && item.offer.features.indexOf(filterFeatures[i].value) === -1) {
        return false;
      }
    }
    return true;
  };

  var newPins = function () {
    window.util.deletePin();
    window.util.deleteMapCard();
    var filtredPins =
    offers.filter(filterOnType)
    .filter(filterOnPrice)
    .filter(filterOnRooms)
    .filter(filterOnGuests)
    .filter(filterOnFeatures);
    window.util.render(filtredPins);
  };

  window.filter = {
    onSuccess: function (array) {
      offers = array;
      window.onActiveMap(offers);
      window.util.render(array);
    },
    resetFilter: function () {
      filterForm.reset();
    },
    addChangeFilterHandler: function () {
      filterForm.addEventListener('change', onReadPin);
    }
  };

  var disabledFilter = function (сonfiguring) {
    for (var i = 0; i < selectForm.length; i++) {
      selectForm[i].disabled = сonfiguring;
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
