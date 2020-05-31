'use strict';

(function () {
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

  var getMock = function () {
    var photos = [];
    for (var i = 1; i <= 25; i++) {
      var picture = {
        url: 'photos/' + i + '.jpg',
        likes: getRandomInRange(15, 200),
        comments: [{
          avatar: 'img/avatar-' + getRandomInRange(1, 6) + '.svg',
          message: comments[getRandomInRange(1, comments.length)],
          name: names[getRandomInRange(1, names.length)],
        }]
      };
      photos.push(picture);
    }
    return photos;
  };

  window.getMock = getMock;

})();
