(function (window, document, $, undefined) {
  "use strict";

  var axilInit = {
    i: function (e) {
      axilInit.s();
      axilInit.methods();
    },

    s: function (e) {
      (this._window = $(window)),
        (this._document = $(document)),
        (this._body = $("body")),
        (this._html = $("html"));
    },

    methods: function (e) {
      axilInit.w();
      axilInit.contactForm();
      axilInit.axilBackToTop();
      axilInit.shopFilterWidget();
      axilInit.mobileMenuActivation();
      axilInit.menuLinkActive();
      axilInit.headerIconToggle();
      axilInit.priceRangeSlider();
      axilInit.quantityRanger();
      axilInit.axilSlickActivation();
      axilInit.countdownInit(".coming-countdown", "2023/10/01");
      axilInit.campaignCountdown(".campaign-countdown", "2023/10/01");
      axilInit.countdownInit(".poster-countdown", "2023/06/01");
      axilInit.countdownInit(".sale-countdown", "2023/10/31");
      axilInit.sideOffcanvasToggle(".cart-dropdown-btn", "#cart-dropdown");
      axilInit.sideOffcanvasToggle(
        ".Favorite-dropdown-btn",
        "#Favorite-dropdown"
      );
      axilInit.sideOffcanvasToggle(".mobile-nav-toggler", ".header-main-nav");
      axilInit.sideOffcanvasToggle(
        ".department-side-menu",
        ".department-nav-menu"
      );
      axilInit.sideOffcanvasToggle(".filter-toggle", ".axil-shop-sidebar");
      axilInit.sideOffcanvasToggle(".axil-search", "#header-search-modal");
      axilInit.sideOffcanvasToggle(
        ".popup-close, .closeMask",
        "#offer-popup-modal"
      );
      axilInit.stickyHeaderMenu();
      axilInit.salActivation();
      axilInit.magnificPopupActivation();
      axilInit.colorVariantActive();
      axilInit.headerCampaignRemove();
      // axilInit.offerPopupActivation();
      axilInit.axilMasonary();
      axilInit.counterUpActivation();
      axilInit.scrollSmoth();
      axilInit.onLoadClassAdd();
      axilInit.dropdownMenuSlide();
    },

    w: function (e) {
      this._window.on("load", axilInit.l).on("scroll", axilInit.res);
    },

    contactForm: function () {
      $(".axil-contact-form").on("submit", function (e) {
        e.preventDefault();
        var _self = $(this);
        var _selector = _self.closest("input,textarea");
        _self.closest("div").find("input,textarea").removeAttr("style");
        _self.find(".error-msg").remove();
        _self
          .closest("div")
          .find('button[type="submit"]')
          .attr("disabled", "disabled");
        var data = $(this).serialize();
        $.ajax({
          url: "mail.php",
          type: "post",
          dataType: "json",
          data: data,
          success: function (data) {
            _self
              .closest("div")
              .find('button[type="submit"]')
              .removeAttr("disabled");
            if (data.code == false) {
              _self.closest("div").find('[name="' + data.field + '"]');
              _self
                .find(".axil-btn")
                .after('<div class="error-msg"><p>*' + data.err + "</p></div>");
            } else {
              $(".error-msg").hide();
              $(".form-group").removeClass("focused");
              _self
                .find(".axil-btn")
                .after(
                  '<div class="success-msg"><p>' + data.success + "</p></div>"
                );
              _self.closest("div").find("input,textarea").val("");

              setTimeout(function () {
                $(".success-msg").fadeOut("slow");
              }, 5000);
            }
          },
        });
      });
    },

    counterUpActivation: function () {
      var _counter = $(".count");
      if (_counter.length) {
        _counter.counterUp({
          delay: 10,
          time: 1000,
          triggerOnce: true,
        });
      }
    },

    scrollSmoth: function (e) {
      $(document).on("click", ".smoth-animation", function (event) {
        event.preventDefault();
        $("html, body").animate(
          {
            scrollTop: $($.attr(this, "href")).offset().top,
          },
          200
        );
      });
    },

    axilBackToTop: function () {
      var btn = $("#backto-top");
      $(window).scroll(function () {
        if ($(window).scrollTop() > 300) {
          btn.addClass("show");
        } else {
          btn.removeClass("show");
        }
      });
      btn.on("click", function (e) {
        e.preventDefault();
        $("html, body").animate(
          {
            scrollTop: 0,
          },
          "300"
        );
      });
    },

    shopFilterWidget: function () {
      $(".toggle-list > .title").on("click", function (e) {
        var target = $(this).parent().children(".shop-submenu");
        var target2 = $(this).parent();
        $(target).slideToggle();
        $(target2).toggleClass("active");
      });

      $(".toggle-btn").on("click", function (e) {
        var target = $(this).parent().siblings(".toggle-open");
        var target2 = $(this).parent();
        $(target).slideToggle();
        $(target2).toggleClass("active");
      });
    },

    mobileMenuActivation: function (e) {
      $(".menu-item-has-children > a").on("click", function (e) {
        var targetParent = $(this).parents(".header-main-nav");
        var target = $(this).siblings(".axil-submenu");

        if (targetParent.hasClass("open")) {
          $(target).slideToggle(400);
          $(this).parent(".menu-item-has-children").toggleClass("open");
        }
      });

      $(".nav-link.has-megamenu").on("click", function (e) {
        var $this = $(this),
          targetElm = $this.siblings(".megamenu-mobile-toggle");
        targetElm.slideToggle(500);
      });

      // Mobile Sidemenu Class Add
      function resizeClassAdd() {
        if (window.matchMedia("(max-width: 1199px)").matches) {
          $(".department-title").addClass("department-side-menu");
          $(".department-megamenu").addClass("megamenu-mobile-toggle");
        } else {
          $(".department-title").removeClass("department-side-menuu");
          $(".department-megamenu")
            .removeClass("megamenu-mobile-toggle")
            .removeAttr("style");
        }
      }

      $(window).resize(function () {
        resizeClassAdd();
      });

      resizeClassAdd();
    },

    menuLinkActive: function () {
      var currentPage = location.pathname.split("/"),
        current = currentPage[currentPage.length - 1];
      $(".mainmenu li a, .main-navigation li a").each(function () {
        var $this = $(this);
        if ($this.attr("href") === current) {
          $this.addClass("active");
          $this.parents(".menu-item-has-children").addClass("menu-item-open");
        }
      });
    },

    headerIconToggle: function () {
      $(".my-account > a").on("click", function (e) {
        $(this).toggleClass("open").siblings().toggleClass("open");
      });
    },

    priceRangeSlider: function (e) {
      $("#slider-range").slider({
        range: true,
        min: 0,
        max: 5000,
        values: [0, 3000],
        slide: function (event, ui) {
          $("#amount").val("$" + ui.values[0] + "  $" + ui.values[1]);
        },
      });
      $("#amount").val(
        "$" +
          $("#slider-range").slider("values", 0) +
          "  $" +
          $("#slider-range").slider("values", 1)
      );
    },

    quantityRanger: function () {
      $(".qtybtn").on("click", function () {
        var $button = $(this);
        var oldValue = $button.parent().find("input").val();
        if ($button.hasClass("inc")) {
          var newVal = parseFloat(oldValue) + 1;
        } else {
          // Don't allow decrementing below zero
          if (oldValue > 0) {
            var newVal = parseFloat(oldValue) - 1;
          } else {
            newVal = 0;
          }
        }
        $button.parent().find("input").val(newVal);
      });
    },

    axilSlickActivation: function (e) {
      $(".categrie-product-activation").slick({
        rtl: true,

        infinite: true,
        slidesToShow: 7,
        slidesToScroll: 7,
        arrows: true,
        dots: false,
        autoplay: false,
        speed: 1000,
        prevArrow:
          '<button class="slide-arrow prev-arrow"><i class="fal fa-long-arrow-left"></i></button>',
        nextArrow:
          '<button class="slide-arrow next-arrow"><i class="fal fa-long-arrow-right"></i></button>',
        responsive: [
          {
            breakpoint: 1199,
            settings: {
              slidesToShow: 6,
              slidesToScroll: 6,
            },
          },
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
            },
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
          {
            breakpoint: 479,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 400,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      });

      $(".categrie-product-activation-3").slick({
        rtl: true,

        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 6,
        arrows: true,
        dots: false,
        autoplay: false,
        speed: 1000,
        prevArrow:
          '<button class="slide-arrow prev-arrow"><i class="fal fa-long-arrow-left"></i></button>',
        nextArrow:
          '<button class="slide-arrow next-arrow"><i class="fal fa-long-arrow-right"></i></button>',
        responsive: [
          {
            breakpoint: 1199,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 5,
            },
          },
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
            },
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
          {
            breakpoint: 479,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 400,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      });

      $(".categrie-product-activation-4").slick({
        rtl: true,

        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        autoplay: false,
        speed: 1000,
        prevArrow:
          '<button class="slide-arrow prev-arrow"><i class="fal fa-angle-left"></i></button>',
        nextArrow:
          '<button class="slide-arrow next-arrow"><i class="fal fa-angle-right"></i></button>',
      });

      $(".categrie-product-activation-2").slick({
        rtl: true,

        infinite: true,
        slidesToShow: 7,
        slidesToScroll: 7,
        arrows: true,
        dots: false,
        autoplay: true,
        speed: 1000,
        prevArrow:
          '<button class="slide-arrow prev-arrow"><i class="fal fa-long-arrow-left"></i></button>',
        nextArrow:
          '<button class="slide-arrow next-arrow"><i class="fal fa-long-arrow-right"></i></button>',
        responsive: [
          {
            breakpoint: 1399,
            settings: {
              slidesToShow: 6,
              slidesToScroll: 6,
            },
          },
          {
            breakpoint: 1199,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 5,
            },
          },
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 479,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      });

      $(".explore-product-activation").slick({
        rtl: true,

        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        prevArrow:
          '<button class="slide-arrow prev-arrow"><i class="fal fa-long-arrow-left"></i></button>',
        nextArrow:
          '<button class="slide-arrow next-arrow"><i class="fal fa-long-arrow-right"></i></button>',
      });

      $(".popular-product-activation").slick({
        rtl: true,

        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        prevArrow:
          '<button class="slide-arrow prev-arrow"><i class="fal fa-angle-left"></i></button>',
        nextArrow:
          '<button class="slide-arrow next-arrow"><i class="fal fa-angle-right"></i></button>',
      });

      $(".new-arrivals-product-activation").slick({
        rtl: true,

        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: true,
        dots: false,
        prevArrow:
          '<button class="slide-arrow prev-arrow"><i class="fal fa-long-arrow-left"></i></button>',
        nextArrow:
          '<button class="slide-arrow next-arrow"><i class="fal fa-long-arrow-right"></i></button>',
        responsive: [
          {
            breakpoint: 1199,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      });

      $(".new-arrivals-product-activation-2").slick({
        rtl: true,

        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: true,
        dots: false,
        prevArrow:
          '<button class="slide-arrow prev-arrow"><i class="fal fa-long-arrow-left"></i></button>',
        nextArrow:
          '<button class="slide-arrow next-arrow"><i class="fal fa-long-arrow-right"></i></button>',
        responsive: [
          {
            breakpoint: 1199,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 576,
            settings: {
              variableWidth: true,
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      });

      $(".recently-viwed-activation").slick({
        rtl: true,

        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: true,
        dots: false,
        prevArrow:
          '<button class="slide-arrow prev-arrow"><i class="fal fa-angle-left"></i></button>',
        nextArrow:
          '<button class="slide-arrow next-arrow"><i class="fal fa-angle-right"></i></button>',
        responsive: [
          {
            breakpoint: 1199,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 796,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              centerMode: true,
            },
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              centerMode: true,
            },
          },
        ],
      });

      $(".recent-product-activation").slick({
        rtl: true,

        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: true,
        dots: false,
        prevArrow:
          '<button class="slide-arrow prev-arrow"><i class="fal fa-long-arrow-left"></i></button>',
        nextArrow:
          '<button class="slide-arrow next-arrow"><i class="fal fa-long-arrow-right"></i></button>',
        responsive: [
          {
            breakpoint: 1199,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 479,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      });

      $(".header-campaign-activation").slick({
        rtl: true,

        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        autoplay: true,
        prevArrow:
          '<button class="slide-arrow prev-arrow"><i class="fal fa-long-arrow-left"></i></button>',
        nextArrow:
          '<button class="slide-arrow next-arrow"><i class="fal fa-long-arrow-right"></i></button>',
      });

      $(".testimonial-slick-activation-two").slick({
        rtl: true,

        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
        prevArrow:
          '<button class="slide-arrow prev-arrow"><i class="fal fa-long-arrow-left"></i></button>',
        nextArrow:
          '<button class="slide-arrow next-arrow"><i class="fal fa-long-arrow-right"></i></button>',
      });

      $(".testimonial-slick-activation").slick({
        rtl: true,

        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        speed: 500,
        draggable: true,

        prevArrow:
          '<button class="slide-arrow prev-arrow"><i class="fal fa-angle-left"></i></button>',
        nextArrow:
          '<button class="slide-arrow next-arrow"><i class="fal fa-angle-right"></i></button>',
        responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      });

      var $slideStatus = $(".slick-slide-count");

      $(".testimonial-slick-activation-three").on(
        "init reInit afterChange",
        function (event, slick, currentSlide, nextSlide) {
          var i = (currentSlide ? currentSlide : 0) + 1;
          $slideStatus.text(i + "/" + slick.slideCount);
        }
      );

      $(".testimonial-slick-activation-three").slick({
        rtl: true,

        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        speed: 500,
        draggable: true,
        prevArrow: $(".prev-custom-nav"),
        nextArrow: $(".next-custom-nav"),
        responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      });

      $(".product-small-thumb").slick({
        rtl: true,

        infinite: false,
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        focusOnSelect: true,
        vertical: true,
        speed: 800,
        asNavFor: ".product-large-thumbnail",
        responsive: [
          {
            breakpoint: 992,
            settings: {
              vertical: false,
            },
          },
          {
            breakpoint: 768,
            settings: {
              vertical: false,
              slidesToShow: 4,
            },
          },
        ],
      });

      $(".product-large-thumbnail").slick({
        rtl: true,

        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        speed: 800,
        draggable: false,
        asNavFor: ".product-small-thumb",
      });

      $(".product-small-thumb-2").slick({
        rtl: true,

        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        focusOnSelect: true,
        speed: 800,
        asNavFor: ".product-large-thumbnail-2",
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 5,
            },
          },
          {
            breakpoint: 479,
            settings: {
              slidesToShow: 4,
            },
          },
        ],
      });

      $(".product-large-thumbnail-2").slick({
        rtl: true,

        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        speed: 800,
        draggable: false,
        asNavFor: ".product-small-thumb-2",
        prevArrow:
          '<button class="slide-arrow prev-arrow"><i class="fal fa-long-arrow-left"></i></button>',
        nextArrow:
          '<button class="slide-arrow next-arrow"><i class="fal fa-long-arrow-right"></i></button>',
      });

      $(".product-small-thumb-3").slick({
        rtl: true,

        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        focusOnSelect: true,
        vertical: true,
        speed: 800,
        draggable: false,
        swipe: false,
        asNavFor: ".product-large-thumbnail-3",
        responsive: [
          {
            breakpoint: 992,
            settings: {
              vertical: false,
            },
          },
        ],
      });

      $(".product-large-thumbnail-3").slick({
        rtl: true,

        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        speed: 800,
        draggable: false,
        swipe: false,
        asNavFor: ".product-small-thumb-3",
      });

      // New Page
      $(".product-small-thumb-4").slick({
        rtl: true,

        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        focusOnSelect: true,
        speed: 800,
        asNavFor: ".product-large-thumbnail-4",
        prevArrow:
          '<button class="slide-arrow prev-arrow"><i class="fal fa-angle-left"></i></button>',
        nextArrow:
          '<button class="slide-arrow next-arrow"><i class="fal fa-angle-right"></i></button>',
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 679,
            settings: {
              slidesToShow: 3,
            },
          },
        ],
      });

      $(".product-large-thumbnail-4").slick({
        rtl: true,

        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        speed: 800,
        draggable: false,
        swipe: false,
        asNavFor: ".product-small-thumb-4",
      });

      //

      $(".related-blog-activation").slick({
        rtl: true,

        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        speed: 500,
        prevArrow:
          '<button class="slide-arrow prev-arrow"><i class="fal fa-long-arrow-left"></i></button>',
        nextArrow:
          '<button class="slide-arrow next-arrow"><i class="fal fa-long-arrow-right"></i></button>',
        responsive: [
          {
            breakpoint: 1199,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 668,
            settings: {
              centerMode: true,
              slidesToShow: 1,
            },
          },
        ],
      });

      $(".blog-gallery-activation").slick({
        rtl: true,

        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        speed: 500,
        prevArrow:
          '<button class="slide-arrow prev-arrow"><i class="fal fa-long-arrow-left"></i></button>',
        nextArrow:
          '<button class="slide-arrow next-arrow"><i class="fal fa-long-arrow-right"></i></button>',
      });

      $("#quick-view-modal").on("shown.bs.modal", function (event) {
        $(".slick-slider").slick("setPosition");
      });

      $(".slider-thumb-activation-one").slick({
        rtl: true,

        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        focusOnSelect: false,
        speed: 1000,
        autoplay: false,
        asNavFor: ".slider-content-activation-one",
        prevArrow:
          '<button class="slide-arrow prev-arrow"><i class="fal fa-long-arrow-left"></i></button>',
        nextArrow:
          '<button class="slide-arrow next-arrow"><i class="fal fa-long-arrow-right"></i></button>',
        responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      });

      $(".slider-thumb-activation-two").slick({
        rtl: true,

        infinite: true,
        slidesToShow: 3,
        centerPadding: "0",
        arrows: false,
        dots: true,
        speed: 1500,
        autoplay: false,
        centerMode: true,
        responsive: [
          {
            breakpoint: 575,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      });

      $(".slider-thumb-activation-three").slick({
        rtl: true,

        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        focusOnSelect: false,
        speed: 1500,
        autoplay: true,
        responsive: [
          {
            breakpoint: 1199,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      });

      $(".slider-content-activation-one").slick({
        rtl: true,

        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        focusOnSelect: false,
        speed: 500,
        fade: true,
        autoplay: false,
        asNavFor: ".slider-thumb-activation-one",
      });

      $(".slider-activation-one").slick({
        rtl: true,

        infinite: true,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        fade: true,
        focusOnSelect: false,
        speed: 400,
      });

      $(".slider-activation-two").slick({
        rtl: true,

        infinite: true,
        autoplay: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        fade: true,
        adaptiveHeight: true,
        cssEase: "linear",
        speed: 400,
      });

      $(".team-slide-activation").slick({
        rtl: true,

        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: true,
        dots: false,
        prevArrow:
          '<button class="slide-arrow prev-arrow"><i class="fal fa-long-arrow-left"></i></button>',
        nextArrow:
          '<button class="slide-arrow next-arrow"><i class="fal fa-long-arrow-right"></i></button>',
        responsive: [
          {
            breakpoint: 1199,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      });
    },

    countdownInit: function (countdownSelector, countdownTime) {
      var eventCounter = $(countdownSelector);
      if (eventCounter.length) {
        eventCounter.countdown(countdownTime, function (e) {
          $(this).html(
            e.strftime(
              "<div class='countdown-section'><div><div class='countdown-number'>%-D</div> <div class='countdown-unit'>Day</div> </div></div><div class='countdown-section'><div><div class='countdown-number'>%H</div> <div class='countdown-unit'>Hrs</div> </div></div><div class='countdown-section'><div><div class='countdown-number'>%M</div> <div class='countdown-unit'>Min</div> </div></div><div class='countdown-section'><div><div class='countdown-number'>%S</div> <div class='countdown-unit'>Sec</div> </div></div>"
            )
          );
        });
      }
    },

    campaignCountdown: function (countdownSelector, countdownTime) {
      var eventCounter = $(countdownSelector);
      if (eventCounter.length) {
        eventCounter.countdown(countdownTime, function (e) {
          $(this).html(
            e.strftime(
              "<div class='countdown-section'><div><div class='countdown-number'>%-D</div> <div class='countdown-unit'>D</div> </div></div><div class='countdown-section'><div><div class='countdown-number'>%H</div> <div class='countdown-unit'>H</div> </div></div><div class='countdown-section'><div><div class='countdown-number'>%M</div> <div class='countdown-unit'>M</div> </div></div><div class='countdown-section'><div><div class='countdown-number'>%S</div> <div class='countdown-unit'>S</div> </div></div>"
            )
          );
        });
      }
    },

    sideOffcanvasToggle: function (selectbtn, openElement) {
      $("body").on("click", selectbtn, function (e) {
        e.preventDefault();

        var $this = $(this),
          wrapp = $this.parents("body"),
          wrapMask = $("<div / >").addClass("closeMask"),
          cartDropdown = $(openElement);

        if (!cartDropdown.hasClass("open")) {
          wrapp.addClass("open");
          cartDropdown.addClass("open");
          cartDropdown.parent().append(wrapMask);
          wrapp.css({
            overflow: "hidden",
          });
        } else {
          removeSideMenu();
        }

        function removeSideMenu() {
          wrapp.removeAttr("style");
          wrapp.removeClass("open").find(".closeMask").remove();
          cartDropdown.removeClass("open");
        }

        $(".sidebar-close, .closeMask").on("click", function () {
          removeSideMenu();
        });
      });
    },

    stickyHeaderMenu: function () {
      $(window).on("scroll", function () {
        // Sticky Class Add
        if ($("body").hasClass("sticky-header")) {
          var stickyPlaceHolder = $("#axil-sticky-placeholder"),
            menu = $(".axil-mainmenu"),
            menuDropdown = $(".box-all-menu-dropdown"),
            menuH = menu.outerHeight(),
            topHeaderH = $(".axil-header-top").outerHeight() || 0,
            headerCampaign = $(".header-top-campaign").outerHeight() || 0,
            targrtScroll = topHeaderH + headerCampaign;

          if ($(window).scrollTop() > targrtScroll) {
            menu.addClass("axil-sticky");
            menuDropdown.addClass("axil-sticky-Dropdown");
            stickyPlaceHolder.height(menuH);
          } else {
            menu.removeClass("axil-sticky");
            menuDropdown.removeClass("axil-sticky-Dropdown");
            stickyPlaceHolder.height(0);
          }
        }
      });
    },

    salActivation: function () {
      sal({
        threshold: 0.3,
        once: true,
      });
    },

    magnificPopupActivation: function () {
      var yPopup = $(".popup-youtube");
      if (yPopup.length) {
        yPopup.magnificPopup({
          disableOn: 300,
          type: "iframe",
          mainClass: "mfp-fade",
          removalDelay: 160,
          preloader: false,
          fixedContentPos: false,
        });
      }

      if ($(".zoom-gallery").length) {
        $(".zoom-gallery").each(function () {
          $(this).magnificPopup({
            delegate: "a.popup-zoom",
            type: "image",
            gallery: {
              enabled: true,
            },
          });
        });
      }
    },

    colorVariantActive: function () {
      $(".color-variant > li").on("click", function (e) {
        $(this).addClass("active").siblings().removeClass("active");
      });
    },

    headerCampaignRemove: function () {
      $(".remove-campaign").on("click", function () {
        var targetElem = $(".header-top-campaign");
        targetElem.slideUp(function () {
          $(this).remove();
        });
      });
    },

    offerPopupActivation: function () {
      if ($("body").hasClass("newsletter-popup-modal")) {
        setTimeout(function () {
          $("body").addClass("open");
          $("#offer-popup-modal").addClass("open");
        }, 1000);
      }
    },

    axilMasonary: function () {
      $(".axil-isotope-wrapper").imagesLoaded(function () {
        // filter items on button click
        $(".isotope-button").on("click", "button", function () {
          var filterValue = $(this).attr("data-filter");
          $grid.isotope({
            filter: filterValue,
          });
        });

        // init Isotope
        var $grid = $(".isotope-list").isotope({
          itemSelector: ".product",
          percentPosition: true,
          transitionDuration: "0.7s",
          layoutMode: "fitRows",
          masonry: {
            // use outer width of grid-sizer for columnWidth
            columnWidth: 1,
          },
        });
      });

      $(".isotope-button button").on("click", function (event) {
        $(this).siblings(".is-checked").removeClass("is-checked");
        $(this).addClass("is-checked");
        event.preventDefault();
      });
    },

    onLoadClassAdd: function () {
      this._window.on("load", function () {
        setTimeout(function () {
          $(".main-slider-style-4").addClass("animation-init");
        }, 500);
      });
    },

    dropdownMenuSlide: function () {
      if (window.matchMedia("(max-width: 991px)").matches) {
        $("#dropdown-header-menu").removeAttr("data-bs-toggle");
        $("#dropdown-header-menu").on("click", function () {
          $(this).siblings(".dropdown-menu").slideToggle();
          // console.log(this)
        });
      }
    },
  };
  axilInit.i();
})(window, document, jQuery);

// ====================================================================

$(document).ready(function () {
  $(".inbut-checkout").change(function () {
    var parent = $(this).closest(".single-payment");
    var dodBox = parent.find(".box-dod");

    if ($(this).is(":checked")) {
      $(".box-dod").hide();
      dodBox.show();
    }
  });
});

//====================================================================================

// احصل على جميع النجوم وقم بتكرارها لتضيف السمات والتصريفات اللازمة
const stars = document.querySelectorAll(".star");
stars.forEach((star, index) => {
  star.addEventListener("click", () => {
    // إلغاء تأشير جميع النجوم
    stars.forEach((s) => s.classList.remove("active"));
    // قم بتأشير النجوم حتى النجمة الحالية (index)
    for (let i = 0; i <= index; i++) {
      stars[i].classList.add("active");
    }
  });
});

// ==========================================================
$(document).ready(function () {
  $(".your-Services").slick({
    rtl: true,

    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 300,
    dots: false,
    infinite: false,
    speed: 2000,
    dots: false,
    // rtl: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          autoplay: true,
          arrows: true,
        },
      },
      {
        breakpoint: 796,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          infinite: true,
          arrows: true,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          // variableWidth: true,
          centerPadding: "15%",
          autoplay: true,
          infinite: true,
          arrows: true,
          dots: true,
        },
      },
    ],
  });
});
$(document).ready(function () {
  $(".your-Category").slick({
    rtl: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 300,
    dots: false,
    infinite: true,
    speed: 2000,
    dots: false,
    // rtl: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          autoplay: true,
          arrows: true,
        },
      },
      {
        breakpoint: 796,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          infinite: true,
          arrows: true,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          // variableWidth: true,
          centerPadding: "15%",
          autoplay: true,
          infinite: true,
          arrows: true,
          dots: true,
        },
      },
    ],
  });
});

