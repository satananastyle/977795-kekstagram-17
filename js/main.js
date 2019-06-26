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

var random = function (length) {
  return Math.floor(Math.random() * length);
};

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var pictures = [];

for (var i = 0; i < 25; i++) {
  var picture = {
    url: 'photos/' + (i + 1) + '.jpg',
    likes: getRandomInRange(15, 200),
    comment: [{
      avatar: 'img/avatar-' + getRandomInRange(1, 6) + '.svg',
      message: comments[random(comments.length)],
      name: names[random(names.length)],
    }]
  };

  pictures[i] = picture;
}

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

var fragment = document.createDocumentFragment();
for (var j = 0; j < pictures.length; j++) {
  fragment.appendChild(renderPicture(pictures[j]));
}

listElement.appendChild(fragment);
