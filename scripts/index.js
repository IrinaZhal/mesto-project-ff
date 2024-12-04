// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const list = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(name, link, deleteCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardElement.querySelector(".card__title").textContent = name;
  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__image").alt = `${name}`;

  deleteButton.addEventListener("click", () => deleteCard(cardElement));

  return cardElement;
}

function addCard(name, link) {
  const card = createCard(name, link, deleteCard);
  list.append(card);
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
  addCard(item.name, item.link);
});
