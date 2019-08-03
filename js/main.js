'use strict';
var utils = function (pictures) {
  window.renderPictures(pictures);
  window.renderBigPicture(pictures);
  window.initFilter(pictures);
};

window.load(utils, window.renderMessageError);
