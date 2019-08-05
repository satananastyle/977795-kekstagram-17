'use strict';

(function () {
  var ESC_CODE = 27;

  var uploadFile = document.querySelector('#upload-file');
  var closeForm = document.querySelector('.img-upload__cancel');
  var textDescription = document.querySelector('.text__description');
  var hashtag = document.querySelector('.text__hashtags');
  var submit = document.querySelector('.img-upload__submit');
  var successTemplate = document.querySelector('#success');
  var main = document.querySelector('main');

  var customValidation = function () {
    var value = hashtag.value;
    var arrayOfTags = value.split(' ');

    if (value !== '') {
      if (arrayOfTags.length > 5) {
        hashtag.setCustomValidity('Хештегов должно быть не больше 5');
      } else {
        hashtag.setCustomValidity('');
      }

      arrayOfTags.forEach(function (element) {
        if (element.length > 20) {
          hashtag.setCustomValidity('Длина хештега должна быть не больше 20 символов');
        } else if (element === '#') {
          hashtag.setCustomValidity('Хештег не может состоять только из #');
        } else if (element[0] !== '#') {
          hashtag.setCustomValidity('Хештег должен начинаться с #');
        } else {
          hashtag.setCustomValidity('');
        }
      });
    } else {
      successPopup();
    }
  };

  var successPopup = function () {
    var successMessage = successTemplate.cloneNode(true);
    main.appendChild(successMessage);
  };

  submit.addEventListener('click', customValidation);

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_CODE && document.activeElement !== textDescription && document.activeElement !== hashtag) {
      onCloseFormClick();
    }
  };

  var onUploadFileChange = function () {
    window.changeEffect.addListenersForm();
    closeForm.addEventListener('click', onCloseFormClick);
    document.addEventListener('keydown', onPopupEscPress);
  };

  var onCloseFormClick = function () {
    window.changeEffect.removeListenersForm();
    closeForm.removeEventListener('click', onCloseFormClick);
    document.removeEventListener('keydown', onPopupEscPress);

  };

  uploadFile.addEventListener('change', onUploadFileChange);
})();
