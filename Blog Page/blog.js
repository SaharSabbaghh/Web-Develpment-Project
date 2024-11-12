$(document).ready(function () {
    $(".filter-item").on("click", function () {
        const value = $(this).data("filter");

        if (value === "all") {
            $(".post-box").show(600); 
        } else {
            $(".post-box").hide(600).filter(`.${value}`).show(600);
        }

        $(this).addClass("active-filter").siblings().removeClass("active-filter");
    });
});
