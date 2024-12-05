document.addEventListener("DOMContentLoaded", () => {
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
  //let carcodeClick = 0;
  cardCode.addEventListener("focus", () => {
    cardCode.setAttribute("placeholder", "XXXX XXXX XXXX XXXX");
  });
  cardCode.addEventListener("blur", () => {
    cardCode.setAttribute("placeholder", "Enter Your Card Code");
  });
  ///bank radio ends
  //main func begins
  let checkoutBtn = document.getElementById("placeOrder");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let productContainer = document.querySelector(".productsContainer");
  let Total = document.querySelector(".total p span");
  let subtotal = document.querySelector(".subtotal p span");
  let TotalAdder = 0;

  function displayCartProducts() {
    if (JSON.parse(localStorage.getItem("cart")).length > 0) {
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
  }
  displayCartProducts();
  function checkInputs() {
    let areAllFilled = false;

    while (!areAllFilled) {
      areAllFilled = true; // Assume all inputs are filled initially

      for (let i = 0; i < reqInputs.length; i++) {
        if (reqInputs[i].value.trim() === "") {
          // Check if the input is empty
          reqMsg.style.display = "flex"; // Show the message
          areAllFilled = false; // Set the flag to false because one input is empty
          break; // Exit the loop since we found an empty input
        }
      }
    }
    return areAllFilled;
  }

  let banner = document.querySelector(".banner");
  let reqMsg = document.querySelector(".error-message");
  let reqInputs = document.querySelectorAll(
    ".customerinfoContainer .customerinfo input[required]"
  );
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  checkoutBtn.addEventListener("click", () => {
    if (JSON.parse(localStorage.getItem("cart")).length > 0) {
      let allInputsFilled = true; // Assume all inputs are filled initially

      // Check if all required inputs are filled
      for (let i = 0; i < reqInputs.length; i++) {
        if (reqInputs[i].value.trim() === "") {
          reqMsg.style.display = "flex";
          reqMsg.innerHTML = "Please fill out all required fields!"; // Error message for empty fields
          allInputsFilled = false;
          break;
        }
      }

      // Verify email input
      let emailInput = reqInputs[reqInputs.length - 1]; // Assuming the last required input is the email
      let phoneInput = reqInputs[reqInputs.length - 2]; // Assuming the last required input is the email
      let PhoneRegex = /^(?:\+961|00961|0)(?:3\d{6}|7[0-9]\d{6}|[1-9]\d{6})$/;
      // Proceed only if all inputs are filled and the email is valid
      if (allInputsFilled) {
        if (!PhoneRegex.test(phoneInput.value.trim())) {
          reqMsg.style.display = "flex";
          reqMsg.innerHTML = "Please enter a valid phone number!"; // Error message for invalid email
          allInputsFilled = false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
          reqMsg.style.display = "flex";
          reqMsg.innerHTML = "Please enter a valid email address!"; // Error message for invalid email
          allInputsFilled = false;
        } else {
          reqMsg.style.display = "none"; // Hide the error message if inputs are valid

          if (JSON.parse(localStorage.getItem("cart")).length > 0) {
            localStorage.setItem("cart", JSON.stringify([])); // Clear the cart

            banner.style.display = "flex";
            setTimeout(() => {
              banner.style.display = "none";
            }, 3000);

            subtotal.innerHTML = 0;
            Total.innerHTML = subtotal.textContent;
            productContainer.innerHTML = ""; // Clear the cart container

            setTimeout(() => {
              location.reload(); // Refresh the page to reset inputs
            }, 3000);
          }
        }
      }
    }
  });

  // checkoutBtn.addEventListener("click", () => {

  //   for(i=0;i<reqInputs.length;i++){
  //     if(reqInputs.innerHTML ===" "){
  //       reqMsg.style.display="flex";
  //     }

  //   }

  //   if (JSON.parse(localStorage.getItem("cart")).length > 0) {
  //     localStorage.setItem("cart", JSON.stringify([]));

  //     banner.style.display = "flex";
  //     setTimeout(() => {
  //       banner.style.display = "none";
  //     }, 3000);
  //     subtotal.innerHTML = 0;
  //     Total.innerHTML = subtotal.textContent;
  //     productContainer.innerHTML = ""; // Clear the cart container before appending new items
  //     setTimeout(() => {
  //       location.reload(); // to refresh the page so that inputs will be resetted
  //     }, 3000);
  //   }
  // });
  //main func ends
});
