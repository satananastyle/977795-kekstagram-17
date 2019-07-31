'use strict';
(function () {
  var filter = document.querySelector('.img-filters');
  var filterPopular = document.querySelector('#filter-popular');
  var filterNew = document.querySelector('#filter-new');
  var filterDiscussed = document.querySelector('#filter-discussed');

  window.onload = function () {
    filter.classList.remove('img-filters--inactive');

    var getActiveButton = function (evt) {
      var button = evt.target;

      var filterButtonActive = document.querySelector('.img-filters__button--active');
      filterButtonActive.classList.remove('img-filters__button--active');
      button.classList.add('img-filters__button--active');
    };

    filter.addEventListener('click', getActiveButton);
  };

  var sortPictures = function () {
    var picturesCopy = window.picturesData.slice();
    picturesCopy.sort(function (first, second) {
      if (first.comments.length < second.comments.lenght) {
        return 1;
      } else if (first.comments.length > second.comments.length) {
        return -1;
      } else {
        return 0;
      }
    });
    return picturesCopy;
  };

  function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  var getRandomPictures = function () {
    var picturesCopy = window.picturesData.slice();
    var endOfRandom = picturesCopy.length - 10;
    for (var i = endOfRandom; i > 0; i--) {
      var j = getRandomArbitrary(0, picturesCopy.length);
      picturesCopy.splice(j, 1);
    }
    return picturesCopy;
  };

  filterPopular.addEventListener('click', function () {
    window.picturesList.forEach(function (wizard) {
      wizard.remove();
    });
    window.pictures.onLoadPicturesSuccess(window.picturesData);
  });

  filterDiscussed.addEventListener('click', function () {
    window.picturesList.forEach(function (wizard) {
      wizard.remove();
    });
    var array = sortPictures(window.picturesData);
    window.pictures.onLoadPicturesSuccess(array);
  });

  filterNew.addEventListener('click', function () {
    window.picturesList.forEach(function (wizard) {
      wizard.remove();
    });
    var newPictures = getRandomPictures();
    window.pictures.onLoadPicturesSuccess(newPictures);
  });

})();
