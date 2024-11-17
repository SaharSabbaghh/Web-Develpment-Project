// NavBar
let activePage = window.location.pathname.split('/').pop(); 
document.querySelectorAll('ul.ul1 li a').forEach(link => {
    let linkPage = link.href.split('/').pop(); 
    if (linkPage === activePage) {
        link.classList.add('active'); 
    }
});

// SideBar
document.querySelector(".ham-icon i").addEventListener("click", function(){
    document.querySelector(".sidebar").classList.remove("hidden");
})

document.querySelector(".sidebar-text i").addEventListener("click", function(){
    document.querySelector(".sidebar").classList.add("hidden");
})




const products = [
    {
      title: "Logitech G Pro Wireless Gaming Mouse",
      filter: "Laptops",
      newPrice: "$120",
      oldPrice: "$150",
      sale: "-20%",
      rating: "90",
      image: "images/ps.png",
    },
    {
      title: "Sony WH-1000XM5 Noise Cancelling Headphones",
      filter: "Phones",
      newPrice: "$350",
      oldPrice: "$500",
      sale: "-30%",
      rating: "95",
      image: "images/ps.png",
    },
    {
      title: "Samsung 27-inch Curved Monitor",
      filter: "Headphones",
      newPrice: "$250",
      oldPrice: "$350",
      sale: "-29%",
      rating: "88",
      image: "images/ps.png",
    },
    {
      title: "Razer BlackWidow V3 Mechanical Keyboard",
      filter: "Smartwatch",
      newPrice: "$180",
      oldPrice: "$230",
      sale: "-22%",
      rating: "85",
      image: "images/ps.png",
    },
    {
      title: "Apple AirPods Pro (2nd Gen)",
      filter: "Airpods",
      newPrice: "$199",
      oldPrice: "$249",
      sale: "-20%",
      rating: "92",
      image: "images/ps.png",
    },
    {
      title: "Anker PowerCore 20000mAh Power Bank",
      filter: "Laptops",
      newPrice: "$60",
      oldPrice: "$80",
      sale: "-25%",
      rating: "87",
      image: "images/ps.png",
    },
    {
      title: "Amazon Echo Dot (5th Gen)",
      filter: "Laptops",
      newPrice: "$40",
      oldPrice: "$60",
      sale: "-33%",
      rating: "90",
      image: "images/ps.png",
    },
    {
      title: "Canon EOS M50 Mirrorless Camera",
      filter: "Laptops",
      newPrice: "$600",
      oldPrice: "$750",
      sale: "-20%",
      rating: "93",
      image: "images/ps.png",
    },
  ];
  
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search");

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
});

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



document.addEventListener("DOMContentLoaded", () => {
  const sortDropdown = document.getElementById("sort-dropdown");
  const cardsContainer = document.getElementById("cards");


  function generateProductCards(productsList) {
    cardsContainer.innerHTML = ""; 
  
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
      cardsContainer.innerHTML += cardHTML;
    });
  }
  
  function sortLowToHigh() {
    const sortedProducts = products.slice().sort((a, b) => {
      const priceA = parseFloat(a.newPrice.replace("$", ""));
      const priceB = parseFloat(b.newPrice.replace("$", ""));
      return priceA - priceB;
    });
    generateProductCards(sortedProducts);
  }

  function sortHighToLow() {
    const sortedProducts = products.slice().sort((a, b) => {
      const priceA = parseFloat(a.newPrice.replace("$", ""));
      const priceB = parseFloat(b.newPrice.replace("$", ""));
      return priceB - priceA;
    });
    generateProductCards(sortedProducts);
  }

  sortDropdown.addEventListener("change", () => {
    const selectedOption = sortDropdown.value;

    if (selectedOption === "low-to-high") {
      sortLowToHigh();
    } else if (selectedOption === "high-to-low") {
      sortHighToLow();
    }
  });

  generateProductCards(products);
});
