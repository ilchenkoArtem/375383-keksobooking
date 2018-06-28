'use strict';

(function () {
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
  var optionsCapacity = inputCapacity.querySelectorAll('option');
  // функция добавления атрибута disabled
  var disableNumber = function (number) {
    number.disabled = 'disabled';
  };
  // функция управления настройками поля 'Колличество мест'
  var onСhangeCapacity = function () {
    for (var i = 0; i < optionsCapacity.length; i++) {
      optionsCapacity[i].disabled = null;
    }
    if (inputRoomNumber.value === '2') {
      disableNumber(optionsCapacity[0]);
      disableNumber(optionsCapacity[3]);
      if (inputCapacity.value === '3' || inputCapacity.value === '0') {
        inputCapacity.value = '2';
      }
    } else if (inputRoomNumber.value === '1') {
      disableNumber(optionsCapacity[0]);
      disableNumber(optionsCapacity[1]);
      disableNumber(optionsCapacity[3]);
      if (inputCapacity.value !== '1') {
        inputCapacity.value = '1';
      }
    } else if (inputRoomNumber.value === '3') {
      disableNumber(optionsCapacity[3]);
      optionsCapacity[3].disabled = 'disabled';
      if (inputCapacity.value === '0') {
        inputCapacity.value = '3';
      }
    } else {
      disableNumber(optionsCapacity[0]);
      disableNumber(optionsCapacity[1]);
      disableNumber(optionsCapacity[2]);
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

  var standartReset = function () {
    inputPrice.placeholder = 1000;
    inputPrice.min = 1000;
    inputCapacity.value = '1';
    disableNumber(optionsCapacity[0]);
    disableNumber(optionsCapacity[1]);
    disableNumber(optionsCapacity[3]);
    window.variables.mapPinMain.style = 'left: 570px; top: 375px';
    removeClasses(formInputsvalid, 'error');
  };
  var onSubmitReset = function () {
    formNewAd.removeEventListener('reset', onResetAndDisableForm);
    formNewAd.reset();
    standartReset();
    window.variables.inputAdress.value = window.util.getСoordinatesMainPin();
    formNewAd.addEventListener('reset', onResetAndDisableForm);
  };
  // функция возвращения полей в первоначальное состояние
  var onResetAndDisableForm = function () {
    setTimeout(function () {
      standartReset();
      window.variables.inputAdress.value = null;
      window.activeMap.disableMap();
    }, 0);
  };

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


  formNewAd.addEventListener('reset', onResetAndDisableForm);

  formNewAd.addEventListener('submit', function (evt) {
    window.backend.save(onSubmitReset, window.util.onError, new FormData(formNewAd));
    evt.preventDefault();
  });
})();
