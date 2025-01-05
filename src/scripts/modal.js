import { popups } from '../index.js';

export function openPopup(popupName, closePopup) {
  popupName.classList.add('popup_is-opened');

  const openedPopup = document.querySelector('.popup_is-opened');
  const closePopupButton = openedPopup.querySelector('.popup__close');

  closePopupButton.addEventListener('click', () => closePopup(popups));

  openedPopup.addEventListener('click', OverlayHandler);

  document.addEventListener('keydown', keyHandlerEsc);
}

export function closePopup(popups) {
  popups.forEach(function (item) {
    if (item.classList.contains('popup_is-opened')) {
      item.classList.remove('popup_is-opened');
    }
  });
}

export function keyHandlerEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(popups);
    document.removeEventListener('keydown', keyHandlerEsc);
  }
}

export function OverlayHandler(evt) {
  if (evt.target.classList.contains('popup_is-opened')) {
    closePopup(popups);
  }
}
