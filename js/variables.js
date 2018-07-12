'use strict';

(function () {
  window.variables = {
    ESC_KEY_CODE: 27,
    LOCATION_MIN_Y: 130,
    LOCATION_MAX_Y: 630,
    WIDTH_MAIN_PIN: 65,
    HEIGTH_MAIN_PIN: 85,
    popupCloseButton: '',
    reader: null,
    inputAddressElement: document.querySelector('#address'),
    mapPinMainElement: document.querySelector('.map__pin--main'),
    containerPinsElement: document.querySelector('.map__pins'),
    avatarHousingPreviewElement: document.querySelector('.ad-form__photo-container'),
    avatarPreviewHiddenElement: document.querySelector('.ad-form__photo--hidden'),
    avatarPreviewElement: document.querySelector('.ad-form-header__preview img')
  };
})();
