'use strict';

(function () {
  var ENTER_KEY_KODE = 13;
  var inputPrice = document.querySelector('#price');
  var inputType = document.querySelector('#type');

  // функция меняющая минимальное значение поля "Цена"
  var onEditingTheMinPrice = function () {
    var typeToPrice = {
      'flat': 1000,
      'house': 5000,
      'palace': 10000,
      'bungalo': 0
    };
    inputPrice.placeholder = typeToPrice[inputType.value];
    inputPrice.min = typeToPrice[inputType.value];
  };

  var inputTimeIn = document.querySelector('#timein');
  var inputTimeOut = document.querySelector('#timeout');

  var onСhangeTimeIn = function () {
    inputTimeOut.value = inputTimeIn.value;

  };
  var onСhangeTimeOut = function () {
    inputTimeIn.value = inputTimeOut.value;
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

  var inputRoomNumber = document.querySelector('#room_number');
  var inputCapacity = document.querySelector('#capacity');
  var optionsCapacity = inputCapacity.querySelectorAll('option');
  // функция добавления атрибута disabled
  var disabledNumber = function (number) {
    number.disabled = 'disabled';
  };
  // функция управления настройками поля 'Колличество мест'
  var onСhangeCapacity = function () {
    for (var i = 0; i < optionsCapacity.length; i++) {
      optionsCapacity[i].disabled = null;
    }
    if (inputRoomNumber.value === '2') {
      disabledNumber(optionsCapacity[0]);
      disabledNumber(optionsCapacity[3]);
      if (inputCapacity.value === '3' || inputCapacity.value === '0') {
        inputCapacity.value = '2';
      }
    } else if (inputRoomNumber.value === '1') {
      disabledNumber(optionsCapacity[0]);
      disabledNumber(optionsCapacity[1]);
      disabledNumber(optionsCapacity[3]);
      if (inputCapacity.value !== '1') {
        inputCapacity.value = '1';
      }
    } else if (inputRoomNumber.value === '3') {
      disabledNumber(optionsCapacity[3]);
      optionsCapacity[3].disabled = 'disabled';
      if (inputCapacity.value === '0') {
        inputCapacity.value = '3';
      }
    } else {
      disabledNumber(optionsCapacity[0]);
      disabledNumber(optionsCapacity[1]);
      disabledNumber(optionsCapacity[2]);
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
  var formNewAd = document.querySelector('.ad-form');

  var resetForm = function () {
    onEditingTheMinPrice();
    inputCapacity.value = '1';
    disabledNumber(optionsCapacity[0]);
    disabledNumber(optionsCapacity[1]);
    disabledNumber(optionsCapacity[3]);
    window.variables.mapPinMain.style = 'left: 570px; top: 375px';
    removeClasses(formInputsvalid, 'error');
  };

  var onSubmitReset = function () {
    formNewAd.removeEventListener('reset', onResetAndDisableForm);
    formNewAd.reset();
    resetForm();
    window.variables.inputAdress.value = window.util.getСoordinatesMainPin();
    formNewAd.addEventListener('reset', onResetAndDisableForm);
  };
  // функция возвращения полей в первоначальное состояние
  var onResetAndDisableForm = function () {
    setTimeout(function () {
      resetForm();
      window.variables.inputAdress.value = null;
      window.disabledMap();
    }, 0);
  };

  var onInputPriceRemoveClassError = function () {
    removeClass(inputPrice, 'error');
  };

  var onInputTitleRemoveClassError = function () {
    removeClass(inputTitle, 'error');
  };

  var onValidityForKeydownEnter = function (evt) {
    if (evt.keyCode === ENTER_KEY_KODE) {
      validityForm();
    }
  };

  var onSubmitForm = function (evt) {
    window.backend.save(onSubmitReset, window.util.onError, new FormData(formNewAd));
    evt.preventDefault();
  };

  window.form = {
    addHandler: function () {
      inputType.addEventListener('input', onEditingTheMinPrice);
      inputTimeIn.addEventListener('input', onСhangeTimeIn);
      inputTimeOut.addEventListener('input', onСhangeTimeOut);
      inputRoomNumber.addEventListener('input', onСhangeCapacity);
      inputPrice.addEventListener('input', onInputPriceRemoveClassError);
      inputTitle.addEventListener('input', onInputTitleRemoveClassError);
      buttonForm.addEventListener('click', validityForm);
      buttonForm.addEventListener('keydown', onValidityForKeydownEnter);
      formNewAd.addEventListener('keydown', onValidityForKeydownEnter);
      formNewAd.addEventListener('reset', onResetAndDisableForm);
      formNewAd.addEventListener('submit', onSubmitForm);
    },
    removeHandler: function () {
      inputType.removeEventListener('input', onEditingTheMinPrice);
      inputTimeIn.removeEventListener('input', onСhangeTimeIn);
      inputTimeOut.removeEventListener('input', onСhangeTimeOut);
      inputRoomNumber.removeEventListener('input', onСhangeCapacity);
      inputPrice.removeEventListener('input', onInputPriceRemoveClassError);
      inputTitle.removeEventListener('input', onInputTitleRemoveClassError);
      buttonForm.removeEventListener('click', validityForm);
      buttonForm.removeEventListener('keydown', onValidityForKeydownEnter);
      formNewAd.removeEventListener('keydown', onValidityForKeydownEnter);
      formNewAd.removeEventListener('reset', onResetAndDisableForm);
      formNewAd.removeEventListener('submit', onSubmitForm);
    }
  };
})();
