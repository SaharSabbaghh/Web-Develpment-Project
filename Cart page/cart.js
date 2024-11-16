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

//product quantity starts
let products = document.getElementsByClassName("productRow");
let productPrice = document.querySelectorAll(".productPrice span");
let productSubtotal = document.querySelectorAll(".productSubtotal span");
let decrement = document.querySelectorAll(".decrement");
let increment = document.querySelectorAll(".increment");
let quantity = document.querySelectorAll(".productQuantity");
let subtotal = document.querySelector(".Subtotal .number");
let Total = document.querySelector(".Total .number");
let TotalAdder = 0;

let quantity_Counters = Array(products.length).fill(1);
function subtotalCal(productPrice, quantity) {
  return productPrice * quantity;
}

for (let i = 0; i < products.length; i++) {
  TotalAdder = TotalAdder + parseInt(productSubtotal[i].textContent);
  console.log(TotalAdder);
  subtotal.innerHTML = TotalAdder.toString();
  Total.innerHTML = subtotal.innerHTML;
  increment[i].addEventListener("click", () => {
    quantity_Counters[i]++;
    quantity[i].innerHTML =
      quantity_Counters[i] < 10
        ? "0" + quantity_Counters[i]
        : quantity_Counters[i];

    productSubtotal[i].textContent = subtotalCal(
      parseInt(productPrice[i].textContent),
      quantity_Counters[i]
    ).toString();

    TotalAdder = TotalAdder + parseInt(productPrice[i].textContent);
    subtotal.innerHTML = TotalAdder.toString();
    Total.innerHTML = subtotal.innerHTML;
    console.log(TotalAdder);
  });

  decrement[i].addEventListener("click", () => {
    if (quantity_Counters[i] > 1) {
      quantity_Counters[i]--;

      quantity[i].textContent =
        quantity_Counters[i] < 10
          ? "0" + quantity_Counters[i]
          : quantity_Counters[i];
      productSubtotal[i].textContent = subtotalCal(
        parseInt(productPrice[i].textContent),
        quantity_Counters[i]
      ).toString();

      TotalAdder = TotalAdder - parseInt(productPrice[i].textContent);
      subtotal.innerHTML = TotalAdder.toString();
      Total.innerHTML = subtotal.innerHTML;
      console.log(TotalAdder);
    }
  });
}

// Select all delete buttons and product rows initially
// Function to handle the "Remove" icon click
let removeBtn = document.getElementsByClassName("removeIcon");
// Function to handle the "Remove" icon click
function handleRemoveClick() {
  let deleteButton = this.closest(".productRow").querySelector("button");
  let productRow = this.closest(".productRow");

  // Toggle a single class to control both shift and opacity effects
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

// Attach event listeners to "Remove" icons
document.querySelectorAll(".removeIcon").forEach((icon) => {
  icon.addEventListener("click", handleRemoveClick);
});

// Function to handle the "Delete" button click
function handleDeleteClick() {
  let productRow = this.closest(".productRow");
  let subtotalValue = parseInt(
    productRow.querySelector(".productSubtotal span").textContent
  );

  // Update the total amount
  TotalAdder -= subtotalValue;
  subtotal.innerHTML = TotalAdder.toString();
  Total.innerHTML = subtotal.innerHTML;

  // Remove the specific product row
  productRow.remove();
}

// Attach event listeners to "Remove" icons and "Delete" buttons
document.querySelectorAll(".removeIcon").forEach((icon) => {
  icon.addEventListener("click", handleRemoveClick);
});

document.querySelectorAll(".productRow button").forEach((button) => {
  button.addEventListener("click", handleDeleteClick);
});

//delete btn ends
//update btn starts

let updatebtn = document.querySelector(".update-Btn");

updatebtn.addEventListener("click", () => {
  if (updatebtn.innerHTML === "Update Cart") {
    updatebtn.innerHTML = "Cancel";
    for (let k = 0; k < products.length; k++) {
      removeBtn[k].style.display = "flex";
    }
  } else {
    updatebtn.innerHTML = "Update Cart";
    let DeleteBtn = document.querySelectorAll(".productRow button");
    for (let k = 0; k < products.length; k++) {
      removeBtn[k].style.display = "none";
      DeleteBtn[k].classList.add("opacityremover");
      products[k].classList.remove("shiftleft");
      DeleteBtn[k].classList.remove("shiftright");
    }
  }
});

//update btn ends

//product Row ends
