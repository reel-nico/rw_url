/* --------------------------------------------------
   Template by espace（https://espace.monbalcon.net/）
   Copyright: 2020 espace.

   利用規約を遵守の上、ご利用ください。
   二次配布、販売は禁止しています。
   --------------------------------------------------*/

var window_size     = $(window).width(),
    headerHeight    = 30;
const menuBtn       = $('#mainMenuBtn'),
      menuTarget    = menuBtn.data('target'),
      menuObj       = $('#' + menuTarget),
      animateTime   = 500,
      sp_point      = 720;

$('a[href^="#"]').click(function() {
    var href        = $(this).attr('href'),
        target      = $(href == "#" || href == "" ? 'html' : href),
        position    = target.offset().top;

    $('body,html').animate({scrollTop:position}, animateTime, 'swing');
    return false;
});

if (window_size <= sp_point) {
    headerHeight = -15;
}

$(window).on('resize', function() {
    window_size = $(window).width();
    if (sp_point < window_size) {
        if (menuObj.css('display') == "none") {
            menuObj.show();
        }
    }
});

$(window).on('scroll', function() {
    if (window_size <= sp_point) {
        if (menuObj.css('display') != "none") {
            menuObj.slideUp(animateTime);
        }
    }
});

menuObj.find('a').on('click', function() {
    if (window_size <= sp_point) {
        menuObj.slideUp(animateTime);
    }
});

$('#pageTop').on('click', function () {
    scrollPosition(0);
});

$('.toggler').on('click', function() {
    var click_obj       = $(this),
        top_position    = 0,
        target          = click_obj.data('target'),
        target_obj      = $('#' + target),
        is_collapse     = false;
        is_accordion    = false;

    if (typeof click_obj.data('content_type') !== "undefined") {
        if (click_obj.data('content_type') == "collapse"
            || click_obj.data('content_type') == "accordion") {
            is_collapse = true;
            
            if (click_obj.data('content_type') == "accordion") {
                is_accordion = true;
            }
        }
    }
    if (is_collapse) {
        var is_open = target_obj.data('open');
        $('.collapse-body').slideUp(animateTime).data('open', false);
        if (!is_open) {
            target_obj.slideDown(animateTime).data('open', true);
        }
    } else {
        target_obj.slideToggle(animateTime);
    }
    
    if (is_accordion) {
        var diff    = 0;
        if (window_size <= sp_point) {
            diff = 10;
        } else {
            diff = 60;
        }

        if (click_obj.prev().hasClass('collapse-body')) {
            var prev_obj = click_obj.prev().prev();
            top_position = prev_obj.offset().top + prev_obj.height() - headerHeight;
        } else {
            top_position = click_obj.offset().top - diff;
        }
        scrollPosition(top_position);
    }
    click_obj.removeClass('hover');
});

function scrollPosition(position) {
    $('body,html').animate({
        scrollTop: position
    });
}