//   ============================================
// active favorite
// $(document).ready(function () {
//   // إضافة مستمع للنقر على الزر
//   $(".btn-Favorite").click(function () {
//     // قم بفحص إذا كان الزر يحتوي على تصنيف "favorite" أم "unfavorite" وقم بتبديلهما
//     if ($(this).hasClass("favorite")) {
//       $(this).removeClass("favorite");
//       $(this).addClass("unfavorite");
//     } else {
//       $(this).removeClass("unfavorite");
//       $(this).addClass("favorite");
//     }
//   });
// });

// ======================================================================================
// Add to cart in sidbar

// ======================================================================================
// Thank-you
const OPTIONS = {
  radius: [3, 7],
  offset: {
    x: [-20, 20],
    y: [-10, 10],
  },
  speed: [0.001, 1],
  velocity: [0.001, 0.005],
  fadeFactor: 0.015,
  radiusFactor: 0.1,
  colors: [
    "0, 31, 63",
    "0, 116, 217",
    "127, 219, 255",
    "57, 204, 204",
    "61, 153, 112",
    "46, 204, 64",
    "1, 255, 112",
    "255, 220, 0",
    "255, 133, 27",
    "255, 65, 54",
    "133, 20, 75",
    "240, 18, 190",
    "177, 13, 201",
    "17, 17, 17",
    "170, 170, 170",
    "221, 221, 221",
  ],
};

