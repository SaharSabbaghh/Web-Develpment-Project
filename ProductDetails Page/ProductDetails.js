//images switch functionality starts

let minorImg = document.querySelectorAll(".minor img");
let mainImg = document.querySelector(".mainImg img");
let minorbox = document.querySelectorAll(".minor");
for (let i = 0; i < minorImg.length; i++) {
  minorbox[i].addEventListener("click", () => {
    let minorsrc = minorImg[i].getAttribute("src");
    let mainsrc = mainImg.getAttribute("src");
    mainImg.setAttribute("src", minorsrc);
    minorImg[i].setAttribute("src", mainsrc);
  });
}

//images switch functionality ends

//quantity of items functionality starts
let decrement = document.querySelector(".minus");
let increment = document.querySelector(".plus");
let quantity = document.querySelector(".productQuantity");
let quantity_Counter = 1;
increment.addEventListener("click", () => {
  quantity_Counter++;
  quantity.innerHTML =
    quantity_Counter < 10 ? "0" + quantity_Counter : quantity_Counter;
});

decrement.addEventListener("click", () => {
  if (quantity_Counter > 1) {
    quantity_Counter--;

    quantity.textContent =
      quantity_Counter < 10 ? "0" + quantity_Counter : quantity_Counter;
  }
});

//quantity of items functionality ends

//whishlist icon animation click starts
let whishlist = document.querySelector(".whichList i");
whishlist.addEventListener("click", function () {
  if (whishlist.classList.contains("fa-regular") == true) {
    whishlist.classList.remove("fa-regular");
    whishlist.classList.add("fa-solid");
    document.querySelector(".whichList").style.backgroundColor = "#92c7cf";
    whishlist.style.color = "white";
  } else {
    whishlist.classList.remove("fa-solid");
    whishlist.classList.add("fa-regular");
    document.querySelector(".whichList").style.backgroundColor = "white";
    whishlist.style.color = "black";
  }
});
//whishlist icon animation click ends

//product box sliding starts

let productBox = document.querySelector(".cards-Box");
let next = document.querySelector(".next_btn");
let previous = document.querySelector(".prev_btn");
let card = document.querySelector(".cardBox");

let cardWidth = card.getBoundingClientRect().width;
let boxWith = productBox.getBoundingClientRect().width;

next.addEventListener("click", () => {
  productBox.scrollLeft += cardWidth + 10;
});

previous.addEventListener("click", () => {
  productBox.scrollLeft -= cardWidth + 10;
});

//product box sliding ends

//nav and footer js starts
// NavBar
let activePage = window.location.pathname.split("/").pop();
document.querySelectorAll("ul.ul1 li a").forEach((link) => {
  let linkPage = link.href.split("/").pop();
  if (linkPage === activePage) {
    link.classList.add("active");
  }
});

// SideBar
document.querySelector(".ham-icon i").addEventListener("click", function () {
  document.querySelector(".sidebar").classList.remove("hidden");
});

document
  .querySelector(".sidebar-text i")
  .addEventListener("click", function () {
    document.querySelector(".sidebar").classList.add("hidden");
  });

// footer
document
  .querySelector(".subscribe-btn button")
  .addEventListener("click", function () {
    let emailInput = document.querySelector(".subscribe-input input");
    let errorMessage = document.querySelector(".errorMessage");

    if (emailInput.value === "") {
      errorMessage.textContent = "Please enter your email address.";
      errorMessage.style.display = "block";
    } else if (!emailInput.value.includes("@")) {
      errorMessage.textContent = "Please enter a valid email address.";
      errorMessage.style.display = "block";
    } else {
      errorMessage.style.display = "none";
      emailInput.value = "";
    }
  });

//nav and footer js ends
