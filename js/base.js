// floating
jQuery(window).on('scroll', function ($) {
    if (100 < jQuery(this).scrollTop()) {
        jQuery('.floating').fadeIn();
    } else {
        jQuery('.floating').fadeOut();
    }
});

// SmoothScroll
jQuery('a[href^="#"]').click(function () {
    var header = 0;
    var speed = 300;
    var id = jQuery(this).attr('href');
    var target = jQuery('#' == id ? 'html' : id);
    var position = jQuery(target).offset().top - header;
    if (0 > position) {
        position = 0;
    }
    jQuery('html, body').animate(
        {
            scrollTop: position
        },
        speed
    );
    return false;
});