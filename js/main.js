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
var effectLevelpin = formChangeFile.querySelector('.effect-level__pin');
var effectLevelDepth = formChangeFile.querySelector('.effect-level__depth');


var onClose = function () {
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_CODE) {
      photo.classList.remove(photo.removeAttribute('class'));
      formChangeFile.classList.add('hidden');
      document.removeEventListener('keydown', onClose);
    }
  });
};

uploadFile.addEventListener('change', function () {
  formChangeFile.classList.remove('hidden');
  document.addEventListener('keydown', onClose);
  changeEffect();
});

closeForm.addEventListener('click', function () {
  photo.classList.remove(photo.removeAttribute('class'));
  formChangeFile.classList.add('hidden');
  document.removeEventListener('keydown', onClose);
});

var fieldset = document.querySelector('.effects');

fieldset.addEventListener('change', function (evt) {
  var element = evt.target;

  photo.classList.remove(photo.removeAttribute('class'));
  photo.classList.add('effects__preview--' + element.getAttribute('value'));
  changeEffect();
}
);

var changeEffect = function () {
  if (!photo.hasAttribute('class') || photo.className === 'effects__preview--none') {
    effectLevel.style.display = 'none';
  } else {
    effectLevel.style.display = 'block';
    effectLevelpin.style.left = '100%';
    effectLevelDepth.style.width = '100%';
  }
};
