(function ($) {
    console.log('working');
    /*
          1. Set everything up as variables, e.g:
       
              myFunction = function(){
                  var saveEverythingAsVariables = $('#everything');
  
                  ... jquery in here
              }
       
          2. Then add function to required launcher, e.g:
  
              Ready = function(){
                  myfunction();
              }
      */

    var // General purpose vars
        htmlBody = $('html,body'),
        Window = $(window),
        Document = $(document),
        Wrapper = $('#js-wrapper'),
        // Make all external links open in new window
        externalLinks = function () {
            var extLink = Wrapper.find($('a[href^="http"],a[href^="https"]'));
            extLink.attr('target', '_blank');
        },
        // Ajax page loading
        ajaxLoading = function () {
            if ($.support.pjax) {
                Document.pjax('a:not(a[href^="http"],a[href^="mailto"],a[target="_blank"], #admin-menu-account a, #toolbar-item-administration-tray a)');

                Document.on('pjax:clicked', function () {
                    Wrapper.addClass('animated fadeOutUp');
                    htmlBody.velocity('scroll', { duration: 350, easing: 'ease-in-out' });
                });
            }
        },
        // Smooth scrolling
        smoothScroll = function () {
            Wrapper.on('click', '.scroll', function () {
                var $target = $(this.hash);
                $target.velocity('scroll', { duration: 300, offset: -60, easing: 'ease-in-out' });
                return false;
            });
        },
        // Mobile nav
        mobileNav = function () {
            var menuToggle = $('#js-navToggle'),
                nav = $('#js-nav');

            menuToggle.off().on('click', function () {
                console.log('clicked');
                nav.slideToggle(250);
                $(this).toggleClass('nav__toggle--active');
                return false;
            });
        },
        noLinks = function () {
            var link = Wrapper.find('a.no-link');

            link.on('click', function () {
                return false;
            });
        },
        bannerHeight = function () {
            var banner = $('#js-banner'),
                frontBanner = $('#js-banner-front'),
                calcHeights = function () {
                    var setH = Window.height() - 40,
                        bannerH = (setH - $('#js-header').height()) * 0.77,
                        smBannerH = Window.height() - $('#js-header').height() - 20;

                    if (Window.width() > 767) {
                        if (banner.length > 0) {
                            if (Window.height() < 900) {
                                banner.height(smBannerH);
                            } else {
                                banner.height(bannerH);
                            }
                        } else if (frontBanner.length > 0) {
                            frontBanner.height(setH);
                        }
                    }
                };

            calcHeights();

            Window.on('resize', function () {
                setTimeout(function () {
                    calcHeights();
                }, 200);
            });
        },
        moveSearch = function () {
            var searchBlock = $('#block-searchform'),
                navBlock = $('#js-nav'),
                searchForm = $('#search-block-form'),
                status = 0,
                mobenabled = 0,
                moveIt = function () {
                    if (Window.width() < 768) {
                        if (mobenabled == 0) {
                            searchForm.detach();

                            navBlock.prepend(searchForm);

                            status = 1;
                            mobenabled = 1;
                        }
                    } else {
                        if (status == 1) {
                            searchForm.detach();

                            searchBlock.append(searchForm);

                            status = 0;
                        }
                    }
                };

            moveIt();

            Window.on('resize', function () {
                setTimeout(function () {
                    moveIt();
                }, 200);
            });
        },
        mobVenues = function () {
            var btn = $('#mob-venueLinks'),
                target = $('#venue-info'),
                status = 0;

            btn.on('click', function () {
                if (status === 0) {
                    btn.html('hide venue information <span></span>');
                    status = 1;
                } else {
                    btn.html('show venue information <span></span>');
                    status = 0;
                }
                btn.toggleClass('active');
                target.slideToggle();
                return false;
            });
        },
        archiveFilter = function () {
            const archiveFilter = $('#archive-filter');

            if (archiveFilter) {
                archiveFilter.on('change', function (evt, params) {
                    window.location.href = `/whats-on/archive?year=${params.selected}`;
                });
            }
        };

    // ----
    // Prep functions to run
    // ----

    Ready = function () {
        externalLinks();
        ajaxLoading();
        smoothScroll();
        mobileNav();
        noLinks();
        bannerHeight();
        moveSearch();
        mobVenues();
        archiveFilter();
    };

    // ----
    // Run everything
    // ----

    // Document.ready
    $(function () {
        Ready();
    });
})(jQuery);
