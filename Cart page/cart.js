/////////////////////////charaf

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

  //product Row starts



// document.querySelector(".return-Btn").addEventListener("click", ()=>{

//  window.location.href = "../Product Page/product.html";


// });






  // Get the cart from localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartContainer = document.querySelector(".cartitems");
  let Total = document.querySelector(".Total .number");
  let subtotal = document.querySelector(".Subtotal .number");
  let TotalAdder = 0;

  // Function to display the cart items
  function displayCart() {
    if (cart.length > 0) {
      cartContainer.innerHTML = ""; // Clear the cart container before appending new items

      cart.forEach((product) => {
        let productHTML = `
<div class="productRow">
                <div class="product">
                  <div class="productimgBox">
                    <img
                      class="removeIcon"
                      src="./images/remove.png"
                      alt="remove icon"
                    />

                    <img
                      class="productImg"
                      src="${product.image}"
                      alt="${product.title}"
                    />
                  </div>
                  <div class="productName">${product.title}</div>
                </div>

                <div class="productPrice">${product.newPrice}</div>

                <div class="productQuanityBox">
                  <div class="productquantitySBox">
                    <p class="productQuantity">01</p>
                    <div class="quantityArrows">
                      <img
                        class="increment"
                        src="./images/next_prev/arrowUP.png"
                        alt="arrowUp"
                        style="width: 14px; height: auto; cursor: pointer"
                      />
                      <img
                        class="decrement"
                        src="./images/next_prev/arrowDown .png"
                        alt="arrowDown"
                        style="width: 14px; height: auto; cursor: pointer"
                      />
                    </div>
                  </div>
                </div>
                <div class="productSubtotal">$<span>${product.newPrice.replace(
                  "$",
                  ""
                )}</span></div>
                <button>Delete</button>
              </div>
      
            
      `;
        TotalAdder += parseInt(product.newPrice.replace("$", ""));
        subtotal.innerHTML = TotalAdder;
        Total.innerHTML = subtotal.textContent;
        cartContainer.innerHTML += productHTML;
      });
    }
  }
  displayCart();

  function subtotaladder(productPrice, sign) {
    if (sign === "+") {
      TotalAdder += parseInt(productPrice);
      subtotal.innerHTML = TotalAdder;
      Total.innerHTML = subtotal.textContent;
    } else {
      TotalAdder -= parseInt(productPrice);
      subtotal.innerHTML = TotalAdder;
      Total.innerHTML = subtotal.textContent;
    }
  }
  function productPriceRemover(productSubtotal) {
    TotalAdder -= parseInt(productSubtotal);
    subtotal.innerHTML = TotalAdder;
    Total.innerHTML = subtotal.textContent;
  }
  /////////////////remove item from the local storage starts
  function removeItemFromCart(productRemovedName) {
    cart = cart.filter((product) => product.title != productRemovedName);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  /////////////////remove item from the local storage ends

  document.querySelector(".cartitems").addEventListener("click", (event) => {
    let target = event.target;

    if (target.classList.contains("increment")) {
      let productRow = target.closest(".productRow");
      let quantityElement = productRow.querySelector(".productQuantity");
      let productPriceElement = productRow.querySelector(".productPrice");
      let productSubtotalElement = productRow.querySelector(
        ".productSubtotal span"
      );
      let quantity = parseInt(quantityElement.textContent);
      let productPrice = parseFloat(
        productPriceElement.textContent.replace("$", "")
      );
      // Update quantity
      quantity++;
      quantityElement.textContent = quantity < 10 ? "0" + quantity : quantity;
      // Update subtotal
      let subtotal = productPrice * quantity;
      productSubtotalElement.textContent = subtotal;
      subtotaladder(productPrice, "+");
    }

    if (target.classList.contains("decrement")) {
      let productRow = target.closest(".productRow");
      let quantityElement = productRow.querySelector(".productQuantity");
      let productPriceElement = productRow.querySelector(".productPrice");
      let productSubtotalElement = productRow.querySelector(
        ".productSubtotal span"
      );

      let quantity = parseInt(quantityElement.textContent);
      let productPrice = parseFloat(
        productPriceElement.textContent.replace("$", "")
      );

      if (quantity > 1) {
        // Update quantity
        quantity--;
        quantityElement.textContent = quantity < 10 ? "0" + quantity : quantity;

        // Update subtotal
        let subtotal = productPrice * quantity;
        productSubtotalElement.textContent = subtotal;
        subtotaladder(productPrice, "-");
      }
    }
  });

  document.querySelector(".cartitems").addEventListener("click", (event) => {
    let target = event.target;

    if (target.classList.contains("removeIcon")) {
      let productRow = target.closest(".productRow");
      let deleteButton = productRow.querySelector("button");

      if (deleteButton.classList.contains("activated")) {
        deleteButton.classList.remove("activated");
        deleteButton.classList.add("opacityremover");
        productRow.classList.remove("shiftleft");
        deleteButton.classList.remove("shiftright");
      } else {
        deleteButton.classList.remove("opacityremover");
        deleteButton.classList.add("activated");
        productRow.classList.add("shiftleft");
        deleteButton.classList.add("shiftright");
      }
    }

    if (target.tagName === "BUTTON" && target.textContent === "Delete") {
      let productRow = target.closest(".productRow");
      removeItemFromCart(productRow.querySelector(".productName").textContent);
      productPriceRemover(
        productRow.querySelector(".productSubtotal span").textContent
      );
      productRow.remove();
    }
     if (cart.length === 0) {
       location.reload();
     }
  });

  let updatebtn = document.querySelector(".update-Btn");

  updatebtn.addEventListener("click", () => {
    let removeIcons = document.querySelectorAll(".removeIcon");
    let deleteButtons = document.querySelectorAll(".productRow button");

    if (updatebtn.innerHTML === "Update Cart") {
      updatebtn.innerHTML = "Cancel";
      removeIcons.forEach((icon) => (icon.style.display = "flex"));
    } else {
      updatebtn.innerHTML = "Update Cart";
      removeIcons.forEach((icon) => (icon.style.display = "none"));
      deleteButtons.forEach((button) => {
        button.classList.add("opacityremover");
        button.closest(".productRow").classList.remove("shiftleft");
        button.classList.remove("shiftright");
      });
    }
  });
});

/////////////////////////charaf
