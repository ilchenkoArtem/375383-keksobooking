'use strict';

var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES_CHECKINS_AND_CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var LOCATION_MIN_X = 300;
var LOCATION_MAX_X = 900;
var LOCATION_MIN_Y = 130;
var LOCATION_MAX_Y = 630;
var MIX_PRICE = 1000;
var MAX_PRICE = 1000000;
var MIN_GUESTS = 1;
var MAX_GUESTS = 12;
var QUANTITY_OFFER = 8;
var WIDTH_PIN = 50;
var HEIGHT_PIN = 70;
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
  var randomLocationY = getRandomNumberWithoutMaximum(LOCATION_MIN_Y, LOCATION_MAX_Y);
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
var getRandomsOffers = function (quantity) {
  var randomsOffers = [];
  for (var i = 0; i < quantity; i++) {
    var currentRandomOffer = getRandomOffer(i);
    randomsOffers.push(currentRandomOffer);
  }
  return randomsOffers;
};
// Функция возвращает элемент пин.
var getMapPinElement = function (mapPin) {
  var pinElement = similarMapPinTemplate.cloneNode(true);
  pinElement.style = 'left: ' + (mapPin.location.x - WIDTH_PIN / 2) + 'px; top: ' + (mapPin.location.y - HEIGHT_PIN) + 'px';
  pinElement.querySelector('img').src = mapPin.author.avatar;
  pinElement.querySelector('img').alt = mapPin.offer.title;
  return pinElement;
};
// Функция возвращает множество элемнтов пин//
var getMapPinsElements = function (mapPins) {
  var pinsElements = document.createDocumentFragment();
  for (var i = 0; i < mapPins.length; i++) {
    pinsElements.appendChild(getMapPinElement(mapPins[i]));
  }
  return pinsElements;
};
// Функция возвращает перевод типа жилья.
var translateType = function (typeEn) {
  if (typeEn === 'flat') {
    return 'Квартира';
  } else if (typeEn === 'bungalo') {
    return 'Бунгало';
  } else if (typeEn === 'house') {
    return 'Дом';
  } else {
    return 'Дворец';
  }
};
// Возвращает элемент списка удобств.
var getFeatureElement = function (feature) {
  var featureElement = listFeature.cloneNode();
  featureElement.classList.remove('popup__feature--wifi');
  featureElement.classList.add('popup__feature--' + feature);
  return featureElement;
};
// Возвращает элемент списка фото.
var getPhotoElement = function (link) {
  var photoElement = photoFeature.cloneNode();
  photoElement.src = link;
  return photoElement;
};
// Возвращает фрагмент списка удобств.
var getFeaturesElements = function (features) {
  var featuresElements = document.createDocumentFragment();
  for (var i = 0; i < features.length; i++) {
    featuresElements.appendChild(getFeatureElement(features[i]));
  }
  return featuresElements;
};
// Возвращает фрагмент списка фото
var getPhotosElements = function (photos) {
  var photosElement = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    photosElement.appendChild(getPhotoElement(photos[i]));
  }
  return photosElement;
};
// удаляет детей блока.
var deleteChildren = function (element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};
// Функция возвращает элемент объявления
var getOfferElement = function (offer) {
  var offerElement = similarOfferTemplate.cloneNode(true);
  offerElement.querySelector('.popup__title').textContent = offer.offer.title;
  offerElement.querySelector('.popup__text--address').textContent = offer.offer.address;
  offerElement.querySelector('.popup__text--price').textContent = offer.offer.price + '₽/ночь';
  offerElement.querySelector('.popup__type').textContent = translateType(offer.offer.type);
  offerElement.querySelector('.popup__text--capacity').textContent = offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей';
  offerElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;
  deleteChildren(offerElement.querySelector('.popup__features'));
  offerElement.querySelector('.popup__features').appendChild(getFeaturesElements(offer.offer.features));
  offerElement.querySelector('.popup__description').textContent = offer.offer.description;
  deleteChildren(offerElement.querySelector('.popup__photos'));
  offerElement.querySelector('.popup__photos').appendChild(getPhotosElements(offer.offer.photos));
  offerElement.querySelector('.popup__avatar').src = offer.author.avatar;
  return offerElement;
};

// Генерируем массив с 8 случаными объявлениями.
var offers = getRandomsOffers(QUANTITY_OFFER);

document.querySelector('.map').classList.remove('map--faded');
// определяем шаблон пина и объявления, удобств, фото.
var similarMapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var similarOfferTemplate = document.querySelector('template').content.querySelector('.map__card');
var listFeature = document.querySelector('template').content.querySelector('.popup__feature');
var photoFeature = document.querySelector('template').content.querySelector('.popup__photo');

// генерируем пины для заданного колличтсва объявлений
var mapPinsElement = getMapPinsElements(offers);
// генерируем объявление для первого элемента массива.
var offerElement = getOfferElement(offers[0]);
// вставляем сгенерированные пины в разметку.
var containerPins = document.querySelector('.map__pins');
containerPins.appendChild(mapPinsElement);
// генерируем тело объявления.
var map = document.querySelector('.map');
map.insertBefore(offerElement, document.querySelector('.map__filters-container'));