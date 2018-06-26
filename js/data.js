'use strict';

(function () {
  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var TIMES_CHECKINS_AND_CHECKOUTS = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var LOCATION_MIN_X = 300;
  var LOCATION_MAX_X = 900;
  var MIX_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var MIN_GUESTS = 1;
  var MAX_GUESTS = 12;
  var MIN_ROOM = 1;
  var MAX_ROOM = 5;
  // Функция случайное рандомное число без учета максимального.
  var getRandomNumberWithoutMaximum = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };
  // Функция случайное рандомное число с учеета максимального.
  var getRandomNumberWithMaximum = function (min, max) {
    return Math.floor(Math.random() * ((max + 1) - min)) + min;
  };

  // Функция случайный элемент массива.
  var getRandomItemFromArray = function (array) {
    return array[getRandomNumberWithoutMaximum(0, array.length)];
  };
  // Функция случаная длина массива.
  var getRandomLengthArray = function (array) {
    return array.slice(getRandomNumberWithoutMaximum(0, array.length));
  };

  // Функция перемешивает массив случайным образом.
  var randomMixArray = function (array) {
    return array.sort(function () {
      return Math.random() - 0.5;
    });
  };

  // Функция генерации одного объявления с случаными параматерами.
  var getRandomOffer = function (avatarTitleIndex) {
    var randomLocationX = getRandomNumberWithoutMaximum(LOCATION_MIN_X, LOCATION_MAX_X);
    var randomLocationY = getRandomNumberWithoutMaximum(window.variables.LOCATION_MIN_Y, window.variables.LOCATION_MAX_Y);

    var randomAress = randomLocationX + ', ' + randomLocationY;
    var offerInfo = {
      author: {
        avatar: 'img/avatars/user0' + (avatarTitleIndex + 1) + '.png'
      },
      offer: {
        title: TITLES[avatarTitleIndex],
        address: randomAress,
        price: getRandomNumberWithMaximum(MIX_PRICE, MAX_PRICE),
        type: getRandomItemFromArray(TYPES),
        rooms: getRandomNumberWithMaximum(MIN_ROOM, MAX_ROOM),
        guests: getRandomNumberWithMaximum(MIN_GUESTS, MAX_GUESTS),
        checkin: getRandomItemFromArray(TIMES_CHECKINS_AND_CHECKOUTS),
        checkout: getRandomItemFromArray(TIMES_CHECKINS_AND_CHECKOUTS),
        features: getRandomLengthArray(FEATURES),
        description: '',
        photos: randomMixArray(PHOTOS)
      },
      location: {
        x: randomLocationX,
        y: randomLocationY
      }
    };
    return offerInfo;
  };

  // Функция генерации массива с заднным(quantity) колличеством объявлений с случаными параматерами.
  window.getRandomsOffers = function (quantity) {
    var randomsOffers = [];
    for (var i = 0; i < quantity; i++) {
      var currentRandomOffer = getRandomOffer(i);
      randomsOffers.push(currentRandomOffer);
    }
    return randomsOffers;
  };
})();
