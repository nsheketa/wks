$(document).ready(function () {
    console.log('document ready');

    checkLoad();
    imgLoading();
    lineStart();
    lineEnd();
    navPosition();

    function checkLoad() {
        var loader = $('.page-loader'),
            $body = $('body'),
            $window = $(window);

        if ($window.width() <= 1024 && !$body.hasClass('is-loaded')) {
            console.log('body is not loaded');
            loader.addClass('is-visible');
        }
    }

    function loaderRemove() {
        var $body = $('body');

        $body.removeClass('is-loading');
        $('.page-loader').removeClass('is-visible');
    }

    function imgLoading() {
        // var $window = $(window);

        // if ($window.width() <= 1024) {
            $('.page__content').imagesLoaded({background: '.homepage-slider__img'})
                .progress(function (instance, image) {
                    var result = image.isLoaded ? 'loaded' : 'broken';
                    console.log('image is ' + result + ' for ' + image.img.src);

                    var total = instance.images.length;
                    var current = instance.progressedCount;
                    var now = instance.progressedCount / total * 100;

                    loadPercent();

                    function loadPercent() {
                        requestAnimationFrame(loadPercent);
                        if (current <= now) {
                            $(".page-loader__bar span").css({
                                width: now + "%"
                            });
                        }
                    }
                });

            $('.page__content').imagesLoaded({background: '.homepage-slider__img'})
                .done(function (instance) {
                    console.log('images loading done!');
                    loaderRemove();
                })
        // }
    }

    function lineStart() {
        var line = $('.section__line.section__line-start'),
            headingItem = $('.section__heading-item').first(),
            headingItemParent = line.parent(),
            headingItemStart = headingItem.offset().top + (headingItem.outerHeight() / 2) - headingItemParent.offset().top;
        line.css({
            top: headingItemStart + 'px'
        })
    }

    function lineEnd() {
        var line = $('.section__line.section__line-end'),
            headingItem = $('.section__heading-item').last(),
            headingItemParent = line.parents('.homepage__section'),
            headingItemEnd = headingItem.offset().top + (headingItem.outerHeight() / 2) - headingItemParent.offset().top;
        line.css({
            height: headingItemEnd + 'px'
        })
    }

    $('.homepage__slider').slick({
        dots: true,
        arrows: true,
        infinite: false
    });
    // $('video.video__muted').each(function(){
    //       $(this).prop('muted', true);  
    //       $(this).prop('playsinline', '');
    //       $(this).play();
    //     });
// setTimeout(function() {
    // $('.video__muted').each(function () {
    //     this.play();
    // });
// },1000);


    $('.page-nav__list-link').on('click', function (e) {
        e.preventDefault();
        var $this = $(this),
            link = $('.page-nav__list-item'),
            href = $this.attr('href');
        link.removeClass('is-active');
        $this.parent().addClass('is-active');
        $('.homepage-nav__section').removeClass('is-active');

        ($('.homepage-nav__section' + href)).addClass('is-active').find('.homepage__slider').slick('slickGoTo', 0);

        $('html, body').animate({
            scrollTop: Math.ceil($('.homepage-nav__section' + href).position().top)
        }, 500);

        $('html, body').removeClass('no-horizontal-scroll');

        $('.homepage__slider').slick('slickGoTo', 0);
    });

    $('.arrow__down').on('click', function (e) {
        e.preventDefault();
        var $this = $(this),
            sectionParent = $this.parent(),
            sectionNext = sectionParent.next(),
            sectionNextTop = sectionNext.position();

        $('html, body').animate({
            scrollTop: sectionNextTop.top
        }, 500);
        $('html, body').removeClass('no-horizontal-scroll');
    });

    $('.slick-arrow, .slick-dots').on('click', function (e) {
        var $this = $(this),
            parent = $this.parents('.homepage__section'),
            parentTop = Math.ceil(parent.offset().top),
            vwTop = Math.ceil($(document).scrollTop());

        if (parentTop !== vwTop) {
            $('html, body').animate({
                scrollTop: parentTop
            }, 500);
        }

    });

    $('.homepage__slider').on('swipe', function (event, slick, direction) {
        var $this = $(this),
            parent = $this.parents('.homepage__section'),
            parentTop = Math.ceil(parent.offset().top),
            vwTop = Math.ceil($(document).scrollTop());

        if (parentTop !== vwTop) {
            $('html, body').animate({
                scrollTop: parentTop
            }, 500);
        }
    });

    $('.homepage__slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        var $this = $(this),
            arrow = $this.parent().find('.slider-reset__wrap');

        if (nextSlide === 0) {
            $('html, body').removeClass('no-horizontal-scroll');
            $this.parent().removeClass('prevented-scroll');
            $this.removeClass('slider-active');
            arrow.hide();
        } else {
            $('body,html').addClass('no-horizontal-scroll');
            $this.parent().addClass('prevented-scroll');
            $this.addClass('slider-active');
            arrow.show();
        }
    });

    $('.homepage__section').on('touchmove', function (e) {
        if ($(this).hasClass('prevented-scroll')) {
            e.preventDefault();
        }
    });

    $('.slider-reset__wrap').on('click', function (e) {
        e.preventDefault();
        var $this = $(this),
            // parent = $this.parents('.homepage__slider');
            slider = $this.parent().find('.homepage__slider');
        slider.slick('slickGoTo', 0);
    });


    // $('.video__muted').each(function(){
    //   $(this).prop('muted', true);  
    //   $(this).prop('playsinline', '');
    //   $(this).play();
    // });
    // $('.video__muted').prop('playsinline', '');
    // $('.video__muted').get(0).play();
    // $('.video__muted').get(1).play();
    // $('.video__muted').get(2).play();
    // $('.video__muted').get(3).play();
    // $('.video__muted').get(4).play();
    // $('.video__muted').get(5).play();
    // $('.video__muted').get(6).play();


    $('.video__unmuted').prop('playsinline', '');

    $('.modal__video-link').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var $this = $(this),
            href = $this.attr('href');
        $('#overlay').fadeIn(200);
        $this.parents('.page__content').find('.modal__video' + href).addClass('is-active').fadeIn(200);
        $('.modal__video.is-active').find('.video__unmuted').get(0).play();
        $('body', 'html').addClass('no-scroll');
    });

    $('.modal__close').on('click', function (e) {
        var $this = $(this);
        $('#overlay').fadeOut(200);
        $this.parent().removeClass('is-active').fadeOut(200);
        $(this).parent().find('.video__unmuted').get(0).pause();
        $('body', 'html').removeClass('no-scroll');
    });

    $(document).on('click', function (e) {
        if (!e) e = window.event;
        if ($('.modal__video').is('.is-active')) {
            if (!$(e.target).closest('.modal__video.is-active').length) {
                $('.modal__video.is-active').find('.video__unmuted').get(0).pause();
                $('.modal__video.is-active').removeClass('is-active').fadeOut(200);
                $('#overlay').fadeOut(200);
                $('body', 'html').removeClass('no-scroll');
            }
        }
    });

    function navPosition() {
        var element = $(".homepage-nav__section"),
            elementTop, elementBottom, elementI,
            nav = $('.page-nav'),
            navItem = $('.page-nav__list-item'),
            navTop = nav.offset().top,
            navBottom = navTop + nav.outerHeight();

        element.each(function (i) {
            var $this = $(this);
            $this.addClass('section' + i);
            elementI = $this.eq(i);
            elementTop = $this.offset().top;
            elementBottom = elementTop + element.outerHeight();

            if (navBottom >= elementTop && navTop < elementBottom) {
                navItem.removeClass('is-active');
                navItem.eq(i).addClass('is-active');

                $this.addClass('is-active').siblings(element).removeClass('is-active');
            }
        })
    }

    function sliderResizePosition() {
        var slider = $('.homepage__slider'),
            sliderActive = $('.homepage__slider.slider-active');

        if (slider.hasClass('slider-active')) {
            var parent = sliderActive.parent(),
                sliderTop = Math.ceil(parent.offset().top),
                vwTop = Math.ceil($(document).scrollTop());
            if (sliderTop !== vwTop) {
                $('html, body').animate({
                    scrollTop: sliderTop
                }, 0);
            }
        }
    }

    $(window).on('orientationchange', function (event) {
        // $('.homepage__slider.slider-active').slick('slickGoTo', 0);
        // $('.homepage__slider.slider-active').removeClass('slider-active');
    });

    $(window).on('resize', function () {
        lineStart();
        lineEnd();
        navPosition();
        sliderResizePosition();
    });

    $(window).on('scroll', function () {
        navPosition();
    });
});


$(window).on('load', function () {
    $('body').removeClass('is-loading').addClass('is-loaded');
    console.log('body is loaded');
});
