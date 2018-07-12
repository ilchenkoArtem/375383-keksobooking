'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var ENTER_KEY_CODE = 13;
  var priceElement = document.querySelector('#price');
  var typeElement = document.querySelector('#type');

  // функция меняющая минимальное значение поля "Цена"
  var onTypeElementInput = function () {
    var typeToPrice = {
      'flat': 1000,
      'house': 5000,
      'palace': 10000,
      'bungalo': 0
    };
    priceElement.placeholder = typeToPrice[typeElement.value];
    priceElement.min = typeToPrice[typeElement.value];
  };

  var timeInElement = document.querySelector('#timein');
  var timeOutElement = document.querySelector('#timeout');

  var onTimeOutElementInput = function () {
    timeInElement.value = timeOutElement.value;

  };
  var onTimeInElementInput = function () {
    timeOutElement.value = timeInElement.value;
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

  var roomNumberElement = document.querySelector('#room_number');
  var capacityElement = document.querySelector('#capacity');
  var optionsCapacityElements = capacityElement.querySelectorAll('option');
  // функция добавления атрибута disabled
  var disabledNumber = function (number) {
    number.disabled = 'disabled';
  };
  // функция управления настройками поля 'Колличество мест'
  var onRoomNumberElementInput = function () {
    for (var i = 0; i < optionsCapacityElements.length; i++) {
      optionsCapacityElements[i].disabled = null;
    }
    if (roomNumberElement.value === '2') {
      disabledNumber(optionsCapacityElements[0]);
      disabledNumber(optionsCapacityElements[3]);
      if (capacityElement.value === '3' || capacityElement.value === '0') {
        capacityElement.value = '2';
      }
    } else if (roomNumberElement.value === '1') {
      disabledNumber(optionsCapacityElements[0]);
      disabledNumber(optionsCapacityElements[1]);
      disabledNumber(optionsCapacityElements[3]);
      if (capacityElement.value !== '1') {
        capacityElement.value = '1';
      }
    } else if (roomNumberElement.value === '3') {
      disabledNumber(optionsCapacityElements[3]);
      optionsCapacityElements[3].disabled = 'disabled';
      if (capacityElement.value === '0') {
        capacityElement.value = '3';
      }
    } else {
      disabledNumber(optionsCapacityElements[0]);
      disabledNumber(optionsCapacityElements[1]);
      disabledNumber(optionsCapacityElements[2]);
      if (capacityElement.value !== '0') {
        capacityElement.value = '0';
      }
    }
  };

  var buttonFormElement = document.querySelector('.ad-form__submit');
  var titleElement = document.querySelector('#title');
  var formInputsValid = [priceElement, titleElement];

  // функция определение валидности полей
  var validityForm = function () {
    for (var i = 0; i < formInputsValid.length; i++) {
      var validity = formInputsValid[i].validity.valid;
      if (!validity) {
        formInputsValid[i].classList.add('error');
      } else {
        formInputsValid[i].classList.remove('error');
      }
    }
  };
  var formNewAdElement = document.querySelector('.ad-form');

  var successElement = document.querySelector('.success');

  var hideSuccessElement = function () {
    successElement.classList.add('hidden');
    successElement.removeEventListener('click', onSuccessElementClick);
    window.removeEventListener('keydown', onSuccessElementKeyDown);
  };

  var onSuccessElementClick = function () {
    hideSuccessElement();
  };

  var onSuccessElementKeyDown = function (evt) {
    if (evt.keyCode === window.variables.ESC_KEY_CODE) {
      hideSuccessElement();
    }
  };

  var onSubmitReset = function () {
    successElement.classList.remove('hidden');
    successElement.addEventListener('click', onSuccessElementClick);
    window.addEventListener('keydown', onSuccessElementKeyDown);
    window.disabledMap();

  };
  // функция возвращения полей в первоначальное состояние
  var onFormNewAdElementReset = function () {
    setTimeout(function () {
      window.disabledMap();
    }, 0);
  };

  var onPriceElementInput = function () {
    removeClass(priceElement, 'error');
  };

  var onTitleElementInput = function () {
    removeClass(titleElement, 'error');
  };

  var onButtonFormElementKeydown = function (evt) {
    if (evt.keyCode === ENTER_KEY_CODE) {
      validityForm();
    }
  };

  var onFormNewAdElementKeydown = function (evt) {
    if (evt.keyCode === ENTER_KEY_CODE) {
      validityForm();
    }
  };

  var onButtonFormElementClick = function () {
    validityForm();
  };

  var onFormNewAdElementSubmit = function (evt) {
    window.backend.save(onSubmitReset, window.util.onDeduceErrorText, new FormData(formNewAdElement));
    evt.preventDefault();
  };
  var housingAvatarElement = formNewAdElement.querySelector('#images');
  var avatarChooseElement = formNewAdElement.querySelector('#avatar');


  var onAddLoadHousingPhoto = function () {
    window.variables.avatarPreviewHiddenElement.style = 'visibility: hidden';
    var divElement = document.createElement('div');
    divElement.classList.add('ad-form__photo');
    divElement.classList.add('ad-form__photo--load');
    var imgElement = document.createElement('img');
    divElement.appendChild(imgElement);
    imgElement.src = window.variables.reader.result;
    imgElement.width = 70;
    imgElement.height = 70;
    window.variables.avatarHousingPreviewElement.insertBefore(divElement, window.variables.avatarHousingPreviewElement.children[1]);
    window.variables.reader.removeEventListener('load', onAddLoadHousingPhoto);
  };

  var onAddLoadAvatarPhoto = function () {
    window.variables.avatarPreviewElement.src = window.variables.reader.result;
    window.variables.reader.removeEventListener('load', onAddLoadAvatarPhoto);
  };

  var onAddLoadPhoto = function (element, functionAdd) {
    var file = element.files[0];
    var fileName = file.name.toLowerCase();

    var correctTypeFile = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (correctTypeFile) {
      window.variables.reader = new FileReader();
      window.variables.reader.addEventListener('load', functionAdd);
      window.variables.reader.readAsDataURL(file);
    }
  };

  var onHousingAvatarElementChange = function () {
    onAddLoadPhoto(housingAvatarElement, onAddLoadHousingPhoto);
  };

  var onAvatarChooseElementChange = function () {
    onAddLoadPhoto(avatarChooseElement, onAddLoadAvatarPhoto);
  };

  window.form = {
    addHandler: function () {
      typeElement.addEventListener('input', onTypeElementInput);
      timeInElement.addEventListener('input', onTimeInElementInput);
      timeOutElement.addEventListener('input', onTimeOutElementInput);
      roomNumberElement.addEventListener('input', onRoomNumberElementInput);
      priceElement.addEventListener('input', onPriceElementInput);
      titleElement.addEventListener('input', onTitleElementInput);
      buttonFormElement.addEventListener('click', onButtonFormElementClick);
      buttonFormElement.addEventListener('keydown', onButtonFormElementKeydown);
      formNewAdElement.addEventListener('keydown', onFormNewAdElementKeydown);
      formNewAdElement.addEventListener('reset', onFormNewAdElementReset);
      formNewAdElement.addEventListener('submit', onFormNewAdElementSubmit);
      housingAvatarElement.addEventListener('change', onHousingAvatarElementChange);
      avatarChooseElement.addEventListener('change', onAvatarChooseElementChange);
    },
    removeHandler: function () {
      typeElement.removeEventListener('input', onTypeElementInput);
      timeInElement.removeEventListener('input', onTimeInElementInput);
      timeOutElement.removeEventListener('input', onTimeOutElementInput);
      roomNumberElement.removeEventListener('input', onRoomNumberElementInput);
      priceElement.removeEventListener('input', onPriceElementInput);
      titleElement.removeEventListener('input', onTitleElementInput);
      buttonFormElement.removeEventListener('click', onButtonFormElementClick);
      buttonFormElement.removeEventListener('keydown', onButtonFormElementKeydown);
      formNewAdElement.removeEventListener('keydown', onFormNewAdElementKeydown);
      formNewAdElement.removeEventListener('reset', onFormNewAdElementReset);
      formNewAdElement.removeEventListener('submit', onFormNewAdElementSubmit);
      housingAvatarElement.removeEventListener('change', onHousingAvatarElementChange);
      avatarChooseElement.removeEventListener('change', onAvatarChooseElementChange);
    },

    resetForm: function () {
      formNewAdElement.reset();
      onTypeElementInput();
      capacityElement.value = '1';
      disabledNumber(optionsCapacityElements[0]);
      disabledNumber(optionsCapacityElements[1]);
      disabledNumber(optionsCapacityElements[3]);
      window.variables.mapPinMainElement.style = 'left: 570px; top: 375px';
      removeClasses(formInputsValid, 'error');
    }
  };
})();
