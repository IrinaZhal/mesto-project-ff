import { deleteCardFromList, apiConfig, putLike, deleteLike } from "./api.js";

export function createCard(cardInfo, userId, deleteCard, likeCard, handleCardImage, cardTemplate) {
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
 
  hideDeleteButton(cardInfo, userId, deleteButton);
  setUsersLikes(likesInfo, userId, likeButton);
  
  deleteButton.addEventListener('click', () => deleteCard(cardElement, cardId));
  
  likeButton.addEventListener('click', () => likeCard(likeButton, likeNumber, cardId));

  cardImage.addEventListener('click', () => handleCardImage(cardImage));

  return cardElement;
}

function hideDeleteButton(cardInfo, userId, deleteButton) {
  if (cardInfo.owner['_id'] != userId) {
    deleteButton.disabled = true;
    deleteButton.classList.add('card__delete-button_disable');
}}

function setUsersLikes(likesInfo, userId, likeButton) {
  likesInfo.forEach((like) => {
    if (like['_id'] == userId) {
    likeButton.classList.add('card__like-button_is-active');
    }
  })
}

export function deleteCard(cardElement, cardId) {
  deleteCardFromList(apiConfig, cardId)
  .then(() => {
    cardElement.remove();
  })
  .catch((error) => {
    console.log(`Ошибка при удалении карточки: ${error.message}`);
  });
}

export function likeCard(likeButton, likeNumber, cardId) {
  if (likeButton.classList.contains('card__like-button_is-active')) {
    deleteLike(apiConfig, cardId)
    .then((res) => {
      likeNumber.textContent = res.likes.length;
    })
     .then(() => {
      likeButton.classList.remove('card__like-button_is-active');
    })
     .catch((error) => {
      console.log(`Ошибка при удалении лайка: ${error.message}`);
    })
  } else {
    putLike(apiConfig, cardId)
    .then((res) => {
      likeNumber.textContent = res.likes.length;
    })
    .then(() => {
      likeButton.classList.add('card__like-button_is-active');
    })
   .catch((error) => {
     console.log(`Ошибка при постановке лайка: ${error.message}`);
   })
  }
}