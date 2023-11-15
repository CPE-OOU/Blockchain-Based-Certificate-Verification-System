var NioApp = function(w, x, n, i) {
    "use strict";
    var k = x(n),
        c = x(i),
        u = x("body"),
        p = x(".header-main"),
        m = 992,
        h = "menu-mobile",
        t = "has-fixed",
        s = "is-shrink",
        a = "nk-block",
        e = "nio-theme",
        v = n.location.href,
        g = n.location.hostname,
        o = p.innerHeight() - 2,
        f = v.split("#"),
        l = (x.fn.exists = function() {
            return 0 < this.length
        }, w.Win = {}, w.Win.height = x(n).height(), w.Win.width = x(n).width(), w.getStatus = {}, w.getStatus.isRTL = !(!u.hasClass("has-rtl") && "rtl" !== u.attr("dir")), w.getStatus.isTouch = "ontouchstart" in i.documentElement, w.getStatus.isMobile = !!navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|/i), w.getStatus.asMobile = w.Win.width < 768, k.on("resize", function() {
            w.Win.height = x(n).height(), w.Win.width = x(n).width(), w.getStatus.asMobile = w.Win.width < 768
        }), w.Util = {}, w.Util.classInit = function() {
            function a() {
                !0 === w.getStatus.asMobile ? u.addClass("as-mobile") : u.removeClass("as-mobile")
            }!0 === w.getStatus.isTouch ? u.addClass("has-touch") : u.addClass("no-touch"), a(), "rtl" === u.attr("dir") && (u.addClass("has-rtl"), w.getStatus.isRTL = !0), u.addClass("nk-" + e), x(n).on("resize", a)
        }, w.components.docReady.push(w.Util.classInit), w.Util.preLoader = function() {
            var a = x(".preloader"),
                e = x(".spinner");
            a.exists() && (u.addClass("page-loaded"), e.addClass("load-done"), e.hasClass("spinner-alt") || e.fadeOut(300), a.delay(600).fadeOut(300))
        }, w.components.winLoad.push(w.Util.preLoader), w.Util.backTop = function() {
            var a = x(".backtop");
            a.exists() && (800 < k.scrollTop() ? a.fadeIn("slow") : a.fadeOut("slow"), a.on("click", function(a) {
                x("body,html").stop().animate({
                    scrollTop: 0
                }, 1500, "easeInOutExpo"), a.preventDefault()
            }))
        }, w.components.docReady.push(w.Util.backTop), w.Util.browser = function() {
            var a = -1 !== navigator.userAgent.indexOf("Chrome") ? 1 : 0,
                e = -1 !== navigator.userAgent.indexOf("Firefox") ? 1 : 0,
                t = -1 !== navigator.userAgent.indexOf("Safari"),
                s = !(-1 !== navigator.userAgent.indexOf("MSIE") || i.documentMode ? 1 : 0) && !!n.StyleMedia,
                o = navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf("OPR") ? 1 : 0;
            a ? u.addClass("chrome") : e ? u.addClass("firefox") : s ? u.addClass("edge") : o ? u.addClass("opera") : t && u.addClass("safari")
        }, w.components.winLoad.push(w.Util.browser), w.Util.headerSticky = function() {
            var e = x(".is-sticky"),
                a = {
                    hasFixed: function() {
                        var a;
                        e.exists() && (a = e.offset(), k.on("scroll", function() {
                            k.scrollTop() > a.top ? e.hasClass(t) || e.addClass(t) : e.hasClass(t) && e.removeClass(t)
                        }))
                    },
                    hasShrink: function() {
                        e.hasClass(s) && (o = p.height() + 16 - 2)
                    }
                };
            a.hasFixed(), a.hasShrink(), k.on("resize", function() {
                o = e.hasClass(s) ? p.height() + 16 - 2 : p.outerHeight() - 2
            })
        }, w.components.docReady.push(w.Util.headerSticky), w.Util.imageBG = function() {
            var a = x(".bg-image");
            a.exists() && a.each(function() {
                var a = x(this),
                    e = a.parent(),
                    t = a.data("overlay"),
                    s = a.data("opacity"),
                    o = a.children("img").attr("src"),
                    t = !(void 0 === t || !t) && t,
                    s = !(void 0 === s || !s) && s;
                void 0 !== o && "" !== o && (e.hasClass("has-bg-image") || e.addClass("has-bg-image"), t ? a.hasClass("overlay-" + t) || (a.addClass("overlay"), a.addClass("overlay-" + t)) : a.hasClass("overlay-fall") || a.addClass("overlay-fall"), s && a.addClass("overlay-opacity-" + s), a.css("background-image", 'url("' + o + '")').addClass("bg-image-loaded"))
            })
        }, w.components.docReady.push(w.Util.imageBG), w.Util.Ovm = function() {
            var a = x(".nk-ovm"),
                e = x(".nk-ovm[class*=mask]"),
                t = x("[class*=ui-mask]");
            a.exists() && a.each(function() {
                x(this).parent().hasClass("has-ovm") || x(this).parent().addClass("has-ovm")
            }), e.exists() && e.each(function() {
                x(this).parent().hasClass("has-mask") || x(this).parent().addClass("has-mask")
            }), t.exists() && t.each(function() {
                x(this).parent().hasClass("has-ovm") || x(this).parent().addClass("has-ovm")
            })
        }, w.components.docReady.push(w.Util.Ovm), w.Util.progressBar = function() {
            var a = x("[data-percent]"),
                e = x("[data-point]");
            a.exists() && a.each(function() {
                x(this).css("width", x(this).data("percent") + "%")
            }), e.exists() && e.each(function() {
                x(this).css("left", x(this).data("point") + "%")
            }), e.exists() && !0 === w.getStatus.isRTL && e.each(function() {
                x(this).css("right", x(this).data("point") + "%"), x(this).css("left", "auto")
            })
        }, w.components.docReady.push(w.Util.progressBar), w.Util.inputAnimate = function() {
            var a = x(".input-line");
            a.exists() && a.each(function() {
                var a = x(this),
                    e = a.val(),
                    t = "input-focused";
                e && a.parent().addClass(t), a.on("focus", function() {
                    x(this).parent().addClass(t)
                }), a.on("blur", function() {
                    x(this).parent().removeClass(t), x(this).val() && x(this).parent().addClass(t)
                })
            })
        }, w.components.docReady.push(w.Util.inputAnimate), w.Util.toggler = function() {
            var s = ".toggle-tigger",
                o = ".toggle-class";
            x(s).exists() && c.on("click", s, function(a) {
                var e = x(this);
                x(s).not(e).removeClass("active"), x(o).not(e.parent().children()).removeClass("active"), e.toggleClass("active").parent().find(o).toggleClass("active"), a.preventDefault()
            }), c.on("click", "body", function(a) {
                var e = x(s),
                    t = x(o);
                t.is(a.target) || 0 !== t.has(a.target).length || e.is(a.target) || 0 !== e.has(a.target).length || (t.removeClass("active"), e.removeClass("active"))
            })
        }, w.components.docReady.push(w.Util.toggler), w.Util.accordionActive = function() {
            var a = x(".accordion-item"),
                e = x(".accordion-title");
            a.exists() && a.each(function() {
                var a = x(this);
                a.find(".accordion-title").hasClass("collapsed") ? a.removeClass("current") : a.addClass("current")
            }), e.exists() && e.on("click", function() {
                var a = x(this);
                a.parent().siblings().removeClass("current"), a.parent().addClass("current")
            })
        }, w.components.docReady.push(w.Util.accordionActive), w.Util.scrollAnimation = function() {
            var a = x(".animated");
            x().waypoint && a.exists() && a.each(function() {
                var a = x(this),
                    e = a.data("animate"),
                    t = a.data("duration"),
                    s = a.data("delay");
                a.waypoint(function() {
                    a.addClass("animated " + e).css("visibility", "visible"), t && a.css("animation-duration", t + "s"), s && a.css("animation-delay", s + "s")
                }, {
                    offset: "95%"
                })
            })
        }, w.components.winLoad.push(w.Util.scrollAnimation), w.MainMenu = function() {
            var e = x(".navbar-toggle"),
                t = x(".header-navbar"),
                s = x(".header-navbar-classic"),
                o = x(".menu-toggle"),
                a = x(".menu-link"),
                n = ".menu-drop",
                i = "open-nav",
                l = "menu-shown",
                d = "navbar-active",
                r = {
                    Overlay: function() {
                        t.exists() && t.append('<div class="header-navbar-overlay"></div>')
                    },
                    navToggle: function() {
                        e.exists() && e.on("click", function(a) {
                            var e = x(this),
                                t = e.data("menu-toggle");
                            e.toggleClass(d), (s.exists() ? x("#" + t).slideToggle() : x("#" + t).parent()).toggleClass(l), u.toggleClass("overlay-" + l), a.preventDefault()
                        })
                    },
                    navClose: function() {
                        x(".header-navbar-overlay").on("click", function() {
                            e.removeClass(d), t.removeClass(l), u.removeClass("overlay-" + l)
                        }), a.on("click", function() {
                            x(this).hasClass("menu-toggle") || (e.removeClass(d), t.removeClass(l), u.removeClass("overlay-" + l))
                        }), c.on("click", "body", function(a) {
                            !o.is(a.target) && 0 === o.has(a.target).length && !p.is(a.target) && 0 === p.has(a.target).length && k.width() < m && (e.removeClass(d), s.find(".header-menu").slideUp(), t.removeClass(l), u.removeClass("overlay-" + l))
                        }), k.on("resize", function(a) {
                            !w.getStatus.asMobile && k.width() > m && u.hasClass("overlay-" + l) && (u.removeClass("overlay-" + l), e.removeClass(d))
                        })
                    },
                    menuToggle: function() {
                        o.exists() && o.on("click", function(a) {
                            var e = x(this).parent();
                            k.width() < m && (e.children(n).slideToggle(400), e.siblings().children(n).slideUp(400), e.toggleClass(i), e.siblings().removeClass(i)), a.preventDefault()
                        })
                    },
                    mobileNav: function() {
                        k.width() < m ? t.delay(500).addClass(h) : (t.delay(500).removeClass(h), t.removeClass(l))
                    },
                    currentPage: function() {
                        a.exists() && a.each(function() {
                            v === this.href && "" !== f[1] && x(this).closest("li").addClass("active").parent().closest("li").addClass("active"), void 0 !== v && void 0 !== g || u.addClass("d-none")
                        })
                    }
                };
            r.Overlay(), r.navToggle(), r.navClose(), r.menuToggle(), r.mobileNav(), r.currentPage(), k.on("resize", function() {
                r.mobileNav()
            })
        }, w.components.docReady.push(w.MainMenu), w.OnePageScroll = function() {
            x('a.menu-link[href*="#"]:not([href="#"])').on("click", function() {
                if (location.pathname.replace(/^\//, "") === this.pathname.replace(/^\//, "") && location.hostname === this.hostname) {
                    var a = this.hash,
                        e = !!this.hash.slice(1) && x("[name=" + this.hash.slice(1) + "]"),
                        a = a.length ? x(a) : e;
                    if (a.length) return x(".navbar-toggle").removeClass("active"), x(".header-navbar").removeClass("menu-shown"), x("html, body").scrollTop(a.offset().top - o), !1
                }
            })
        }, w.components.docReady.push(w.OnePageScroll), w.scrollAct = function() {
            var a = x(".header-menu").attr("id");
            u.scrollspy({
                target: "#" + a,
                offset: o + 2
            })
        }, w.components.docReady.push(w.scrollAct), w.modalFix = function() {
            x(".modal").on("shown.bs.modal", function() {
                u.hasClass("modal-open") || u.addClass("modal-open")
            })
        }, w.components.docReady.push(w.modalFix), w.Plugins = {}, w.Plugins.countdown = function() {
            var a = x(".countdown");
            a.exists() && a.each(function() {
                var a = x(this),
                    e = a.attr("data-date"),
                    t = a.data("day-text") ? a.data("day-text") : "Days",
                    s = a.data("hour-text") ? a.data("hour-text") : "Hours",
                    o = a.data("min-text") ? a.data("min-text") : "Min",
                    n = a.data("sec-text") ? a.data("sec-text") : "Sec";
                a.countdown(e).on("update.countdown", function(a) {
                    x(this).html(a.strftime('<div class="countdown-item"><span class="countdown-time countdown-time-first">%D</span><span class="countdown-text">' + t + '</span></div><div class="countdown-item"><span class="countdown-time">%H</span><span class="countdown-text">' + s + '</span></div><div class="countdown-item"><span class="countdown-time">%M</span><span class="countdown-text">' + o + '</span></div><div class="countdown-item"><span class="countdown-time countdown-time-last">%S</span><span class="countdown-text">' + n + "</span></div>"))
                })
            })
        }, w.components.docReady.push(w.Plugins.countdown), w.Plugins.carousel = function() {
            var a = x(".has-carousel");

            function y(a) {
                a = x(a);
                !a.hasClass("blank-added") && 575 < k.width() ? (a.trigger("add.owl.carousel", ['<div class="item-blank"></div>']), a.addClass("blank-added").removeClass("blank-removed"), a.trigger("refresh.owl.carousel")) : !a.hasClass("blank-removed") && k.width() < 576 && a.hasClass("blank-added") && (a.trigger("remove.owl.carousel", -1), a.addClass("blank-removed").removeClass("blank-added"), a.trigger("refresh.owl.carousel"))
            }
            a.exists() && a.each(function() {
                var a = x(this),
                    e = a.data("items") ? a.data("items") : 4,
                    t = a.data("items-desk") ? a.data("items-desk") : e,
                    s = a.data("items-tab-l") ? a.data("items-tab-l") : 3 < e ? e - 1 : e,
                    o = a.data("items-tab-p") ? a.data("items-tab-p") : 2 < s ? s - 1 : s,
                    n = a.data("items-mobile") ? a.data("items-mobile") : 1 < o ? o - 1 : o,
                    n = a.data("items-mobile-s") ? a.data("items-mobile-s") : n,
                    i = a.data("timeout") ? a.data("timeout") : 6e3,
                    l = !!a.data("auto") && a.data("auto"),
                    d = a.data("auto-speed") ? a.data("auto-speed") : 600,
                    r = !!a.data("loop") && a.data("loop"),
                    c = !!a.data("dots") && a.data("dots"),
                    u = !!a.data("custom-dots") && "." + a.data("custom-dots"),
                    p = !!a.data("navs") && a.data("navs"),
                    m = !!a.data("center") && a.data("center"),
                    h = a.data("margin") ? a.data("margin") : 30,
                    v = a.data("margin-tab-l") ? a.data("margin-tab-l") : h,
                    g = a.data("margin-tab-p") ? a.data("margin-tab-p") : v,
                    f = a.data("margin-mob") ? a.data("margin-mob") : g,
                    C = !!a.data("animate-out") && a.data("animate-out"),
                    b = !!a.data("animate-in") && a.data("animate-in");
                e <= 1 && (e = t = s = o = 1), a.addClass("owl-carousel").owlCarousel({
                    navText: ["", ""],
                    items: e,
                    loop: r,
                    nav: p,
                    dots: c,
                    dotsContainer: u,
                    margin: h,
                    center: m,
                    autoplay: l,
                    autoplayTimeout: i,
                    autoplaySpeed: d,
                    animateOut: C,
                    animateIn: b,
                    rtl: w.getStatus.isRTL,
                    autoHeight: !1,
                    responsive: {
                        0: {
                            items: n,
                            margin: f
                        },
                        576: {
                            items: n,
                            margin: f
                        },
                        768: {
                            items: o,
                            margin: g
                        },
                        992: {
                            items: s,
                            margin: v
                        },
                        1200: {
                            items: e,
                            margin: h
                        },
                        1600: {
                            items: t,
                            margin: h
                        }
                    },
                    onInitialized: function() {
                        x().waypoint && Waypoint.refreshAll()
                    }
                }), !0 === a.data("blank") && (y(a), k.on("resize", function() {
                    y(a)
                }))
            })
        }, w.components.docReady.push(w.Plugins.carousel), w.Plugins.flexslider = function() {
            var a = x(".has-flex-slider");
            a.exists() && a.each(function() {
                var a = x(this),
                    e = a.data("slide-speed") ? a.data("slide-speed") : 3e3,
                    t = !!a.data("slide-show") && a.data("slide-show"),
                    s = !!a.data("anim-loop") && a.data("anim-loop"),
                    o = a.data("anim-speed") ? a.data("anim-speed") : 600,
                    n = !!a.data("pause") && a.data("pause");
                a.flexslider({
                    animation: "fade",
                    animationLoop: s,
                    animationSpeed: o,
                    slideshow: t,
                    slideshowSpeed: e,
                    directionNav: !1,
                    controlNav: !0,
                    pauseOnAction: n
                })
            })
        }, w.components.docReady.push(w.Plugins.flexslider), w.Plugins.select2 = function() {
            var a = x(".select");
            a.exists() && a.each(function() {
                var a = x(this),
                    e = a.data("select2-theme") ? a.data("select2-theme") : "bordered",
                    t = a.data("select2-placehold") ? a.data("select2-placehold") : "Select an option",
                    s = a.data("search") && "on" === a.data("search") ? 1 : -1;
                a.select2({
                    placeholder: t,
                    theme: "default select-" + e,
                    minimumResultsForSearch: s
                })
            })
        }, w.components.docReady.push(w.Plugins.select2), w.Plugins.validform = function() {
            var a = x(".form-validate");
            if (!x().validate) return console.log("jQuery Form Validate not Defined."), !0;
            a.exists() && a.each(function() {
                var a = x(this);
                a.validate(), a.find(".select").on("change", function() {
                    x(this).valid()
                })
            })
        }, w.components.docReady.push(w.Plugins.validform), w.Plugins.submitform = function() {
            var a = x(".nk-form-submit");
            if (!x().validate && !x().ajaxSubmit) return console.log("jQuery Form and Form Validate not Defined."), !0;
            a.exists() && a.each(function() {
                var a = x(this),
                    s = a.find(".form-results");
                a.validate({
                    ignore: [],
                    invalidHandler: function() {
                        s.slideUp(400)
                    },
                    submitHandler: function(t) {
                        s.slideUp(400), x(t).ajaxSubmit({
                            target: s,
                            dataType: "json",
                            success: function(a) {
                                var e = "error" === a.result ? "alert-danger" : "alert-success";
                                s.removeClass("alert-danger alert-success").addClass("alert " + e).html(a.message).slideDown(400), "error" !== a.result && x(t).clearForm().find("input").removeClass("input-focused")
                            }
                        })
                    }
                }), a.find(".select").on("change", function() {
                    x(this).valid()
                })
            })
        }, w.components.docReady.push(w.Plugins.submitform), w.Plugins.parallax = function() {
            var a = x("[data-parallax]");
            a.exists() && a.each(function() {
                var a = x(this);
                !0 === a.data("parallax") && (a.addClass("plx-bg"), a.parent().addClass("has-plx"))
            })
        }, w.components.docReady.push(w.Plugins.parallax), w.Plugins.popup = function() {
            var a = x(".content-popup"),
                e = x(".video-popup"),
                t = x(".image-popup"),
                s = {
                    content_popup: function() {
                        a.exists() && a.each(function() {
                            var a = x(this).data("overlay"),
                                a = void 0 !== a && a ? a : "";
                            x(this).magnificPopup({
                                type: "inline",
                                preloader: !0,
                                removalDelay: 400,
                                mainClass: "mfp-fade content-popup " + a,
                                callbacks: {
                                    open: function() {
                                        u.addClass("mfp-opened")
                                    },
                                    close: function() {
                                        u.removeClass("mfp-opened")
                                    }
                                }
                            })
                        })
                    },
                    video_popup: function() {
                        e.exists() && e.each(function() {
                            x(this).magnificPopup({
                                type: "iframe",
                                removalDelay: 160,
                                preloader: !0,
                                fixedContentPos: !1,
                                callbacks: {
                                    beforeOpen: function() {
                                        this.st.image.markup = this.st.image.markup.replace("mfp-figure", "mfp-figure mfp-with-anim"), this.st.mainClass = this.st.el.attr("data-effect")
                                    }
                                }
                            })
                        })
                    },
                    image_popup: function() {
                        t.exists() && t.each(function() {
                            x(this).magnificPopup({
                                type: "image",
                                mainClass: "mfp-fade image-popup"
                            })
                        })
                    }
                };
            s.content_popup(), s.video_popup(), s.image_popup()
        }, w.components.docReady.push(w.Plugins.popup), w.Plugins.particles = function() {
            var a = x(".particles-bg");
            a.exists() && a.each(function() {
                var a = x(this),
                    e = a.attr("id"),
                    t = a.data("pt-base") ? a.data("pt-base") : "#fff",
                    s = a.data("pt-base-op") ? parseFloat(a.data("pt-base-op")) : .1,
                    o = a.data("pt-shape") ? a.data("pt-shape") : "#fff",
                    n = a.data("pt-shape-op") ? parseFloat(a.data("pt-shape-op")) : .1,
                    i = a.data("pt-line") ? a.data("pt-line") : "#fff",
                    a = a.data("pt-line-op") ? parseFloat(a.data("pt-line-op")) : .2;
                particlesJS(e, {
                    particles: {
                        number: {
                            value: 30,
                            density: {
                                enable: !0,
                                value_area: 800
                            }
                        },
                        color: {
                            value: t
                        },
                        shape: {
                            type: "circle",
                            opacity: n,
                            stroke: {
                                width: 0,
                                color: o
                            },
                            polygon: {
                                nb_sides: 5
                            }
                        },
                        opacity: {
                            value: s,
                            random: !1,
                            anim: {
                                enable: !1,
                                speed: 1,
                                opacity_min: .12,
                                sync: !1
                            }
                        },
                        size: {
                            value: 6,
                            random: !0,
                            anim: {
                                enable: !1,
                                speed: 40,
                                size_min: .08,
                                sync: !1
                            }
                        },
                        line_linked: {
                            enable: !0,
                            distance: 150,
                            color: i,
                            opacity: a,
                            width: 1.3
                        },
                        move: {
                            enable: !0,
                            speed: 6,
                            direction: "none",
                            random: !1,
                            straight: !1,
                            out_mode: "out",
                            bounce: !1,
                            attract: {
                                enable: !1,
                                rotateX: 600,
                                rotateY: 1200
                            }
                        }
                    },
                    interactivity: {
                        detect_on: "canvas",
                        events: {
                            onhover: {
                                enable: !0,
                                mode: "repulse"
                            },
                            onclick: {
                                enable: !0,
                                mode: "push"
                            },
                            resize: !0
                        },
                        modes: {
                            grab: {
                                distance: 400,
                                line_linked: {
                                    opacity: 1
                                }
                            },
                            bubble: {
                                distance: 400,
                                size: 40,
                                duration: 2,
                                opacity: 8,
                                speed: 3
                            },
                            repulse: {
                                distance: 200,
                                duration: .4
                            },
                            push: {
                                particles_nb: 4
                            },
                            remove: {
                                particles_nb: 2
                            }
                        }
                    },
                    retina_detect: !0
                })
            })
        }, w.components.docReady.push(w.Plugins.particles), w.Plugins.videoBG = function() {
            var a = x(".bg-video");
            a.exists() && a.each(function() {
                var a = x(this),
                    e = a.parent(),
                    t = a.data("overlay"),
                    s = a.data("opacity"),
                    o = a.data("video"),
                    n = a.data("cover"),
                    t = !(void 0 === t || !t) && t,
                    s = !(void 0 === s || !s) && s,
                    n = !(void 0 === n || !n) && n;
                e.hasClass("has-bg-video") || e.addClass("has-bg-video"), t ? a.hasClass("overlay-" + t) || (a.addClass("overlay"), a.addClass("overlay-" + t)) : a.hasClass("overlay-fall") || a.addClass("overlay-fall"), s && a.addClass("overlay-opacity-" + s), n && w.Win.width < 768 && (a.addClass("cover-enabled"), a.append('<div class="bg-video-cover" style="background-image:url(' + n + ')"></div>')), a.hasClass("bg-video-youtube") && !a.hasClass("cover-enabled") && a.YTPlayer({
                    fitToBackground: !0,
                    videoId: o,
                    callback: function() {
                        console.clear()
                    }
                })
            })
        }, w.components.docReady.push(w.Plugins.videoBG), k.on("resize", function() {
            w.components.docReady.push(w.Plugins.videoBG)
        }), w.Plugins.dataTable = function() {
            var e, a = x(".dt-filter-init");
            a.exists() && (e = a.DataTable({
                ordering: !0,
                autoWidth: !1,
                dom: "<'row'<'col-sm-6 col-mb-6'f><'col-sm-6'<'dt-short'>>><'table-wrap't>",
                language: {
                    search: '<em class="ti ti-search"></em>',
                    searchPlaceholder: "Search"
                }
            }), x(".dt-shorter").on("change", function() {
                var a = x(this).val();
                e.columns("." + a).order("asc").draw()
            }))
        }, w.components.docReady.push(w.Plugins.dataTable), g.split(".")),
        d = e.slice(-5),
        r = e.slice(0, 3),
        l = l.indexOf(d + r);
    return w.demoPanel = function() {
        var a = x(".demo-themes,.demo-close"),
            e = x(".demo-content"),
            t = x(".demo-color"),
            s = x(".demo-color-palette"),
            o = x(".change-style");
        0 < e.length && a.on("click", function() {
            e.toggleClass("demo-active").css("display", "block"), u.toggleClass("shown-preview")
        }), 0 < t.length && t.on("click", function() {
            s.slideToggle(400)
        }), 0 < o.length && o.on("click", function() {
            var a = x(this).attr("title"),
                e = w.getStatus.isRTL ? "../assets/css/" : "assets/css/";
            return x("body").fadeOut(function() {
                x("#changeTheme").attr("href", e + a + ".css"), x(this).delay(150).fadeIn()
            }), !1
        })
    }, w 
}(NioApp = function(a, e, t) {
    "use strict";
    var s = {
            AppInfo: {
                name: "ICOCrypto",
                package: "2.1.0",
                version: "2.1.0",
                author: "Softnio"
            }
        },
        o = {
            docReady: [],
            docReadyDefer: [],
            winLoad: [],
            winLoadDefer: []
        };

    function n(e) {
        e = void 0 === e ? a : e, o.docReady.concat(o.docReadyDefer).forEach(function(a) {
            a(e)
        })
    }

    function i(e) {
        e = "object" == typeof e ? a : e, o.winLoad.concat(o.winLoadDefer).forEach(function(a) {
            a(e)
        })
    }
    return a(t).ready(n), a(e).on("load", i), s.components = o, s.docReady = n, s.winLoad = i, s
}(jQuery, window, document), jQuery, window, document);