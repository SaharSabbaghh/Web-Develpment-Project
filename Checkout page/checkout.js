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

//nav and footer js ends

///bank radio starts
let bankradio = document.getElementById("Bank");
let cashradio = document.getElementById("cash");
let cardCode = document.getElementById("cardCode");
let bankclick = 0;
bankradio.addEventListener("change", () => {
  if (bankradio.checked) {
    cardCode.style.display = "block";
    cardCode.classList.add("shiftDown");

    cardCode.classList.remove("shiftUP");
    bankclick++;
  } else {
    cardCode.style.display = "block";
    cardCode.classList.remove("shiftDown");

    cardCode.classList.add("shiftUP");
  }
  cardCode.value = "";
});
cashradio.addEventListener("change", () => {
  if (cashradio.checked) {
    if (bankclick > 0) {
      cardCode.style.display = "block";

      cardCode.classList.remove("shiftDown");
      cardCode.classList.add("shiftUP");
    }
  } else {
    cardCode.style.display = "block";

    cardCode.classList.add("shiftDown");
    cardCode.classList.remove("shiftUP");
  }
  cardCode.value = "";
});
let carcodeClick = 0;
cardCode.addEventListener("focus", () => {
  cardCode.setAttribute("placeholder", "XXXX XXXX XXXX XXXX");
});
cardCode.addEventListener("blur", () => {
  cardCode.setAttribute("placeholder", "Enter Your Card Code");
});

//bank radio ends

//products start

// let products = document.getElementsByClassName("product");
// let PTotal = 0;
// let subtotal = document.querySelector(".subtotal span");
// let Total = document.querySelector(".total span");
// let Psubtotal = document.querySelectorAll(".productSubtotal span");
// for (let i = 0; i < products.length; i++) {
//   PTotal = PTotal + parseInt(Psubtotal[i].innerHTML);

//   subtotal.innerHTML = PTotal.toString();
//   Total.innerHTML = subtotal.textContent;
// }

//products end

document.addEventListener("DOMContentLoaded", () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let productContainer = document.querySelector(".productsContainer");
  let Total = document.querySelector(".total p span");
  let subtotal = document.querySelector(".subtotal p span");
  let TotalAdder = 0;

  function displayCartProducts() {
    productContainer.innerHTML = ""; // Clear the cart container before appending new items

    cart.forEach((product) => {
      let productHTML = `
     <div class="product">
              <div class="productInfo">
                <div class="imgbox">
                  <img
                    src="${product.image}"
                    alt="${product.title}"
                  />
                </div>
                <p>${product.title}</p>
              </div>
              <div class="productSubtotal">${product.newPrice}</div>
            </div>
            
      `;
      TotalAdder += parseInt(product.newPrice.replace("$", ""));
      subtotal.innerHTML = TotalAdder;
      Total.innerHTML = subtotal.textContent;

      productContainer.innerHTML += productHTML;
    });
  }
  displayCartProducts();

  console.log(subtotal);
  console.log(TotalAdder);
});
