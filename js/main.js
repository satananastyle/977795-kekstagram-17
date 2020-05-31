'use strict';

var init = function (pictures) {
  window.renderPictures(pictures);
  window.initFilter(pictures);
};

var pictures = window.getMock();

init(pictures);