class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.resize();
    this.els = [];

    this.tick();

    window.addEventListener("resize", (e) => {
      this.resize();
    });
  }
  resize() {
    this.width = this.canvas.width = this.canvas.clientWidth;
    this.height = this.canvas.height = this.canvas.clientHeight;
  }
  tick() {
    this.clear();

    this.drawAll();

    requestAnimationFrame((_) => {
      this.tick();
    });
  }
  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
  drawAll() {
    this.els.forEach((el) => {
      this.draw(el);
      el.tick();
    });

    this.els = this.els.filter((el) => !el.die);
  }
  draw(el) {
    this.ctx.beginPath();
    this.ctx.arc(el.position.x, el.position.y, el.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = el.color;
    this.ctx.fill();
  }
  add(els) {
    this.els = this.els.concat(els);
  }
}
class Balloon {
  constructor(point) {
    this.fill = OPTIONS.colors[Math.floor(randomNum(OPTIONS.colors.length))];
    this.opacity = 1;
    this.color = `rgba(${this.fill}, ${this.opacity})`;

    this.offset = {
      x: randomFromRange(OPTIONS.offset.x),
      y: randomFromRange(OPTIONS.offset.y),
    };
    this.position = {
      x: point.x + this.offset.x,
      y: point.y + this.offset.y,
    };
    this.radius = Math.round(randomFromRange(OPTIONS.radius));
    this.direction = Math.random() * 360;
    this.speed = randomFromRange(OPTIONS.speed);
    this.velocity = randomFromRange(OPTIONS.velocity);
    this.die = false;
  }
  tick() {
    this.position.x += this.speed * Math.cos((this.direction * Math.PI) / 180);
    this.position.y += this.speed * Math.sin((this.direction * Math.PI) / 180);
    this.radius -= OPTIONS.radiusFactor;
    this.speed -= this.velocity;
    this.opacity -= OPTIONS.fadeFactor;

    if (this.speed <= 0) this.speed = 0.0001;
    if (this.radius <= 0) this.radius = 0.1;

    this.color = `rgba(${this.fill}, ${this.opacity})`;

    if (this.opacity <= 0) this.die = true;
  }
}

