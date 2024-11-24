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
  const banner = document.querySelector(".banner");

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

    if (productsList.length === 0) {
      const noResultsMessage = `
          <div id="no-results-message">
            No products found matching your search.
          </div>
        `;
      cardsContainer.append(noResultsMessage);
    } else {
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
  }

  function filterProducts(filter) {
    const cards = document.querySelectorAll(".cardBox");

    cards.forEach((card) => {
      if (filter === "all" || card.classList.contains(filter)) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });

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

    // Check if "No Products Found" message already exists
    let noResultsMessage = document.getElementById("no-results-message");

    cards.forEach((card) => {
      const productNameElement = card.querySelector(".Product-Name-Related");

      if (!productNameElement) return;

      const productName = productNameElement.textContent.toLowerCase();

      if (searchQuery === "" || productName.includes(searchQuery)) {
        card.style.display = "";
        matchCount++;
      } else {
        card.style.display = "none";
      }
    });

    if (matchCount === 0 && searchQuery !== "") {
      if (!noResultsMessage) {
        noResultsMessage = document.createElement("div");
        noResultsMessage.id = "no-results-message";
        noResultsMessage.textContent =
          "No products found matching your search.";
        cardsContainer.append(noResultsMessage);
      }
    } else if (noResultsMessage) {
      noResultsMessage.remove();
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

  $(document).on("click", ".Add-to-Cart", function () {
    const cardBox = $(this).closest(".cardBox");
    const productTitle = cardBox.find(".Product-Name-Related").text();
    const productNewPrice = cardBox.find(".newPrice").text();
    const productImage = cardBox.find("img").attr("src");
    const product = {
      title: productTitle,
      newPrice: productNewPrice,
      image: productImage,
    };

    addToCart(product);
  });

  function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = cart.findIndex(
      (item) => item.title === product.title
    );

    if (existingProductIndex !== -1) {
      banner.innerHTML = "The item already exists!";
      banner.style.display = "flex";
      setTimeout(() => {
        banner.style.display = "none";
      }, 2000);
    } else {
      product.quantity = 1;
      cart.push(product);
      banner.innerHTML = "Item added successfully!";
      banner.style.display = "flex";
      setTimeout(() => {
        banner.style.display = "none";
      }, 2000);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  }
});
