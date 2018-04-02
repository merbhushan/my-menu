/* 
Ace Responsive Menu Plugin
Version: 1.0
Author: Samson.Onna 
Email : samson3d@gmail.com
----------------------------------------*/

(function ($) {
    $.fn.aceResponsiveMenu = function (options) {

        //plugin's default options
        var defaults = {
            resizeWidth: '768',
            animationSpeed: 'fast',
            accoridonExpAll: false
        };

        //Variables
        var options = $.extend(defaults, options),
            opt = options,
            $resizeWidth = opt.resizeWidth,
            $animationSpeed = opt.animationSpeed,
            $expandAll = opt.accoridonExpAll,
            $aceMenu = $(this),
            $menuStyle = $(this).attr('data-menu-style');

        // Initilizing        
        $aceMenu.find('ul').addClass("sub-menu");
        $aceMenu.find('ul').siblings('a').append('<span class="arrow "></span>');
        if ($menuStyle == 'accordion') { $(this).addClass('collapse'); }

        // Window resize on menu breakpoint 
        if ($(window).innerWidth() <= $resizeWidth) {
            menuCollapse();
        }
        menuCollapse()
        // $(window).resize(function () {
        //     menuCollapse();
        // });

        // Menu Toggle
        function menuCollapse() {
            var w = $(window).innerWidth();
            // var h = $(window).height() +'px';
            // $('.left-menu-bar').css('height', h);
            $aceMenu.find('li.menu-active').removeClass('menu-active');
            $aceMenu.find('ul.slide').removeClass('slide').removeAttr('style');
            $aceMenu.addClass('collapse hide-menu');
            $aceMenu.attr('data-menu-style', 'Vertical');
            $aceMenu.slideToggle().toggleClass('hide-menu');
            $('.menu-toggle').show();
            // if (w <= $resizeWidth) {
            // } else {
            //     $aceMenu.attr('data-menu-style', $menuStyle);
            //     $aceMenu.removeClass('collapse hide-menu').removeAttr('style');
            //     // $('.menu-toggle').hide();
            //     if ($aceMenu.attr('data-menu-style') == 'accordion') {
            //         $aceMenu.addClass('collapse');
            //         return;
            //     }
            //     $aceMenu.find('li.menu-active').removeClass('menu-active');
            //     $aceMenu.find('ul.slide').removeClass('slide').removeAttr('style');
            // }
        }

        //ToggleBtn Click
        $('#menu-btn').click(function () {
            if($aceMenu.hasClass('hide-menu')){
                $('.left-menu-bar').show();
                $('.body-content').removeClass('col-md-12');
                $('.body-content').removeClass('col-lg-12');
                $('.body-content').addClass('col-md-10');
                $('.body-content').addClass('col-lg-10');
            }
            else{
                $('.left-menu-bar').hide();
                $('.body-content').removeClass('col-md-10');
                $('.body-content').removeClass('col-lg-10');
                $('.body-content').addClass('col-md-12');
                $('.body-content').addClass('col-lg-12');
            }
            $aceMenu.slideToggle().toggleClass('hide-menu');
        });


        // Main function 
        return this.each(function () {
            // Function for Horizontal menu on mouseenter
            $aceMenu.on('mouseover', '> li a', function () {
                if ($aceMenu.hasClass('collapse') === true) {
                    return false;
                }
                $(this).off('click', '> li a');
                $(this).parent('li').siblings().children('.sub-menu').stop(true, true).slideUp($animationSpeed).removeClass('slide').removeAttr('style').stop();
                $(this).parent().addClass('menu-active').children('.sub-menu').slideDown($animationSpeed).addClass('slide');
                return;
            });
            $aceMenu.on('mouseleave', 'li', function () {
                if ($aceMenu.hasClass('collapse') === true) {
                    return false;
                }
                $(this).off('click', '> li a');
                $(this).removeClass('menu-active');
                $(this).children('ul.sub-menu').stop(true, true).slideUp($animationSpeed).removeClass('slide').removeAttr('style');
                return;
            });
            //End of Horizontal menu function

            // Function for Vertical/Responsive Menu on mouse click
            $aceMenu.on('click', '> li a', function () {
                if ($aceMenu.hasClass('collapse') === false) {
                    //return false;
                }
                $(this).off('mouseover', '> li a');
                if ($(this).parent().hasClass('menu-active')) {
                    $(this).parent().children('.sub-menu').slideUp().removeClass('slide');
                    $(this).parent().removeClass('menu-active');
                } else {
                    if ($expandAll == true) {
                        $(this).parent().addClass('menu-active').children('.sub-menu').slideDown($animationSpeed).addClass('slide');
                        return;
                    }
                    $(this).parent().siblings().removeClass('menu-active');
                    $(this).parent('li').siblings().children('.sub-menu').slideUp().removeClass('slide');
                    $(this).parent().addClass('menu-active').children('.sub-menu').slideDown($animationSpeed).addClass('slide');
                }
            });
            //End of responsive menu function

        });
        //End of Main function
    }
})(jQuery);

