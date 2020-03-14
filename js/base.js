// floating
jQuery(window).on('scroll', function ($) {
    if (100 < jQuery(this).scrollTop()) {
        jQuery('.floating').fadeIn();
    } else {
        jQuery('.floating').fadeOut();
    }
});

// SmoothScroll
jQuery('a[href^="#"]').click(function() {
    let header = jQuery("#header").height();
    let speed = 300;
    let id = jQuery(this).attr("href");
    let target = jQuery("#" == id ? "html" : id);
    let position = jQuery(target).offset().top - header;
    if ("fixed" !== jQuery("#header").css("position")) {
        position = jQuery(target).offset().top;
    }
    if (0 > position) {
        position = 0;
    }
    jQuery("html, body").animate(
        {
            scrollTop: position
        },
        speed
    );
    return false;
});
