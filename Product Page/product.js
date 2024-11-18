// NavBar
let activePage = window.location.pathname.split('/').pop(); 
document.querySelectorAll('ul.ul1 li a').forEach(link => {
    let linkPage = link.href.split('/').pop(); 
    if (linkPage === activePage) {
        link.classList.add('active'); 
    }
});

// SideBar
document.querySelector(".ham-icon i").addEventListener("click", function() {
  document.querySelector(".sidebar").classList.remove("hidden");
});


document.querySelector(".sidebar-text i").addEventListener("click", function(){
    document.querySelector(".sidebar").classList.add("hidden");
})

let products = [];

// Fetch products.json
$(document).ready(function () {
  fetch('products.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      products = data;
      generateProductCards(products);
    })
    .catch(error => {
      console.error('Error fetching product data:', error);
    });
});

// Generate Product Cards
function generateProductCards(productsList) {
  const cardsContainer = $("#cards");
  cardsContainer.html(""); // Clear previous content

  productsList.forEach(product => {
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

// Sorting Functions
function sortLowToHigh() {
  const sortedProducts = products.slice().sort((a, b) => {
    return parseFloat(a.newPrice.replace("$", "")) - parseFloat(b.newPrice.replace("$", ""));
  });
  generateProductCards(sortedProducts);
}

function sortHighToLow() {
  const sortedProducts = products.slice().sort((a, b) => {
    return parseFloat(b.newPrice.replace("$", "")) - parseFloat(a.newPrice.replace("$", ""));
  });
  generateProductCards(sortedProducts);
}

// Sort Dropdown Event Listener
$(document).ready(function () {
  $("#sort-dropdown").on("change", function () {
    const selectedOption = $(this).val();

    if (selectedOption === "low-to-high") {
      sortLowToHigh();
    } else if (selectedOption === "high-to-low") {
      sortHighToLow();
    }
  });
});

// Search Functionality
$(document).ready(function () {
  const searchInput = $("#search-input");
  const searchButton = $("#search");

  function performSearch(event) {
    event.preventDefault();
    const searchQuery = searchInput.val().trim().toLowerCase();
    const cards = $(".cardBox");

    let matchCount = 0;

    cards.each(function () {
      const productNameElement = $(this).find(".Product-Name-Related");
      const productName = productNameElement.text().toLowerCase();

      if (searchQuery === "" || productName.includes(searchQuery)) {
        $(this).show();
        matchCount++;
      } else {
        $(this).hide();
      }
    });

    if (matchCount === 0 && searchQuery !== "") {
      alert("No products found matching your search.");
    }
  }

  searchButton.on("click", performSearch);
  searchInput.on("input", performSearch);
});

// Filter Functionality
$(document).ready(function () {
  $(".filter-item").on("click", function () {
    const value = $(this).data("filter");

    if (value === "all") {
      $(".cardBox").show(600);
    } else {
      $(".cardBox").hide(600).filter(`.${value}`).show(600);
    }

    $(this).addClass("active-filter").siblings().removeClass("active-filter");
  });
});
