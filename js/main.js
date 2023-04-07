const cardList = document.querySelector(".card__list");
const form = document.querySelector(".form");
const titleInput = document.querySelector(".titleInput");
const emailInput = document.querySelector(".emailInput");
const addBtn = document.querySelector(".addBtn");
const itemId = document.querySelector(".itemId");
const loader_container = document.querySelector(".loader__container");
const loader = document.createElement("div");
loader_container.append(loader);
loader.classList.add("loader");
let currentPage = 1;
async function fetchData() {
  url = `https://reqres.in/api/users?page=${currentPage}`;
  try {
    cardList.innerHTML = "";
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    });
    const information = await response.json();
    information.data.map((elements) => {
      const cardItem = document.createElement("li");
      cardList.append(cardItem);
      cardItem.classList.add("card__item");
      const cardTitle = document.createElement("h2");
      cardItem.append(cardTitle);
      cardTitle.classList.add("card__title");
      cardTitle.textContent = elements.first_name;
      const cardEmail = document.createElement("p");
      cardItem.append(cardEmail);
      cardEmail.classList.add("card__email");
      cardEmail.innerHTML = elements.email;
      const cardImgBlock = document.createElement("div");
      cardItem.append(cardImgBlock);
      cardImgBlock.classList.add("card__img");
      const cardImg = document.createElement("img");
      cardImgBlock.append(cardImg);
      cardImg.src = elements.avatar;
    });
    const paginationWrapper = document.querySelector(".pagination__wrapper");
    paginationWrapper.innerHTML = "";
    if (information.total_pages > 1) {
      for (let i = 1; i <= 2; i++) {
        const button = document.createElement("button");
        paginationWrapper.append(button);
        button.textContent = i;
        button.classList.add("pagination__wrapper-btn");
        if (currentPage === i) {
          button.classList.add("active");
        }
        button.addEventListener("click", (e) => {
          e.preventDefault();
          currentPage = i;
          fetchData();
        });
      }
    }
  } catch (error) {
    console.error(error.message);
  }
}
fetchData();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      title: titleInput.value,
      email: emailInput.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      form.reset();
      const cardItem = document.createElement("li");
      cardList.append(cardItem);
      cardItem.classList.add("card__item");
      const cardTitle = document.createElement("h2");
      cardItem.append(cardTitle);
      cardTitle.classList.add("card__title");
      cardTitle.textContent = data.title;
      const cardEmail = document.createElement("p");
      cardItem.append(cardEmail);
      cardEmail.classList.add("card__email");
      cardEmail.innerHTML = data.email;
    });
});
