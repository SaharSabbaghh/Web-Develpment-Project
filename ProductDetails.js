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
