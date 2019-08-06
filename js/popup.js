'use strict';

(function () {
  var ESC_CODE = 27;

  var uploadFile = document.querySelector('#upload-file');
  var closeForm = document.querySelector('.img-upload__cancel');
  var textDescription = document.querySelector('.text__description');
  var hashtag = document.querySelector('.text__hashtags');
  var submit = document.querySelector('.img-upload__submit');
  var successMessage = document.querySelector('#success').content.querySelector('.success');
  var main = document.querySelector('main');
  var successButton = successMessage.querySelector('.success__button');

  var customValidation = function () {
    var value = hashtag.value;
    var tags = value.split(' ');
    var tagsCopy = tags.map(function (hash) {
      return hash.toLowerCase();
    });
    var textError = '';

    if (value.trim() !== '') {
      if (tags.length > 5) {
        textError = 'Хештегов должно быть не больше 5';
        return textError;
      }

      for (var i = 0; i < tags.length; i++) {
        var hash = tags[i];

        if (hash.length > 20) {
          textError = 'Длина хештега должна быть не больше 20 символов';
        } else if (hash === '#') {
          textError = 'Хештег не может состоять только из #';
        } else if (hash[0] !== '#') {
          textError = 'Хештег должен начинаться с #';
        } else if (tagsCopy.indexOf(hash.toLowerCase(), i + 1) !== -1) {
          textError = 'Хештеги не должны повторяться';
        }

        if (textError) {
          break;
        }
      }
    }
    return textError;
  };

  var onCloseSuccessClick = function () {
    successMessage.remove();
    removeListenersSuccess();
  };

  var onDocumentClick = function (evt) {
    var parent = evt.target.classList.contains('.success__inner');
    if (!parent) {
      onCloseSuccessClick();
    }
  };

  var onSuccessEscPress = function (evt) {
    if (evt.keyCode === ESC_CODE) {
      onCloseSuccessClick();
    }
  };

  var removeListenersSuccess = function () {
    successButton.removeEventListener('click', onCloseSuccessClick);
    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onSuccessEscPress);
  };

  var successPopup = function (evt) {
    evt.preventDefault(evt);
    evt.stopPropagation(evt);

    main.appendChild(successMessage);
    closeForm.click();

    successButton.addEventListener('click', onCloseSuccessClick);
    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onSuccessEscPress);
  };

  submit.addEventListener('click', function (evt) {
    var errorText = customValidation();
    if (errorText) {
      hashtag.style = 'border: 2px solid red';
      hashtag.setCustomValidity(errorText);
    } else {
      hashtag.style = 'border: 2px inset initial';
      evt.preventDefault();
      successPopup(evt);
    }
  });

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
