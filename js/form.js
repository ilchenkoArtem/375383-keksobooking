'use strict';

(function () {
  var ENTER_KEY_CODE = 13;
  var inputPriceElement = document.querySelector('#price');
  var inputTypeElement = document.querySelector('#type');

  // функция меняющая минимальное значение поля "Цена"
  var onInputTypeElementInput = function () {
    var typeToPrice = {
      'flat': 1000,
      'house': 5000,
      'palace': 10000,
      'bungalo': 0
    };
    inputPriceElement.placeholder = typeToPrice[inputTypeElement.value];
    inputPriceElement.min = typeToPrice[inputTypeElement.value];
  };

  var inputTimeInElement = document.querySelector('#timein');
  var inputTimeOutElement = document.querySelector('#timeout');

  var onInputTimeElementInput = function () {
    inputTimeOutElement.value = inputTimeInElement.value;

  };
  var onInputTimeOutElementInput = function () {
    inputTimeInElement.value = inputTimeOutElement.value;
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

  var inputRoomNumberElement = document.querySelector('#room_number');
  var inputCapacityElement = document.querySelector('#capacity');
  var optionsCapacityElements = inputCapacityElement.querySelectorAll('option');
  // функция добавления атрибута disabled
  var disabledNumber = function (number) {
    number.disabled = 'disabled';
  };
  // функция управления настройками поля 'Колличество мест'
  var onInputRoomNumberElementInput = function () {
    for (var i = 0; i < optionsCapacityElements.length; i++) {
      optionsCapacityElements[i].disabled = null;
    }
    if (inputRoomNumberElement.value === '2') {
      disabledNumber(optionsCapacityElements[0]);
      disabledNumber(optionsCapacityElements[3]);
      if (inputCapacityElement.value === '3' || inputCapacityElement.value === '0') {
        inputCapacityElement.value = '2';
      }
    } else if (inputRoomNumberElement.value === '1') {
      disabledNumber(optionsCapacityElements[0]);
      disabledNumber(optionsCapacityElements[1]);
      disabledNumber(optionsCapacityElements[3]);
      if (inputCapacityElement.value !== '1') {
        inputCapacityElement.value = '1';
      }
    } else if (inputRoomNumberElement.value === '3') {
      disabledNumber(optionsCapacityElements[3]);
      optionsCapacityElements[3].disabled = 'disabled';
      if (inputCapacityElement.value === '0') {
        inputCapacityElement.value = '3';
      }
    } else {
      disabledNumber(optionsCapacityElements[0]);
      disabledNumber(optionsCapacityElements[1]);
      disabledNumber(optionsCapacityElements[2]);
      if (inputCapacityElement.value !== '0') {
        inputCapacityElement.value = '0';
      }
    }
  };

  var buttonFormElement = document.querySelector('.ad-form__submit');
  var inputTitleElement = document.querySelector('#title');
  var formInputsvalid = [inputPriceElement, inputTitleElement];

  // функция определение валидности полей
  var onValidityForm = function () {
    for (var i = 0; i < formInputsvalid.length; i++) {
      var validity = formInputsvalid[i].validity.valid;
      if (!validity) {
        formInputsvalid[i].classList.add('error');
      } else {
        formInputsvalid[i].classList.remove('error');
      }
    }
  };
  var formNewAdElement = document.querySelector('.ad-form');

  var resetForm = function () {
    onInputTypeElementInput();
    inputCapacityElement.value = '1';
    disabledNumber(optionsCapacityElements[0]);
    disabledNumber(optionsCapacityElements[1]);
    disabledNumber(optionsCapacityElements[3]);
    window.variables.mapPinMainElement.style = 'left: 570px; top: 375px';
    removeClasses(formInputsvalid, 'error');
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

  var onInputTitleElementInput = function () {
    removeClass(inputPriceElement, 'error');
  };

  var oninputTitleElementInput = function () {
    removeClass(inputTitleElement, 'error');
  };

  var onValidityForKeydownEnter = function (evt) {
    if (evt.keyCode === ENTER_KEY_CODE) {
      onValidityForm();
    }
  };

  var onSubmitForm = function (evt) {
    window.backend.save(onSubmitReset, window.util.onError, new FormData(formNewAdElement));
    evt.preventDefault();
  };

  window.form = {
    addHandler: function () {
      inputTypeElement.addEventListener('input', onInputTypeElementInput);
      inputTimeInElement.addEventListener('input', onInputTimeElementInput);
      inputTimeOutElement.addEventListener('input', onInputTimeOutElementInput);
      inputRoomNumberElement.addEventListener('input', onInputRoomNumberElementInput);
      inputPriceElement.addEventListener('input', onInputTitleElementInput);
      inputTitleElement.addEventListener('input', oninputTitleElementInput);
      buttonFormElement.addEventListener('click', onValidityForm);
      buttonFormElement.addEventListener('keydown', onValidityForKeydownEnter);
      formNewAdElement.addEventListener('keydown', onValidityForKeydownEnter);
      formNewAdElement.addEventListener('reset', onResetAndDisableForm);
      formNewAdElement.addEventListener('submit', onSubmitForm);
    },
    removeHandler: function () {
      inputTypeElement.removeEventListener('input', onInputTypeElementInput);
      inputTimeInElement.removeEventListener('input', onInputTimeElementInput);
      inputTimeOutElement.removeEventListener('input', onInputTimeOutElementInput);
      inputRoomNumberElement.removeEventListener('input', onInputRoomNumberElementInput);
      inputPriceElement.removeEventListener('input', onInputTitleElementInput);
      inputTitleElement.removeEventListener('input', oninputTitleElementInput);
      buttonFormElement.removeEventListener('click', onValidityForm);
      buttonFormElement.removeEventListener('keydown', onValidityForKeydownEnter);
      formNewAdElement.removeEventListener('keydown', onValidityForKeydownEnter);
      formNewAdElement.removeEventListener('reset', onResetAndDisableForm);
      formNewAdElement.removeEventListener('submit', onSubmitForm);
    }
  };
})();
