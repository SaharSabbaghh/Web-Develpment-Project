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

let Aim = document.getElementById("aim");
let Offer = document.getElementById("offer");
let Why_Us = document.getElementById("why-us");
let H1 = document.getElementById("categ-h1");
let Parag = document.getElementById("categ-p");

Aim.addEventListener("change", ()=> {
if(Aim.checked){
H1.innerHTML="Our Aim";
Parag.innerHTML = "Our aim is to provide high-quality, reliable tech devices that seamlessly integrate into your lifestyle, keeping you connected, productive, and entertained in today’s fast-paced digital world. We strive to ensure that every product we offer meets the highest standards of performance and durability, empowering you to stay ahead with cutting-edge technology.";
}
})

Offer.addEventListener("change", ()=> {
if(Offer.checked){
    H1.innerHTML="What We Offer";
    Parag.innerHTML = "We offer a premium selection of top tech products designed to keep you connected, productive, and entertained, while enhancing your overall digital experience. From innovative smartphones and powerful laptops to versatile tablets and high-performance audio devices, our products are carefully chosen to meet the demands of modern lifestyles.";
}
})

Why_Us.addEventListener("change", ()=> {
    if(Why_Us.checked){
        H1.innerHTML="Why Novatech";
        Parag.innerHTML = "Choose NovaTech for top-quality tech devices that keep you connected, productive, and entertained while enhancing your lifestyle. We pride ourselves on offering a carefully curated selection of innovative products, including smartphones, laptops, tablets, smartwatches, and audio devices, all designed to meet the needs of modern living.";
    }
    })