$(document).ready(function () {
    $(".filter-item").on("click", function () {
        let value = $(this).data("filter");

        if (value === "all") {
            $(".post-box").show(600); 
        } else {
            $(".post-box").hide(600).filter(`.${value}`).show(600);
        }

        $(this).addClass("active-filter").siblings().removeClass("active-filter");
    });
});

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