//   const renderer = new Renderer(canv);
// ========================================================================================================
$(document).ready(function () {
  $(window).scroll(function () {
    let wScroll = $(window).scrollTop();
    let footerElement = $(".axil-footer-area");

    if (footerElement.length > 0) {
      let footerScrool = footerElement.offset().top;

      if (wScroll > footerScrool + 500) {
        // $(".hid-in-footer").css("backgroundColor", "#00f");
        $(".hid-in-footer").fadeOut(500);
      } else {
        // $(".hid-in-footer").css("backgroundColor", "#ff0");
        $(".hid-in-footer").fadeIn(500);
      }
    }
  });
});

// ========================================================================================================
// Favorites Nav
$(document).ready(function () {
  let grandTotal = 0; // تخزين الإجمالي الفرعي الإجمالي

  // التعامل مع كل عنصر بشكل منفرد
  $(".box-item-Favorites-nav").each(function () {
    const item = $(this);
    const priceItem = item.find(".aside-cart-price-nav-Favorites");
    const quantityInput = item.find(".qty-val-nav-Favorites");
    const totalElement = item.find(".total-item-nav-Favorites");

    // ابتدائيًا، قيمة السعر الأساسي
    const initialPrice = parseFloat(priceItem.text().replace(" ", ""));

    // حساب وعرض الإجمالي عند تحديث الكمية
    function updateTotal() {
      const quantity = parseInt(quantityInput.val());
      const total = initialPrice * quantity;
      totalElement.text(total.toFixed(1) + " ");

      // إعادة حساب الإجمالي الفرعي الإجمالي من جديد
      grandTotal = 0;
      $(".box-item-Favorites-nav .total-item-nav-Favorites").each(function () {
        const itemTotal = parseFloat($(this).text().replace(" ", ""));
        grandTotal += itemTotal;
      });

      // عرض الإجمالي الفرعي الإجمالي
      $(".TOTAL-SUBTOTAL-Nav-Cart").text(grandTotal.toFixed(2) + " ");
    }

    // التحديث عند النقر على زر الزيادة
    item.find(".increaseButtonNavCart").on("click", function () {
      const currentQuantity = parseInt(quantityInput.val());
      quantityInput.val(currentQuantity + 1); // زيادة الكمية بمقدار 1
      updateTotal();
    });

    // التحديث عند النقر على زر النقص
    item.find(".decreaseButtonNavCart").on("click", function () {
      const currentQuantity = parseInt(quantityInput.val());
      if (currentQuantity > 1) {
        quantityInput.val(currentQuantity - 1); // نقص الكمية بمقدار 1
        updateTotal();
      }
    });

    // التحديث عند تغيير الكمية يدويًا
    quantityInput.on("input", updateTotal);

    // حساب وعرض الإجمالي عند تحميل الصفحة
    updateTotal();
  });
});

