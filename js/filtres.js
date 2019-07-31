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

  var getFilterPictures = function (pictures) {
    window.picturesList.forEach(function (element) {
      element.remove();
    });
    window.pictures.onLoadPicturesSuccess(pictures);
  };

  filterPopular.addEventListener('click', function () {
    getFilterPictures(window.picturesData);
  });

  filterDiscussed.addEventListener('click', function () {
    var array = sortPictures(window.picturesData);
    getFilterPictures(array);
  });

  filterNew.addEventListener('click', function () {
    var newPictures = getRandomPictures();
    getFilterPictures(newPictures);
  });

})();
