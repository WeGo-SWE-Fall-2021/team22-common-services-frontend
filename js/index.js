/* Adds shadow on header once it passes height */
$(window).scroll(() => {
    let header = $("header")
    let height = header.height();
    if (window.scrollY > height) {
        header.addClass("header-scroll");
    } else {
        header.removeClass("header-scroll");
    }
});

$(function () {
    
});