// -----------------------------------------------------
// delete
$(document).ready(function () {
  // Function to extract and calculate the values
  function calculateTotal() {
    // Calculate the SUBTOTAL value
    var subtotalText = $(".TOTAL-SUBTOTAL-Nav-Cart").text().trim();
    var subtotalValue = parseFloat(subtotalText.replace("", ""));

    // Calculate the new TOTAL-ALL value
    var totalAllValue = subtotalValue;

    // Ensure that the total is not less than zero
    if (totalAllValue < 0) {
      totalAllValue = 0;
    }

    // Update the SUBTOTAL and TOTAL-ALL elements with the new values
    $(".TOTAL-SUBTOTAL-Nav-Cart").text(subtotalValue.toFixed(2) + " ");
  }

  // Call the calculateTotal function initially
  calculateTotal();

  // Add a click event handler for the elements that might change the values
  $(".TOTAL-SUBTOTAL-Nav-Cart").click(function () {
    calculateTotal();
  });

  // في حاله لا يوجد منتجات

  if ($(".box-item-Favorites-nav").length > 0) {
    // If there are cart, show the container

    $(".box-Favorites-empty").css("display", "none");
  }

  // Add a click event handler for the delete buttons
  $(".btn-trash").click(function () {
    // Find the parent element to remove the entire item
    var itemContainer = $(this).closest(".box-item-Favorites-nav");

    if (itemContainer.length) {
      // Extract the item total as a float
      var totalElement = itemContainer.find(".total-item-nav-Favorites");
      var itemTotalText = totalElement.text();
      var itemTotal = parseFloat(itemTotalText.replace(" ", ""));

      if (!isNaN(itemTotal)) {
        // Remove the entire item container from the DOM
        itemContainer.remove();

        // Recalculate the subtotal after removing the item
        var grandTotal = 0;
        $(".box-item-Favorites-nav").each(function () {
          var item = $(this);
          var totalElement = item.find(".total-item-nav-Favorites");
          var itemTotal = parseFloat(totalElement.text().replace(" ", ""));
          if (!isNaN(itemTotal)) {
            grandTotal += itemTotal;
          }
        });

        // Update the SUBTOTAL and TOTAL-ALL with the new totals
        $(".TOTAL-SUBTOTAL-Nav-Cart").text(grandTotal.toFixed(2) + " ");
        calculateTotal(); // Recalculate TOTAL-ALL after item removal
      }

      // After removal, check if there are any remaining "box-item-Favorites-nav" elements
      if ($(".box-item-Favorites-nav").length === 0) {
        // If there are no cart, hide the container
        $(".box-Favorites-empty").css("display", "block");
      }
    }
  });
});

