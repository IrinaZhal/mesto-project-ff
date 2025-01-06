
export function openPopup(popupElement) {
  popupElement.classList.add('popup_is-opened');

  popupElement.addEventListener('click', closeByClick);

  document.addEventListener('keydown', closeByEsc);
}

export function closePopup(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  popupElement.removeEventListener('click', closeByClick);
  document.removeEventListener('keydown', closeByClick);
}

export function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
}

export function closeByClick(evt) {
  if (evt.target.classList.contains('popup_is-opened') || 
      evt.target.classList.contains('popup__close')) {
    closePopup(evt.currentTarget);
  }
}
