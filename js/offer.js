'use strict';
(function () {
  var similarOfferTemplateElement = document.querySelector('template').content.querySelector('.map__card');
  var listFeatureElement = document.querySelector('template').content.querySelector('.popup__feature');
  var photoFeatureElement = document.querySelector('template').content.querySelector('.popup__photo');

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
    var featureElement = listFeatureElement.cloneNode();
    featureElement.classList.remove('popup__feature--wifi');
    featureElement.classList.add('popup__feature--' + feature);
    return featureElement;
  };
  // Возвращает элемент списка фото.
  var getPhotoElement = function (link) {
    var photoElement = photoFeatureElement.cloneNode();
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
  window.getOfferElement = function (offer) {
    var offerElement = similarOfferTemplateElement.cloneNode(true);
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
})();
