'use strict';
(function () {
  var filter = document.querySelector('.img-filters');

  window.onload = function () {
    filter.classList.remove('img-filters--inactive');

    var getActiveButton = function (evt) {
      var button = evt.target;

      if (evt.target.tagName === 'BUTTON') {
        var filterButtonActive = document.querySelector('.img-filters__button--active');
        filterButtonActive.classList.remove('img-filters__button--active');
        button.classList.add('img-filters__button--active');
      }

      if (evt.target.id === 'filter-popular') {
        getFilterPictures(window.picturesData);
      } else if (evt.target.id === 'filter-new') {
        var newPictures = getRandomPictures();
        getFilterPictures(newPictures);
      } else if (evt.target.id === 'filter-discussed') {
        var array = sortPictures(window.picturesData);
        getFilterPictures(array);
      } else {
        getFilterPictures(window.picturesData);
      }
    };

    filter.addEventListener('click', getActiveButton);
  };

  var sortPictures = function () {
    var picturesCopy = window.picturesData.slice();
    picturesCopy.sort(function (first, second) {
      var firstCommentsLength = first.comments.length;
      var secondCommentsLength = second.comments.lenght;
      if (firstCommentsLength < secondCommentsLength) {
        return 1;
      } else if (firstCommentsLength > secondCommentsLength) {
        return -1;
      } else {
        return 0;
      }
    });
    return picturesCopy;
  };

  function getRandomArbitrary() {
    return Math.random() - 0.5;
  }

  var getRandomPictures = function () {
    var picturesCopy = window.picturesData.slice();
    return picturesCopy.sort(getRandomArbitrary).slice(0, 10);
  };

  var getFilterPictures = function (pictures) {
    var picturesList = document.querySelectorAll('.picture');
    picturesList.forEach(function (element) {
      element.remove();
    });
    window.pictures.renderPicturesSuccess(pictures);
  };
})();
