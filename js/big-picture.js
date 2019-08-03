'use strict';

(function () {

  var bigPicture = document.querySelector('.big-picture');
  var listComments = bigPicture.querySelector('.social__comments');

  var renderComment = function (comment) {
    var commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');

    var commentElementImg = document.createElement('img');
    commentElementImg.classList.add('social__picture');
    commentElementImg.src = comment.avatar;
    commentElementImg.alt = 'Аватар комментатора фотографии';
    commentElementImg.width = '35';
    commentElementImg.height = '35';
    commentElement.appendChild(commentElementImg);

    var commentElementText = document.createElement('p');
    commentElementText.classList.add('social__text');
    commentElementText.textContent = comment.message;
    commentElement.appendChild(commentElementText);

    return commentElement;
  };

  var renderComments = function (comments) {
    listComments.innerHTML = '';

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < comments.length; i++) {
      var comment = renderComment(comments[i]);
      fragment.appendChild(comment);
    }
    listComments.appendChild(fragment);
  };

  var renderBigPicture = function (photo) {

    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
    bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');

    bigPicture.querySelector('.big-picture__img img').src = photo.url;

    bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    bigPicture.querySelector('.social__caption').textContent = photo.description;

    renderComments(photo.comments);
  };

  window.renderBigPicture = renderBigPicture;
})();
