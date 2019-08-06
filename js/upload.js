'use strict';
(function () {
  var URL = 'https://js.dump.academy/kekstagram';
  var STATUS_OK = 200;

  var upload = function (data, onError, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.upload = upload;
})();
