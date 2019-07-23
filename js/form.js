'use strict';

(function () {
  var ESC_CODE = 27;

  var uploadFile = document.querySelector('#upload-file');
  var formChangeFile = document.querySelector('.img-upload__overlay');
  var closeForm = formChangeFile.querySelector('.img-upload__cancel');
  var textDescription = formChangeFile.querySelector('.text__description');

  var photo = document.querySelector('.img-upload__preview img');

  window.form = {
    formChangeFile: formChangeFile,
    photo: photo
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_CODE && document.activeElement !== textDescription) {
      closePopup();
    }
  };

  var openPopup = function () {
    window.changeEffect();
    formChangeFile.classList.remove('hidden');
    closeForm.addEventListener('click', onPopupEscPress);
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    photo.classList.remove(photo.removeAttribute('class'));
    formChangeFile.classList.add('hidden');
    closeForm.removeEventListener('click', onPopupEscPress);
    document.removeEventListener('keydown', onPopupEscPress);
  };

  uploadFile.addEventListener('change', function () {
    openPopup();
  });

  closeForm.addEventListener('click', function () {
    closePopup();
  });
})();