// Add to Favorites in sidbar

$(document).ready(function () {
  $(".box-Favorites-empty").show();
  $(".item-count").hide();

  $(".btn-Favorite").on("click", function () {
    // console.log($(this).data('id'))

    var product = $(this).closest(".box-all-products");
    var productId = product.data("product-id");
    var productImg = product.find("img").attr("src");
    var productName = product.find("h5").text();
    var productPrice = parseFloat(
      product.find(".current-price").first().text().replace("$", "")
    );

    console.log("idddddd", product.data("product-id"));

    if (!$(this).hasClass("active-heart")) {
      var productHtml = `
     
      
      <li class="cart-item box-item-Favorites-nav">
      <div class="item-img">
          <a href="single-product.html">
              <img src="${productImg}" alt="">
          </a>
          <button class="close-btn btn-trash delete-item-cart-nav"  data-id="${productId}"><i class="fas fa-times"></i></button>
      </div>
      <div class="item-content">
  
          <h3 class="item-title"><a href="single-product-3.html">${productName}</a></h3>
          <div class="item-price-fak">${productPrice.toFixed(2)}</div>
          <div class="item-price total-item-nav-Favorites">${productPrice.toFixed(
            2
          )}</div>
          <div class="pro-qty item-quantity">
              <div class="product-variation quantity-variant-wrapper">
                  <div class="pro-qty">
                      <span class="inc qtybtn increaseButtonNavCart">+</span>
                      <input class="qty-val-nav-Favorites" type="text" value="1">
                      <span class="dec qtybtn decreaseButtonNavCart">-</span>
                  </div>
              </div>
          </div>
      </div>
  </li>
 
 
      `;

      $(".offcanvas-body-Favorites").append(productHtml);
      $(".box-Favorites-empty").hide();
      $(".item-count").show();

      updateItemCount();
    }
  });

  function updateItemCount() {
    var itemCount = $(".box-item-Favorites-nav:visible").length;
    $(".item-count").text(itemCount);

    if (itemCount === 0) {
      $(".item-count").hide();
      $(".box-Favorites-empty").show();
    } else {
      $(".item-count").show();
      $(".box-Favorites-empty").hide();
    }
  }

  $(".offcanvas-body-Favorites").on(
    "click",
    ".delete-item-cart-nav",
    function () {
      // console.log($(`.box-all-products[data-product-id=${$(this).data('id')}] .btn-Favorite`))
      $(this).closest(".box-item-Favorites-nav").remove();

      $(
        `.box-all-products[data-product-id=${$(this).data("id")}] .btn-Favorite`
      ).removeClass("active-heart");

      console.log("5555555555555555555555");
      updateItemCount();
    }
  );

  $(".offcanvas-body-Favorites").on(
    "click",
    ".increaseButtonNavCart",
    function () {
      var quantityInput = $(this).siblings(".qty-val-nav-Favorites");
      var currentQuantity = parseInt(quantityInput.val(), 10);
      quantityInput.val(currentQuantity + 1);
      updateTotalItemNavFavorites($(this).closest(".box-item-Favorites-nav"));
    }
  );

  $(".offcanvas-body-Favorites").on(
    "click",
    ".decreaseButtonNavCart",
    function () {
      var quantityInput = $(this).siblings(".qty-val-nav-Favorites");
      var currentQuantity = parseInt(quantityInput.val(), 10);
      if (currentQuantity > 1) {
        quantityInput.val(currentQuantity - 1);
        updateTotalItemNavFavorites($(this).closest(".box-item-Favorites-nav"));
      }
    }
  );

  function updateTotalItemNavFavorites(item) {
    var quantity = parseInt(item.find(".qty-val-nav-Favorites").val(), 10);
    var price = parseFloat(
      item.find(".item-price-fak").text().replace("$", "")
    );
    var total = (quantity * price).toFixed(2);
    item.find(".total-item-nav-Favorites").text(total);
  }
});

// abb to heart in navbar

$(document).ready(function () {
  var heartCount = 0; // Initialize the heart count

  // Function to handle the "Add to Heart" button click
  function addToHeartButtonClick(event) {
    event.preventDefault(); // Prevent the default behavior of the button
    if (!$(this).hasClass("active-heart")) {
      heartCount++; // Increment the heart count when an item is added

      $(this).addClass("active-heart"); // Add the class to the clicked button

      console.log("active-heart");
    }
  }

  // Add event listeners to the "Add to Heart" buttons
  var addToHeartButtons = $(".btn-Favorite");
  addToHeartButtons.click(addToHeartButtonClick);

  // Initialize the heart count and button visibility on page load
});

// ========================================================================================================

// cart Nav

