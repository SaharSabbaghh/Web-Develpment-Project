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

// Fetch Product Data
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search");
  const cardsContainer = $("#cards");
  const sortDropdown = $("#sort-dropdown");

  let products = [];

  // Fetch the JSON file
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      products = data;
      generateProductCards(products);
      filterProducts(localStorage.getItem("selectedCategory") || "all");
    })
    .catch((error) => console.error("Error fetching product data:", error));

  function generateProductCards(productsList) {
    cardsContainer.html("");

    productsList.forEach((product) => {
      const cardHTML = `
                <div class="cardBox ${product.filter}">
                    <div class="imgBox">
                        <div class="productSpecifications">
                            <span class="sale-Product-related">${product.sale}</span>
                            <div class="productSpecifications-icons">
                                <span id="productSpecifications-Whishlist">
                                    <i class="fa-regular fa-heart"></i>
                                </span>
                                <span id="productSpecifications-View">
                                    <i class="fa-regular fa-eye"></i>
                                </span>
                            </div>
                        </div>
                        <img src="${product.image}" alt="product image" />
                        <div class="Add-to-Cart">Add To Cart</div>
                    </div>
                    <div class="CardInfo">
                        <h4 class="filter">${product.filter}</h4>
                        <h3 class="Product-Name-Related">${product.title}</h3>
                        <p class="Product-Price-related">
                            <span class="newPrice">${product.newPrice}</span>
                            <span class="old-Price">${product.oldPrice}</span>
                        </p>
                        <p class="product-raiting-related">
                            <img src="images/raitings/4starsRaiting-removebg-preview.png" />
                            <span>(${product.rating})</span>
                        </p>
                    </div>
                </div>
            `;
      cardsContainer.append(cardHTML);
    });
  }

  function filterProducts(filter) {
    console.log("Filtering by:", filter);

    if (filter === "all") {
      $(".cardBox").show(600);
    } else {
      $(".cardBox").hide(600).filter(`.${filter}`).show(600);
    }

    $(".filter-item").removeClass("active-filter");
    $(`.filter-item[data-filter="${filter}"]`).addClass("active-filter");
  }

  function sortLowToHigh() {
    const sortedProducts = products.slice().sort((a, b) => {
      const priceA = parseFloat(a.newPrice.replace("$", ""));
      const priceB = parseFloat(b.newPrice.replace("$", ""));
      return priceA - priceB;
    });
    generateProductCards(sortedProducts);
    filterProducts($(".active-filter").data("filter"));
  }

  function sortHighToLow() {
    const sortedProducts = products.slice().sort((a, b) => {
      const priceA = parseFloat(a.newPrice.replace("$", ""));
      const priceB = parseFloat(b.newPrice.replace("$", ""));
      return priceB - priceA;
    });
    generateProductCards(sortedProducts);
    filterProducts($(".active-filter").data("filter"));
  }

  // Search Functionality
  function performSearch(event) {
    event.preventDefault();
    const searchQuery = searchInput.value.trim().toLowerCase();
    const cards = document.querySelectorAll(".cardBox");

    let matchCount = 0;

    cards.forEach((card) => {
      const productNameElement = card.querySelector(".Product-Name-Related");

      if (!productNameElement) return;

      const productName = productNameElement.textContent.toLowerCase();

      if (searchQuery === "" || productName.includes(searchQuery)) {
        card.style.display = "flex";
        matchCount++;
      } else {
        card.style.display = "none";
      }
    });

    if (matchCount === 0 && searchQuery !== "") {
      alert("No products found matching your search.");
    }
  }

  searchButton.addEventListener("click", performSearch);
  searchInput.addEventListener("input", performSearch);

  $(".filter-item").on("click", function () {
    const filter = $(this).data("filter");
    filterProducts(filter);
  });

  sortDropdown.on("change", function () {
    const selectedOption = $(this).val();

    if (selectedOption === "low-to-high") {
      sortLowToHigh();
    } else if (selectedOption === "high-to-low") {
      sortHighToLow();
    }
  });
  let banner = document.querySelector(".banner");
  $(document).on("click", ".Add-to-Cart", function () {
    let cardBox = $(this).closest(".cardBox");
    let productTitle = cardBox.find(".Product-Name-Related").text();
    let productNewPrice = cardBox.find(".newPrice").text();
    let productImage = cardBox.find("img").attr("src");
    let product = {
      title: productTitle,
      newPrice: productNewPrice,
      image: productImage,
    };
    banner.style.display = "flex";
    setTimeout(() => {
      banner.style.display = "none";
    }, 2000);

    addToCart(product);
  });

  function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existingProductIndex = cart.findIndex(
      (item) => item.title === product.title
    );

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      product.quantity = 1;
      cart.push(product);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    // alert(`${product.title} added to cart!`);
  }
});
