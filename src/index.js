import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, deleteCard, likeCard} from './scripts/card.js'
import { openPopup, closePopup } from './scripts/modal.js';
import { enableValidation, clearValidation, validationConfig } from './scripts/validation.js';

export const cardTemplate = document.querySelector('#card-template').content;
const list = document.querySelector('.places__list');

const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

const popupProfile = document.querySelector('.popup_type_edit');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

export const profileFormElement = document.querySelector('.popup_type_edit .popup__form');
export const nameInput = profileFormElement.querySelector('.popup__input_type_name');
export const jobInput = profileFormElement.querySelector('.popup__input_type_description');

export const profileFormError = profileFormElement.querySelector(`.${nameInput.id}-error`);

const popupAddCard = document.querySelector('.popup_type_new-card');

export const popupCardImage = document.querySelector('.popup_type_image');
export const popupImage = document.querySelector('.popup__image');
export const popupImageName = document.querySelector('.popup__caption');

export const cardFormElement = document.querySelector('.popup_type_new-card .popup__form');
export const placeNameInput = cardFormElement.querySelector('.popup__input_type_card-name');
export const placeLinkInput = cardFormElement.querySelector('.popup__input_type_url');

editProfileButton.addEventListener('click', editProfileHandler, placeNameInput, placeLinkInput);

function editProfileHandler(evt) {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(popupProfile, validationConfig);
  openPopup(popupProfile);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  nameInput.textContent = nameInput.value;
  jobInput.textContent = jobInput.value;

  profileTitle.textContent = nameInput.textContent;
  profileDescription.textContent = jobInput.textContent;

  closePopup(popupProfile);
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit);

addCardButton.addEventListener('click', function (evt) {
  cardFormElement.reset();
  clearValidation(popupAddCard, validationConfig);
  openPopup(popupAddCard);
});

function handleCardFormSumbit(evt) {
  evt.preventDefault();
  addCard(placeNameInput.value, placeLinkInput.value);
  closePopup(popupAddCard);
}

cardFormElement.addEventListener('submit', handleCardFormSumbit);

export function handleCardImage(cardImage) {
  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;
  popupImageName.textContent = cardImage.alt;
  openPopup(popupCardImage, closePopup);
}

function addCard(name, link) {
  const card = createCard(name, link, deleteCard, likeCard, handleCardImage, cardTemplate);
  list.prepend(card);
}

initialCards.forEach(function (item) {
  addCard(item.name, item.link);
});

enableValidation(validationConfig);