$(document).ready(function () {
  $(".box-Empty-cart").show();
  $(".item-count-cart").hide();

  $(".btn-add-cart").on("click", function () {
    // console.log($(this).data('id'))
    console.log("btn-add-cart clicked");
    // ... rest of the code

    var product = $(this).closest(".box-all-products");
    var productId = product.data("product-id");
    var productImg = product.find("img").attr("src");
    var productName = product.find("h5,h1").text();
    var productPrice = parseFloat(
      product
        .find(".current-price,.price-amount")
        .first()
        .text()
        .replace("$", "")
    );

    console.log("idddddd", product.data("product-id"));

    if (!$(this).hasClass("active-cart")) {
      var productHtml2 = `
   
        <li class="cart-item box-item-cart-nav">
        <div class="item-img">
            <a href="single-product.html">
                <img src="${productImg}" alt="">
            </a>
            <button class="close-btn btn-trash delete-item-cart-nav"  data-id="${productId}"><i class="fas fa-times"></i></button>
        </div>
        <div class="item-content">
    
            <h3 class="item-title"><a href="single-product.html">${productName}</a></h3>
            <div class=" aside-cart-price-nav-cart">${productPrice.toFixed(
              2
            )}</div>
           <div class="d-flex gap-1">
           <div class="item-price total-item-nav-cart">${productPrice.toFixed(
             2
           )} </div>
           <span class="item-price"> R.s</span>
           </div>
            <div class="pro-qty item-quantity">
                <div class="product-variation quantity-variant-wrapper">
                    <div class="pro-qty">
                        <span class="inc qtybtn increaseButtonNavCart">+</span>
                        <input class="qty-val-nav-cart" type="text" value="1">
                        <span class="dec qtybtn decreaseButtonNavCart">-</span>
                    </div>
                </div>
            </div>
        </div>
    </li>

      </div>`;

      $(".offcanvas-body-cart").append(productHtml2);
      $(".box-Empty-cart").hide();
      $(".item-count-cart").show();

      updateItemCount2();
    }
    console.log("After updating item count");
  });

  function updateItemCount2() {
    console.log("Updating item count");
    var itemCount2 = $(".box-item-cart-nav:visible").length;
    $(".item-count-cart").text(itemCount2);

    if (itemCount2 === 0) {
      $(".item-count-cart").hide();
      $(".box-Empty-cart").show();
    } else {
      $(".item-count-cart").show();
      $(".box-Empty-cart").hide();
    }
    updateTotalItemNavCart($(this).closest(".box-item-cart-nav"));
  }

  $(".offcanvas-body-cart").on("click", ".delete-item-cart-nav", function () {
    // console.log($(`.box-all-products[data-product-id=${$(this).data('id')}] .btn-heart`))
    $(this).closest(".box-item-cart-nav").remove();

    $(
      `.box-all-products[data-product-id=${$(this).data("id")}] .btn-add-cart`
    ).removeClass("active-cart");

    console.log("5555555555555555555555");
    updateItemCount2();
    updateTotalItemNavCart($(this).closest(".box-item-cart-nav"));
  });

  $(".offcanvas-body-cart").on("click", ".increaseButtonNavCart", function () {
    var quantityInput = $(this).siblings(".qty-val-nav-cart");
    var currentQuantity = parseInt(quantityInput.val(), 10);
    quantityInput.val(currentQuantity + 1);
    updateTotalItemNavCart($(this).closest(".box-item-cart-nav"));
  });

  $(".offcanvas-body-cart").on("click", ".decreaseButtonNavCart", function () {
    var quantityInput = $(this).siblings(".qty-val-nav-cart");
    var currentQuantity = parseInt(quantityInput.val(), 10);
    if (currentQuantity > 1) {
      quantityInput.val(currentQuantity - 1);
      updateTotalItemNavCart($(this).closest(".box-item-cart-nav"));
    }
  });

  // ... (your existing code)

  function updateTotalItemNavCart(item) {
    var quantity = parseInt(item.find(".qty-val-nav-cart").val(), 10);
    var price = parseFloat(
      item.find(".aside-cart-price-nav-cart").text().replace("R.s", "")
    );
    var total = (quantity * price).toFixed(2);
    item.find(".total-item-nav-cart").text(total);

    // Update the subtotal when total-item-nav-cart is updated
    updateSubtotal();
  }

  function updateSubtotal() {
    var subtotal = 0;
    $(".box-item-cart-nav:visible").each(function () {
      var total = parseFloat($(this).find(".total-item-nav-cart").text());
      subtotal += total;
    });

    // Update the TOTAL-SUBTOTAL-Nav-Cart-aside with the calculated subtotal
    $(".TOTAL-SUBTOTAL-Nav-Cart-aside").text(subtotal.toFixed(2));

    // Show the TOTAL-SUBTOTAL-Nav-Cart-aside even if there are no products in the cart
    $(".TOTAL-SUBTOTAL-Nav-Cart-aside").show();
  }

  // Call updateSubtotal once when the document is ready
  updateSubtotal();

  // ... (your existing code)
});

$(document).ready(function () {
  var cartCount = 0; // Initialize the cart count

  // Function to update the cart count in the navigation
  // function updateCartCount() {
  //   var cartCountElement = $(".number-cart");
  //   cartCountElement.text(cartCount);

  //   // Toggle the visibility of the cart button based on the cart count
  //   var numberCart = $(".number-cart");

  //   if (cartCount === 0) {
  //     numberCart.hide(); // Hide the cart button
  //   } else {
  //     numberCart.show(); // Show the cart button
  //   }
  // }

  // Function to handle the "Add to Cart" button click
  function addToCartButtonClick(event) {
    event.preventDefault(); // Prevent the default behavior of the button
    if (!$(this).hasClass("active-cart")) {
      cartCount++; // Increment the cart count when an item is added
      // updateCartCount(); // Update the cart count and button visibility
      $(this).addClass("active-cart"); // Add the class to the clicked button
    }
  }

  // Add event listeners to the "Add to Cart" buttons
  var addToCartButtons = $(".btn-add-cart");
  addToCartButtons.click(addToCartButtonClick);

  // Initialize the cart count and button visibility on page load
  // updateCartCount();
});

// Add to cart in sidbar

// icon cart
// $(document).ready(function () {
//   $(".btn-add-cart,.btn-add-to-cart").click(function () {
//     var icon = $(this).find("i");
//     if (icon.hasClass("fa-cart-shopping")) {
//       icon.removeClass("fa-cart-shopping").addClass("fa-cart-circle-check");
//     } else {
//       icon.removeClass("fa-cart-circle-check").addClass("fa-cart-shopping");
//     }
//   });
// });
// $(document).ready(function () {
//   $(".btn-add-cart,.btn-add-to-cart").hover(
//     function () {
//       var icon = $(this).find("i.fa-cart-shopping");
//       // icon.css("color", "red"); /* تغيير لون الأيقونة */
//       icon.css("transform", "scale(1.2)"); /* تغيير حجم الأيقونة */
//       /* يمكنك إضافة المزيد من الخصائص حسب رغبتك لتغيير شكل الأيقونة */
//     },
//     function () {
//       var icon = $(this).find("i.fa-cart-shopping");
//       icon.css("color", ""); /* استعادة اللون الافتراضي */
//       icon.css("transform", ""); /* استعادة الحجم الافتراضي */
//     }
//   );
// });
//

// ===================================================================================================================================================================
/* Cart page */
//

$(document).ready(function () {
  let grandTotal = 0; // تخزين الإجمالي الفرعي الإجمالي

  // التعامل مع كل عنصر بشكل منفرد
  $(".box-item-cart-page").each(function () {
    const item = $(this);
    const priceItem = item.find(".price-item");
    const quantityInput = item.find(".qty-val-cart-page");
    const totalElement = item.find(".total-item");

    // ابتدائيًا، قيمة السعر الأساسي
    const initialPrice = parseFloat(priceItem.text().replace(" ", ""));

    // حساب وعرض الإجمالي عند تحديث الكمية
    function updateTotal() {
      const quantity = parseInt(quantityInput.val());
      const total = initialPrice * quantity;
      totalElement.text(total.toFixed(1) + " ");

      // إعادة حساب الإجمالي الفرعي الإجمالي من جديد
      grandTotal = 0;
      $(".box-item-cart-page .total-item").each(function () {
        const itemTotal = parseFloat($(this).text().replace(" ", ""));
        grandTotal += itemTotal;
      });

      // عرض الإجمالي الفرعي الإجمالي
      $(".SUBTOTAL").text(grandTotal.toFixed(2) + " ");
    }

    // التحديث عند النقر على زر الزيادة
    item.find(".btn-increase-increase").on("click", function () {
      const currentQuantity = parseInt(quantityInput.val());
      quantityInput.val(currentQuantity + 1); // زيادة الكمية بمقدار 1
      updateTotal();
    });

    // التحديث عند النقر على زر النقص
    item.find(".btn-increase-decrease").on("click", function () {
      const currentQuantity = parseInt(quantityInput.val());
      if (currentQuantity > 1) {
        quantityInput.val(currentQuantity - 1); // نقص الكمية بمقدار 1
        updateTotal();
      }
    });

    // التحديث عند تغيير الكمية يدويًا
    quantityInput.on("input", updateTotal);

    // حساب وعرض الإجمالي عند تحميل الصفحة
    updateTotal();
  });
});

