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

document.querySelector(".sidebar-text i").addEventListener("click", function () {
    document.querySelector(".sidebar").classList.add("hidden");
  });

// footer
document.querySelector(".subscribe-btn button")
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
//product quantity ends

//Remove btn starts

/*
for (let k = 0; k < products.length; k++) {
  removeBtn[k].addEventListener("click", () => {
    if (removeClickCounter[k] === 0) {
      DeleteBtn[k].classList.remove("opacityremover");
      products[k].classList.add("shiftleft");
      DeleteBtn[k].classList.add("shiftright");
      removeClickCounter[k]++;
    } else {
      DeleteBtn[k].classList.add("opacityremover");
      products[k].classList.remove("shiftleft");
      DeleteBtn[k].classList.remove("shiftright");

      removeClickCounter[k]--;
    }
  });
}*/

//remover btn ends

//delete btn starts

let removeBtn = document.getElementsByClassName("removeIcon");
let DeleteBtn = document.querySelectorAll(".productRow button");
let removeClickCounter = Array(products.length).fill(0);
for (let k = 0; k < products.length; k++) {
  removeBtn[k].addEventListener("click", () => {
    if (removeClickCounter[k] === 0) {
      DeleteBtn[k].classList.remove("opacityremover");
      products[k].classList.add("shiftleft");
      DeleteBtn[k].classList.add("shiftright");
      console.log(k);
      removeClickCounter[k]++;

      removeBtn = document.getElementsByClassName("removeIcon");
      DeleteBtn = document.querySelectorAll(".productRow button");
      removeClickCounter = Array(products.length).fill(0);
    } else {
      DeleteBtn[k].classList.add("opacityremover");
      products[k].classList.remove("shiftleft");
      DeleteBtn[k].classList.remove("shiftright");
      console.log(k);
      removeClickCounter[k]--;

      removeBtn = document.getElementsByClassName("removeIcon");
      DeleteBtn = document.querySelectorAll(".productRow button");
      removeClickCounter = Array(products.length).fill(0);
    }
  });
}
for (let k = 0; k < products.length; k++) {
  DeleteBtn[k].addEventListener("click", () => {
    if (k === products.length - 1) {
      console.log(k);
      TotalAdder = TotalAdder - parseInt(productSubtotal[k].textContent);
      subtotal.innerHTML = TotalAdder.toString();
      Total.innerHTML = subtotal.innerHTML;
      products[k].remove();
    } else if (k === 0) {
      TotalAdder = TotalAdder - parseInt(productSubtotal[k].textContent);
      subtotal.innerHTML = TotalAdder.toString();
      Total.innerHTML = subtotal.innerHTML;
      console.log(k);
      products[k].remove();
      k--;
    } else {
      console.log(k);
      products[k].remove();
    }

    DeleteBtn = document.querySelectorAll(".productRow button");
    products = document.querySelectorAll(".productRow");
    products.length = products.length;
  });
}

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
