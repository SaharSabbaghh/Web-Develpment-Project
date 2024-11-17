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

// Home Image
let imageContainer = document.querySelector(".home-img");
let hoverImage = document.querySelector(".home-img img");
function moveInDirection(event, element) {
  let { offsetX, offsetY, target } = event;
  let width = target.offsetWidth;
  let height = target.offsetHeight;
  let moveDistance = 15; 
  if (offsetX < width / 3) {
    element.style.transform = `translateX(-${moveDistance}px)`;
  } else if (offsetX > (2 * width) / 3) {
    element.style.transform = `translateX(${moveDistance}px)`;
  } else if (offsetY < height / 3) {
    element.style.transform = `translateY(-${moveDistance}px)`;
  } else if (offsetY > (2 * height) / 3) {
    element.style.transform = `translateY(${moveDistance}px)`;
  } else {
    element.style.transform = 'scale(1.02)'; 
  }
}
imageContainer.addEventListener('mousemove', (event) => {
  moveInDirection(event, hoverImage); 
});
imageContainer.addEventListener('mouseleave', () => {
  hoverImage.style.transform = 'translate(0, 0)'; 
});

// Image Changing
// const images = [
//   './images/headphones.png',
//   './images/laptop.png' 
// ];
// let currentIndex = 0;
// function changeImage() {
//   const imgElement = document.getElementById('slideshow');
//   currentIndex = (currentIndex + 1) % images.length; 
//   imgElement.src = images[currentIndex];
// }
// setInterval(changeImage, 3000);

// Boy With Headphones
let boyBody = document.querySelector(".boy-body");
let boyBody2 = document.querySelector(".boy-body2");
let isBoyBodyVisible = true;

function toggleDisplay() {
    if (isBoyBodyVisible) {
        boyBody.classList.add("hidden");
        boyBody.classList.remove("visible");
        boyBody2.classList.add("visible");
        boyBody2.classList.remove("hidden");
    } else {
        boyBody.classList.add("visible");
        boyBody.classList.remove("hidden");
        boyBody2.classList.add("hidden");
        boyBody2.classList.remove("visible");
    }
    isBoyBodyVisible = !isBoyBodyVisible;
}
setInterval(toggleDisplay, 3000);

// Animation on scroll
document.addEventListener("DOMContentLoaded", () => {
  let categElements = document.querySelectorAll(".categ");

  let observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add("fadeIn");
              observer.unobserve(entry.target);
          }
      });
  }, {
      threshold: 0.5 
  });

  categElements.forEach(categ => {
      observer.observe(categ);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  let cardArticles = document.querySelectorAll(".card-article");

  let observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target); 
          }
      });
  }, {
      threshold: 0.1 
  });

  cardArticles.forEach(card => {
      observer.observe(card);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  let boyContainer = document.querySelector(".boy-container");

  let observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (!entry.isIntersecting) {
              boyContainer.classList.add("fade-out");
          } else {
              boyContainer.classList.remove("fade-out");
          }
      });
  }, {
      threshold: 0.2 
  });

  observer.observe(boyContainer);
});

function setCategory(category) {
  localStorage.setItem("selectedCategory", category);
}