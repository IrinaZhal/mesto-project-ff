import { cardTemplate, popupCardImage, createPopupCardImage } from '../index.js'
import { openPopup, closePopup } from './modal.js'

export function createCard(name, link, deleteCard, likeCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardElement.querySelector('.card__title').textContent = name;
  cardImage.src = link;
  cardImage.alt = `${name}`;

  deleteButton.addEventListener('click', () => deleteCard(cardElement));

  likeButton.addEventListener('click', () => likeCard(likeButton));

  cardImage.addEventListener('click', cardImageHandler);

  return cardElement;
}

export function deleteCard(cardElement) {
  cardElement.remove();
}

export function likeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

export function cardImageHandler(evt) {
    createPopupCardImage(evt.target.src, evt.target.alt);
    openPopup(popupCardImage, closePopup);
  }