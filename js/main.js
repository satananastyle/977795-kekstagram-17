'use strict';

var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var names = [
  'Шелдон',
  'Леонард',
  'Говард',
  'Раджеш',
  'Пенни',
  'Бернадед'
];

var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getPictures = function () {
  var photos = [];
  for (var i = 1; i <= 25; i++) {
    var picture = {
      url: 'photos/' + i + '.jpg',
      likes: getRandomInRange(15, 200),
      comment: [{
        avatar: 'img/avatar-' + getRandomInRange(1, 6) + '.svg',
        message: comments[getRandomInRange(1, comments.length)],
        name: names[getRandomInRange(1, names.length)],
      }]
    };
    photos.push(picture);
  }
  return photos;
};

var pictures = getPictures();

var listElement = document.querySelector('.pictures');

var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

var renderPicture = function (photo) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__comments').textContent = photo.comment.length;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;

  return pictureElement;
};

var renderPictures = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pictures.length; i++) {
    fragment.appendChild(renderPicture(pictures[i]));
    listElement.appendChild(fragment);
  }
};

renderPictures();

var ESC_CODE = 27;

var uploadFile = document.querySelector('#upload-file');
var formChangeFile = document.querySelector('.img-upload__overlay');
var closeForm = formChangeFile.querySelector('.img-upload__cancel');

var photo = document.querySelector('.img-upload__preview img');

var effectLevel = formChangeFile.querySelector('.effect-level');
var effectLevelLine = formChangeFile.querySelector('.effect-level__line');
var effectLevelValue = formChangeFile.querySelector('.effect-level__value');
var effectLevelPin = formChangeFile.querySelector('.effect-level__pin');
var effectLevelDepth = formChangeFile.querySelector('.effect-level__depth');

var onPopupEscPress = function (evt) {
  var textDescription = formChangeFile.querySelector('.text__description');
  if (evt.keyCode === ESC_CODE && document.activeElement !== textDescription) {
    closePopup();
  }
};

var openPopup = function () {
  changeEffect();
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

var effect = document.querySelector('.effects');

effect.addEventListener('change', function (evt) {
  var element = evt.target;

  photo.classList.remove(photo.removeAttribute('class'));
  photo.classList.add('effects__preview--' + element.getAttribute('value'));
  changeEffect();
});

var changeEffect = function () {
  if (!photo.hasAttribute('class') || photo.className === 'effects__preview--none') {
    effectLevel.style.display = 'none';
  } else {
    effectLevel.style.display = 'block';
    effectLevelPin.style.left = '100%';
    effectLevelDepth.style.width = '100%';
  }
};

effectLevelPin.addEventListener('mousedown', function (evt) {
  var startCoords = {
    x: evt.clientX,
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
    };

    startCoords = {
      x: moveEvt.clientX,
    };
    var newLeft = effectLevelPin.offsetLeft - shift.x;

    var rightEdge = effectLevelLine.offsetWidth;

    if (newLeft > rightEdge) {
      newLeft = rightEdge;
    } if (newLeft < 0) {
      newLeft = 0;
    }

    effectLevelPin.style.left = newLeft + 'px';

    var levelEffect = (newLeft * 100) / effectLevelLine.offsetWidth;
    effectLevelDepth.style.width = levelEffect + '%';

    effectLevelValue.setAttribute('value', levelEffect);

    var maxFilter = null;
    var minFilter = null;
    var valueFilter = null;

    switch (photo.className) {
      case 'effects__preview--chrome' :
        minFilter = 0;
        maxFilter = 1;
        valueFilter = levelEffect * (maxFilter - minFilter) / 100 + minFilter;
        photo.style.filter = 'grayscale(' + valueFilter + ')';
        break;

      case 'effects__preview--sepia' :
        minFilter = 0;
        maxFilter = 1;
        valueFilter = levelEffect * (maxFilter - minFilter) / 100 + minFilter;
        photo.style.filter = 'sepia(' + valueFilter + ')';
        break;

      case 'effects__preview--marvin' :
        minFilter = 0;
        maxFilter = 100;
        valueFilter = levelEffect * (maxFilter - minFilter) / 100 + minFilter;
        photo.style.filter = 'invert(' + valueFilter + '%)';
        break;

      case 'effects__preview--phobos' :
        minFilter = 0;
        maxFilter = 3;
        valueFilter = levelEffect * (maxFilter - minFilter) / 100 + minFilter;
        photo.style.filter = 'blur(' + valueFilter + 'px)';
        break;

      case 'effects__preview--heat' :
        minFilter = 1;
        maxFilter = 3;
        valueFilter = levelEffect * (maxFilter - minFilter) / 100 + minFilter;
        photo.style.filter = 'brightness(' + valueFilter + ')';
        break;
    }
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
