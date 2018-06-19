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
var WITH_AND_HEIGTH_MAIN_PIN = 65;
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

var map = document.querySelector('.map');

var deleteMapCard = function () {
  var mapCard = map.querySelector('.map__card');
  if (mapCard) {
    mapCard.remove();
  }
};

var controlMapCard = function (offer) {
  deleteMapCard();
  var offerElement = getOfferElement(offer);
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

// Функция возвращает элемент пин.
var getMapPinElement = function (offer) {
  var pinElement = similarMapPinTemplate.cloneNode(true);
  pinElement.style = 'left: ' + (offer.location.x - WIDTH_PIN / 2) + 'px; top: ' + (offer.location.y - HEIGHT_PIN) + 'px';
  pinElement.querySelector('img').src = offer.author.avatar;
  pinElement.querySelector('img').alt = offer.offer.title;
  pinElement.addEventListener('click', function () {
    controlMapCard(offer);
  });
  return pinElement;
};

// Функция возвращает множество элемнтов пин//
var getMapPinsElements = function (offers) {
  var pinsElements = document.createDocumentFragment();
  for (var i = 0; i < offers.length; i++) {
    pinsElements.appendChild(getMapPinElement(offers[i]));
  }
  return pinsElements;
};

// функция управления утрибутом disabled у форм
var changeFormState = function (сonfiguring) {
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].disabled = сonfiguring;
  }
};

var inputPrice = document.querySelector('#price');
var inputType = document.querySelector('#type');
// функция меняющая значение минимальное значение поля "Цена"
var onEditingTheMinPrice = function () {
  if (inputType.value === 'flat') {
    inputPrice.placeholder = 1000;
    inputPrice.min = 1000;
  } else if (inputType.value === 'house') {
    inputPrice.placeholder = 5000;
    inputPrice.min = 5000;
  } else if (inputType.value === 'palace') {
    inputPrice.placeholder = 10000;
    inputPrice.min = 10000;
  } else {
    inputPrice.placeholder = 0;
    inputPrice.min = 0;
  }
};
// функция удаления класса;
var removeClass = function (whereToDelete, deleteClass) {
  if (whereToDelete.classList.contains(deleteClass)) {
    whereToDelete.classList.remove(deleteClass);
  }
};

var removeClasses = function (array, deleteClass) {
  for (var i = 0; i < array.length; i++) {
    removeClass(array[i], deleteClass);
  }
};

var inputTimeIn = document.querySelector('#timein');
var inputTimeOut = document.querySelector('#timeout');

var onСhangeTimeIn = function () {
  if (inputTimeIn.value === '12:00') {
    inputTimeOut.value = '12:00';
  } else if (inputTimeIn.value === '13:00') {
    inputTimeOut.value = '13:00';
  } else {
    inputTimeOut.value = '14:00';
  }
};
var onСhangeTimeOut = function () {
  if (inputTimeOut.value === '12:00') {
    inputTimeIn.value = '12:00';
  } else if (inputTimeOut.value === '13:00') {
    inputTimeIn.value = '13:00';
  } else {
    inputTimeIn.value = '14:00';
  }
};

var inputRoomNumber = document.querySelector('#room_number');
var inputCapacity = document.querySelector('#capacity');
var options = inputCapacity.querySelectorAll('option');
// функция добавления атрибута disabled
var disableNumber = function (number) {
  number.disabled = 'disabled';
};
// функция управления настройками поля 'Колличество мест'
var onСhangeCapacity = function () {
  for (var i = 0; i < options.length; i++) {
    options[i].disabled = null;
  }
  if (inputRoomNumber.value === '2') {
    disableNumber(options[0]);
    disableNumber(options[3]);
    if (inputCapacity.value === '3' || inputCapacity.value === '0') {
      inputCapacity.value = '2';
    }
  } else if (inputRoomNumber.value === '1') {
    disableNumber(options[0]);
    disableNumber(options[1]);
    disableNumber(options[3]);
    if (inputCapacity.value !== '1') {
      inputCapacity.value = '1';
    }
  } else if (inputRoomNumber.value === '3') {
    disableNumber(options[3]);
    options[3].disabled = 'disabled';
    if (inputCapacity.value === '0') {
      inputCapacity.value = '3';
    }
  } else {
    disableNumber(options[0]);
    disableNumber(options[1]);
    disableNumber(options[2]);
    if (inputCapacity.value !== '0') {
      inputCapacity.value = '0';
    }
  }
};

var buttonForm = document.querySelector('.ad-form__submit');
var inputTitle = document.querySelector('#title');
var formInputsvalid = [inputPrice, inputTitle];

// функция определение валидности полей
var validityForm = function () {
  for (var i = 0; i < formInputsvalid.length; i++) {
    var validity = formInputsvalid[i].validity.valid;
    if (!validity) {
      formInputsvalid[i].classList.add('error');
    } else {
      formInputsvalid[i].classList.remove('error');
    }
  }
};
// функция возвращения полей в первоначальное состояние
var onResretForm = function () {
  setTimeout(function () {
    inputPrice.placeholder = 1000;
    inputPrice.min = 1000;
    inputCapacity.value = '1';
    disableNumber(options[0]);
    disableNumber(options[1]);
    disableNumber(options[3]);
    inputAdress.value = getСoordinatesMainPin();
    mapPinMain.style = 'left: 570px; top: 375px';
    removeClasses(formInputsvalid, 'error');
  }, 0);
};

// определяем шаблон пина, карточки объявления, удобств, фото.
var similarMapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var similarOfferTemplate = document.querySelector('template').content.querySelector('.map__card');
var listFeature = document.querySelector('template').content.querySelector('.popup__feature');
var photoFeature = document.querySelector('template').content.querySelector('.popup__photo');
var fieldsets = document.querySelectorAll('fieldset');
var mapPinMain = document.querySelector(' .map__pin--main');
var containerPins = document.querySelector('.map__pins');
var inputAdress = document.querySelector('#address');
// генерируем 8 случайных объявлений
var offers = getRandomsOffers(QUANTITY_OFFER);
// генерируем пины для заданного колличтсва объявлений
var mapPinsElement = getMapPinsElements(offers);
// Функция возвращает координаты главного маркера
var getСoordinatesMainPin = function () {
  return Math.round(mapPinMain.offsetLeft + WITH_AND_HEIGTH_MAIN_PIN / 2) + ', ' + Math.round(mapPinMain.offsetTop + WITH_AND_HEIGTH_MAIN_PIN / 2);
};
// перевод страницы в аквтиное состояние
changeFormState('disabled');
var onActiveMap = function () {
  changeFormState(null);
  document.querySelector('.map').classList.remove('map--faded');
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  containerPins.appendChild(mapPinsElement);
  inputAdress.value = getСoordinatesMainPin();
};

mapPinMain.addEventListener('mouseup', onActiveMap);
inputType.addEventListener('input', onEditingTheMinPrice);
inputTimeIn.addEventListener('input', onСhangeTimeIn);
inputTimeOut.addEventListener('input', onСhangeTimeOut);
inputRoomNumber.addEventListener('input', onСhangeCapacity);
inputPrice.addEventListener('input', function () {
  removeClass(inputPrice, 'error');
});
inputTitle.addEventListener('input', function () {
  removeClass(inputTitle, 'error');
});
buttonForm.addEventListener('click', function () {
  validityForm();
});
buttonForm.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    validityForm();
  }
});

var formNewAd = document.querySelector('.ad-form');
formNewAd.addEventListener('reset', onResretForm);
