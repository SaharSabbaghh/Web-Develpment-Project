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

document.querySelector(".subscribe-btn button").addEventListener("click", function() {
    let emailInput = document.querySelector(".subscribe-input input");
    let errorMessage = document.querySelector(".errorMessage");

    if (emailInput.value === "") {
        errorMessage.textContent = "Please enter your email address.";
        errorMessage.style.display = "block";
    } else if (!emailInput.value.includes("@")) {
        errorMessage.textContent = "Please enter a valid email address.";
        errorMessage.style.display = "block";
    } else{
        errorMessage.style.display = "none";
        emailInput.value = "";
    }
});

// Home Image
const imageContainer = document.querySelector(".home-img");
const hoverImage = document.querySelector(".home-img img");
function moveInDirection(event, element) {
  const { offsetX, offsetY, target } = event;
  const width = target.offsetWidth;
  const height = target.offsetHeight;
  const moveDistance = 15; 
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