// -------------------------------------------------------
$(document).ready(function () {
  // Function to extract and calculate the values
  function calculateTotal() {
    // Extract and calculate the values of DISCOUNT, TAX, SHIPPING
    var discountText = $(".DISCOUNT").text().trim();
    var discountValue = parseFloat(discountText.replace("", ""));

    var taxText = $(".TAX").text().trim();
    var taxValue = parseFloat(taxText.replace("", ""));

    var shippingText = $(".SHIPPING").text().trim();
    var shippingValue = parseFloat(shippingText);

    // Calculate the SUBTOTAL value
    var subtotalText = $(".SUBTOTAL").text().trim();
    var subtotalValue = parseFloat(subtotalText.replace("", ""));

    // Calculate the new TOTAL-ALL value
    var totalAllValue =
      subtotalValue + taxValue + shippingValue - discountValue;

    // Update the SUBTOTAL and TOTAL-ALL elements with the new values
    $(".SUBTOTAL").text(subtotalValue.toFixed(2) + " ");
    $(".TOTAL-ALL").text(totalAllValue.toFixed(2) + " ");
  }

  // Call the calculateTotal function initially
  calculateTotal();

  // Add a click event handler for the elements that might change the values
  $(".DISCOUNT, .TAX, .SHIPPING, .SUBTOTAL").click(function () {
    calculateTotal();
  });

  // Add a click event handler for the increase and decrease buttons
  $(".btn-increase-increase, .btn-increase-decrease").click(function () {
    calculateTotal();
  });
});

// -----------------------------------------------------
// delete
$(document).ready(function () {
  // Function to extract and calculate the values
  function calculateTotal() {
    // Extract and calculate the values of DISCOUNT, TAX, SHIPPING
    var discountText = $(".DISCOUNT").text().trim();
    var discountValue = parseFloat(discountText.replace("", ""));

    var taxText = $(".TAX").text().trim();
    var taxValue = parseFloat(taxText.replace("", ""));

    var shippingText = $(".SHIPPING").text().trim();
    var shippingValue = parseFloat(shippingText);

    // Calculate the SUBTOTAL value
    var subtotalText = $(".SUBTOTAL").text().trim();
    var subtotalValue = parseFloat(subtotalText.replace("", ""));

    // Calculate the new TOTAL-ALL value
    var totalAllValue =
      subtotalValue + taxValue + shippingValue - discountValue;

    // Ensure that the total is not less than zero
    if (totalAllValue < 0) {
      totalAllValue = 0;
    }

    // Update the SUBTOTAL and TOTAL-ALL elements with the new values
    $(".SUBTOTAL").text(subtotalValue.toFixed(2) + " ");
    $(".TOTAL-ALL").text(totalAllValue.toFixed(2) + " ");
  }

  // Call the calculateTotal function initially
  calculateTotal();

  // Add a click event handler for the elements that might change the values
  $(".DISCOUNT, .TAX, .SHIPPING, .SUBTOTAL").click(function () {
    calculateTotal();
  });

  // في حاله لا يوجد منتجات

  if ($(".box-item-cart-page").length > 0) {
    // If there are cart, show the container

    $(".box-Empty-cart-page").css("display", "none");
  }

  // Add a click event handler for the delete buttons
  $(".btn-trash").click(function () {
    // Find the parent element to remove the entire item
    var itemContainer = $(this).closest(".box-item-cart-page");

    if (itemContainer.length) {
      // Extract the item total as a float
      var totalElement = itemContainer.find(".total-item");
      var itemTotalText = totalElement.text();
      var itemTotal = parseFloat(itemTotalText.replace(" ", ""));

      if (!isNaN(itemTotal)) {
        // Remove the entire item container from the DOM
        itemContainer.remove();

        // Recalculate the subtotal after removing the item
        var grandTotal = 0;
        $(".box-item-cart-page").each(function () {
          var item = $(this);
          var totalElement = item.find(".total-item");
          var itemTotal = parseFloat(totalElement.text().replace(" ", ""));
          if (!isNaN(itemTotal)) {
            grandTotal += itemTotal;
          }
        });

        // Update the SUBTOTAL and TOTAL-ALL with the new totals
        $(".SUBTOTAL").text(grandTotal.toFixed(2) + " ");
        calculateTotal(); // Recalculate TOTAL-ALL after item removal
      }
    }

    // After removal, check if there are any remaining "box-item-cart-page" elements
    if ($(".box-item-cart-page").length === 0) {
      // If there are no cart, hide the container
      $(".box-Empty-cart-page").css("display", "block");
      $(".box-alert-head-cart-body-cart").css("display", "none");
      // box - alert - head - cart - body - cart;
    }
  });
});

// ===================================================================================================================================================================
$(document).ready(function () {
  $(".btn-Colors").click(function () {
    // إزالة الاكتف من جميع الأزرار
    $(".btn-Colors").removeClass("active-Colors");

    // جعل الزر الحالي فقط فعالًا
    $(this).addClass("active-Colors");
  });
});
$(document).ready(function () {
  $(".btn-Size").click(function () {
    // إزالة الاكتف من جميع الأزرار
    $(".btn-Size").removeClass("active-Size");

    // جعل الزر الحالي فقط فعالًا
    $(this).addClass("active-Size");
  });
});

// ===============================================================================================
// join-us
$(document).ready(function () {
  $("#phone").hide();
  $("#email").hide();
  $("#code").hide();

  $(".btnPhone").click(function () {
    $("#phone").show();

    $("#login").hide();
    $("#email").hide();
    $("#code").hide();
  });

  $(".btnEmail").click(function () {
    $("#email").show();

    $("#login").hide();
    $("#phone").hide();
    $("#code").hide();
  });

  $(".btnSubmitPhoneEmail").click(function () {
    // $("#login").show();
    $("#code").show();

    $("#phone").hide();
    $("#email").hide();
    $("#login").hide();
  });
});
// ===============================================================================================
// scroll To Profile

// spinners
$(document).ready(function () {
  $(".box-item-links-account .nav-link").click(function () {
    // console.log("ccccccccccc");

    $("html, body").animate(
      {
        scrollTop: $(".box-name").offset().top,
      },
      10
    );
  });
});


// ===============================================================
$(document).ready(function () {
  $(".your-All-Categories").slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 300,
    dots: false,
    infinite: true,
    speed: 2000,
    dots: false,
    rtl: true,
    arrows: true,
    
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          autoplay: true,
          arrows: true,
        },
      },
      {
        breakpoint: 796,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          infinite: true,
          arrows: true,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          // variableWidth: true,
          centerPadding: "15%",
          autoplay: true,
          infinite: true,
          arrows: true,
          dots: true,
        },
      },
    ],
  });
});


// =======================================================================================================================================================
// builder

let colorBoxWidth = $("#colorBox").outerWidth();

$("#sideBar").animate({ right: `-${colorBoxWidth}` }, 0);

$("#sideBarToggle,.btn-arrow-left").click(function () {
  if ($("#sideBar").css("right") == "0px") {

    $("#sideBar").animate({ right: `-${colorBoxWidth}` }, 2000);
  } else {
    $("#sideBar").animate({ right: `0px` }, 2000);
  }
});



// -----------------------------------------------------------------------
// device looks (smartphone / laptop)

$("#laptopdevice").click(function () {
  $(".iframeLaptop").show(500);

  $(".iframeMobile").hide(500);
});


$("#mobiledevice").click(function () {
  $(".iframeMobile").show(500);
  $(".iframeLaptop").hide(500);

});

// =======================================================================================================================================================
