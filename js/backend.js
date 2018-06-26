'use strict';

(function () {
  var errorText = function (xhr, onLoad, onError) {
    var error;
    switch (xhr.status) {
      case 200:
        onLoad(xhr.response);
        break;
      case 400:
        error = 'Неверный запрос';
        break;
      case 401:
        error = 'Пользователь не авторизован';
        break;
      case 404:
        error = 'Ничего не найдено';
        break;
      default:
        error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
    }
    if (error) {
      onError(error);
    }
  };

  window.backend = {
    save: function (data, onLoad, onError) {
      var URL = 'https://js.dump.academy/keksobooking';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        errorText(xhr, onLoad, onError);
      });
      xhr.open('POST', URL);
      xhr.send(data);
    },
    load: function (onLoad, onError) {
      var URL = 'https://js.dump.academy/keksobooking/data';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        errorText(xhr, onLoad, onError);
      });

      xhr.open('GET', URL);
      xhr.send();
    }
  };
})();
