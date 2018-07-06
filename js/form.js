'use strict';

(function () {
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
  var onValidityForm = function () {
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

  var resetForm = function () {
    onTypeElementInput();
    capacityElement.value = '1';
    disabledNumber(optionsCapacityElements[0]);
    disabledNumber(optionsCapacityElements[1]);
    disabledNumber(optionsCapacityElements[3]);
    window.variables.mapPinMainElement.style = 'left: 570px; top: 375px';
    removeClasses(formInputsValid, 'error');
  };

  var onSubmitReset = function () {
    formNewAdElement.removeEventListener('reset', onResetAndDisableForm);
    formNewAdElement.reset();
    resetForm();
    window.variables.inputAdressElement.value = window.util.getСoordinatesMainPin();
    formNewAdElement.addEventListener('reset', onResetAndDisableForm);
  };
  // функция возвращения полей в первоначальное состояние
  var onResetAndDisableForm = function () {
    setTimeout(function () {
      resetForm();
      window.variables.inputAdressElement.value = null;
      window.disabledMap();
    }, 0);
  };

  var onPriceElementInput = function () {
    removeClass(priceElement, 'error');
  };

  var onTitleElementInput = function () {
    removeClass(titleElement, 'error');
  };

  var onValidityForKeydownEnter = function (evt) {
    if (evt.keyCode === ENTER_KEY_CODE) {
      onValidityForm();
    }
  };

  var onFormSubmit = function (evt) {
    window.backend.save(onSubmitReset, window.util.onError, new FormData(formNewAdElement));
    evt.preventDefault();
  };

  window.form = {
    addHandler: function () {
      typeElement.addEventListener('input', onTypeElementInput);
      timeInElement.addEventListener('input', onTimeInElementInput);
      timeOutElement.addEventListener('input', onTimeOutElementInput);
      roomNumberElement.addEventListener('input', onRoomNumberElementInput);
      priceElement.addEventListener('input', onPriceElementInput);
      titleElement.addEventListener('input', onTitleElementInput);
      buttonFormElement.addEventListener('click', onValidityForm);
      buttonFormElement.addEventListener('keydown', onValidityForKeydownEnter);
      formNewAdElement.addEventListener('keydown', onValidityForKeydownEnter);
      formNewAdElement.addEventListener('reset', onResetAndDisableForm);
      formNewAdElement.addEventListener('submit', onFormSubmit);
    },
    removeHandler: function () {
      typeElement.removeEventListener('input', onTypeElementInput);
      timeInElement.removeEventListener('input', onTimeInElementInput);
      timeOutElement.removeEventListener('input', onTimeOutElementInput);
      roomNumberElement.removeEventListener('input', onRoomNumberElementInput);
      priceElement.removeEventListener('input', onPriceElementInput);
      titleElement.removeEventListener('input', onTitleElementInput);
      buttonFormElement.removeEventListener('click', onValidityForm);
      buttonFormElement.removeEventListener('keydown', onValidityForKeydownEnter);
      formNewAdElement.removeEventListener('keydown', onValidityForKeydownEnter);
      formNewAdElement.removeEventListener('reset', onResetAndDisableForm);
      formNewAdElement.removeEventListener('submit', onFormSubmit);
    }
  };
})();
