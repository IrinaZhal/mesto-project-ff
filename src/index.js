import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, deleteCard, likeCard} from './scripts/card.js'
import { openPopup, closePopup } from './scripts/modal.js';

export const cardTemplate = document.querySelector('#card-template').content;
const list = document.querySelector('.places__list');

const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

const popupProfile = document.querySelector('.popup_type_edit');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const profileFormElement = document.querySelector('.popup_type_edit .popup__form');
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');

const popupAddCard = document.querySelector('.popup_type_new-card');

export const popupCardImage = document.querySelector('.popup_type_image');
export const popupImage = document.querySelector('.popup__image');
export const popupImageName = document.querySelector('.popup__caption');

const cardFormElement = document.querySelector('.popup_type_new-card .popup__form');
const placeNameInput = cardFormElement.querySelector('.popup__input_type_card-name');
const placeLinkInput = cardFormElement.querySelector('.popup__input_type_url');

editProfileButton.addEventListener('click', editProfileHandler);

function editProfileHandler(evt) {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
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
