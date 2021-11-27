const display = document.querySelector(".display-container");
const itemsContainer = document.querySelector(".items-container");
const loadingItem = document.createElement("li");

loadingItem.textContent = "Loading...";
loadingItem.classList.add("loading-item");

let isOpen = false;
let idDebounce = null;
let isLoading = false;

function addNewElements() {
  isLoading = false;
  itemsContainer.removeChild(loadingItem);

  for (let i = 0; i < 10; i++) {
    const item = document.createElement("li");

    item.textContent = "Item";
    item.classList.add("item");
    itemsContainer.appendChild(item);
  }
}

function requestElements() {
  if (!isLoading) {
    isLoading = true;

    itemsContainer.appendChild(loadingItem);

    setTimeout(addNewElements, 1000);
  }
}

function handleScroll() {
  clearTimeout(idDebounce);

  idDebounce = setTimeout(() => {
    const reachedEnd =
      itemsContainer.offsetHeight + itemsContainer.scrollTop >=
      itemsContainer.scrollHeight;

    if (reachedEnd) {
      requestElements();
    }
  }, 250);
}

function toggleDropdown() {
  if (isOpen) {
    itemsContainer.classList.remove("open");
    display.textContent = "Click here to open";
    isOpen = false;
  } else {
    itemsContainer.classList.add("open");
    display.textContent = "Click here to close";
    isOpen = true;
  }
}

display.addEventListener("click", toggleDropdown);

itemsContainer.addEventListener("scroll", handleScroll);
