import './pages/index.css';
import { createCard, deleteCard, likeCard } from './scripts/card.js';
import { openPopup, closePopup } from './scripts/modal.js';
import {
  enableValidation,
  clearValidation
} from './scripts/validation.js';
import { validationConfig } from './scripts/config.js';
import {
  getUserInfo,
  getCardsList,
  postCard,
  changeUserInfo,
  changeAvatar,
} from './scripts/api.js';

export const cardTemplate = document.querySelector('#card-template').content;
const list = document.querySelector('.places__list');

const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

const popupProfile = document.querySelector('.popup_type_edit');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');
const popupChageAvatar = document.querySelector('.popup_type_change-avatar');

export const profileFormElement = document.querySelector('.popup_type_edit .popup__form');
export const nameInput = profileFormElement.querySelector('.popup__input_type_name');
export const jobInput = profileFormElement.querySelector('.popup__input_type_description');

export const profileFormError = profileFormElement.querySelector(`.${nameInput.id}-error`);

const popupAddCard = document.querySelector('.popup_type_new-card');

export const popupCardImage = document.querySelector('.popup_type_image');
export const popupImage = document.querySelector('.popup__image');
export const popupImageName = document.querySelector('.popup__caption');

export const cardFormElement = document.querySelector(
  '.popup_type_new-card .popup__form'
);
export const placeNameInput = cardFormElement.querySelector(
  '.popup__input_type_card-name'
);
export const placeLinkInput = cardFormElement.querySelector(
  '.popup__input_type_url'
);

const changeAvatarForm = document.querySelector('.popup_type_change-avatar .popup__form');
const avatarInput = document.querySelector('.popup__input_type_avatar');

profileAvatar.addEventListener('click', function(evt) {
  changeAvatarForm.reset();
  clearValidation(popupChageAvatar, validationConfig);
  openPopup(popupChageAvatar);
});

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  
  renderLoading(true, popupChageAvatar);
  changeAvatar(avatarInput.value)
  .then((res) => {
    profileAvatar.style.backgroundImage = `url(${res.avatar})`;
  })
  .catch((error) => {
    console.log(`Ошибка при изменении аватара: ${error.message}`)
  })
  .finally(() => {
    renderLoading(false, popupChageAvatar);
   });
  
   closePopup(popupChageAvatar);
}

changeAvatarForm.addEventListener('submit', handleAvatarFormSubmit);

editProfileButton.addEventListener(
  'click',
  editProfileHandler,
  placeNameInput,
  placeLinkInput
);

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

  renderLoading(true, popupProfile);
  changeUserInfo(
    nameInput.textContent,
    jobInput.textContent
  )
  .then((res) => {
    profileTitle.textContent = res.name;
    profileDescription.textContent = res.about; 
  })
  .catch((error) => {
    console.log(`Ошибка при редактировании профиля: ${error.message}`);
  })
   .finally(() => {
    renderLoading(false, popupProfile);
   });

  closePopup(popupProfile);
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit);

addCardButton.addEventListener('click', function (evt) {
  cardFormElement.reset();
  clearValidation(popupAddCard, validationConfig);
  openPopup(popupAddCard);
});

let userId;

function handleCardFormSumbit(evt) {
  evt.preventDefault();
  
  renderLoading(true, popupAddCard);
    postCard(placeNameInput.value, placeLinkInput.value)
   .then((cardInfo) => {
    addCard(cardInfo, userId);
   })
   .catch((error) => {
    console.log(`Ошибка при добавлении карточки: ${error.message}`);
   })
   .finally(() => {
    renderLoading(false, popupAddCard);
   });

  closePopup(popupAddCard);
}

cardFormElement.addEventListener('submit', handleCardFormSumbit);

export function handleCardImage(cardImage) {
  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;
  popupImageName.textContent = cardImage.alt;
  openPopup(popupCardImage, closePopup);
}

export function addCard(cardInfo, userId) {
  const card = createCard(
    cardInfo,
    userId,
    deleteCard,
    likeCard,
    handleCardImage,
    cardTemplate
  );
  list.prepend(card);
}

enableValidation(validationConfig);

Promise.all([getUserInfo(), getCardsList()])
  .then(([userInfo, cardsList]) => {
    userId = userInfo['_id'];
    setProfileInfo(userInfo, profileTitle, profileDescription, profileAvatar);
    handleCardsList(cardsList, userId);
  })
  .catch((error) => {
    console.error(error);
  });

function handleCardsList(cardsList, userId) {
  cardsList.forEach((cardInfo) => {
    const card = createCard(
      cardInfo,
      userId,
      deleteCard,
      likeCard,
      handleCardImage,
      cardTemplate);
    list.append(card);
   
  });
}

function setProfileInfo(userInfo, profileTitle, profileDescription, profileAvatar) {
  profileTitle.textContent = userInfo.name;
  profileDescription.textContent = userInfo.about;
  profileAvatar.style.backgroundImage = `url(${userInfo.avatar})`;
}

function renderLoading(isLoading, popupElement) {
  const popupSubmitButton = popupElement.querySelector('.popup__button');
  if (isLoading) {
  popupSubmitButton.textContent = 'Сохранение...';
  } else {
  popupSubmitButton.textContent = 'Сохранить';
  }
}