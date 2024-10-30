let activePage = window.location.pathname.split('/').pop(); 
document.querySelectorAll('ul.ul1 li a').forEach(link => {
    let linkPage = link.href.split('/').pop(); 
    if (linkPage === activePage) {
        link.classList.add('active'); 
    }
});

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
