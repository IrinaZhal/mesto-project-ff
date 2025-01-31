import { deleteCardFromList, putLike, deleteLike } from './api.js';

export function createCard(
  cardInfo,
  userId,
  deleteCard,
  likeCard,
  handleCardImage,
  cardTemplate
) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeNumber = cardElement.querySelector('.card__like-button-counter');
  const cardId = cardInfo['_id'];
  const likesInfo = cardInfo.likes;

  cardElement.querySelector('.card__title').textContent = cardInfo.name;
  cardImage.src = cardInfo.link;
  cardImage.alt = cardInfo.name;
  likeNumber.textContent = cardInfo.likes.length;

  hideDeleteButtonIfRequired(cardInfo, userId, deleteButton);
  setUsersLikes(likesInfo, userId, likeButton);

  deleteButton.addEventListener('click', () => deleteCard(cardElement, cardId));

  likeButton.addEventListener('click', () =>
    likeCard(likeButton, likeNumber, cardId)
  );

  cardImage.addEventListener('click', () => handleCardImage(cardImage));

  return cardElement;
}

function hideDeleteButtonIfRequired(cardInfo, userId, deleteButton) {
  if (cardInfo.owner['_id'] != userId) {
    deleteButton.disabled = true;
    deleteButton.classList.add('card__delete-button_disable');
  }
}

function setUsersLikes(likesInfo, userId, likeButton) {
  if (likesInfo.some((like) => like['_id'] == userId)) {
    likeButton.classList.add('card__like-button_is-active');
  }
}

export function deleteCard(cardElement, cardId) {
  deleteCardFromList(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((error) => {
      console.log(`Ошибка при удалении карточки: ${error.message}`);
    });
}

export function likeCard(likeButton, likeNumber, cardId) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  const likeMethod = isLiked ? deleteLike : putLike;
  likeMethod(cardId)
    .then((res) => {
      likeNumber.textContent = res.likes.length;
      likeButton.classList.toggle('card__like-button_is-active');
    })
    .catch((error) =>
      console.log(
        `Ошибка при ${isLiked ? 'постановке' : 'удалении'} лайка: ${
          error.message
        }`
      )
    );
}
