if (typeof jQuery === "undefined") {
    throw new Error("project requires jquery");
}

// 直接在jquery中添加原型方法
$.AdminMy = {};

$.AdminMy.options = {
    animationSpeed: 500,
    sidebarToggleSelector: "[data-toggle='offcanvas']",
    sidebarPushMenu: true,
    enableControlTreeView: true,
    sidebarExpandOnHover: false,
    enableControlSidebar: true,
    controlSidebarOptions: {
        toggleBtnSelector: "[data-toggle='control-sidebar']",
        selector: ".control-sidebar",
        slide: true
    },
    colors: {
        lightBlue: "#3c8dbc",
        red: "#f56954",
        green: "#00a65a",
        aqua: "#00c0ef",
        yellow: "#f39c12",
        blue: "#0073b7",
        navy: "#001F3F",
        teal: "#39cccc",
        olive: "#3d9970",
        lime: "#01ff70",
        orange: "#ff8518",
        fuchsia: "#f012be",
        purple: "#8e24aa",
        maroon: "#d81b60",
        black: "#222222",
        gray: "#d2d6de"
    },
    screenSizes: {
        xs: 480,
        sm: 768,
        md: 992,
        lg: 1200
    }

};


$(function() {
    "use strict";

    var o = $.AdminMy.options;

    _init();

    // 右侧设置页面

    if (o.enableControlSidebar) {
        $.AdminMy.controlSidebar.activate();
    }


    // 左侧菜单页面
    if (o.sidebarPushMenu) {
        $.AdminMy.pushMenu.activate(o.sidebarToggleSelector)
    }

    // 左侧菜单页面中的模块伸缩
    if (o.enableControlTreeView) {
        $.AdminMy.tree('.sidebar');
    }



});



function _init() {
    'use strict';


    //controlSidebar

    $.AdminMy.controlSidebar = {
        activate: function() {
            var _this = this;

            var o = $.AdminMy.options.controlSidebarOptions;
            var sidebar = $(o.selector);
            var btn = $(o.toggleBtnSelector);

            // 点击btn
            btn.on('click', function(e) {
                e.preventDefault();

                if (!sidebar.hasClass('control-sidebar-open') && !$('body').hasClass('control-sidebar-open')) {
                    _this.open(sidebar, o.slide);
                } else {
                    _this.close(sidebar, o.slide);
                }
            })
        },
        open: function(sidebar, slide) {
            if (slide) {
                sidebar.addClass('control-sidebar-open')
            } else {
                $('body').addClass('control-sidebar-open')
            }
        },
        close: function(sidebar, slide) {
            if (slide) {
                sidebar.removeClass('control-sidebar-open');
            } else {
                $('body').removeClass('control-sidebar-open');
            }
        }
    };


    // pushMenu

    $.AdminMy.pushMenu = {
        activate: function(toggleBtn) {
            var screenSizes = $.AdminMy.options.screenSizes;

            $(document).on('click', toggleBtn, function(e) {
                e.preventDefault();

                if ($(window).width() > (screenSizes.sm - 1)) {
                    if ($("body").hasClass('sidebar-collapse')) {
                        $("body").removeClass('sidebar-collapse').trigger('expanded.pushMenu');
                    } else {
                        $("body").addClass('sidebar-collapse').trigger('collapsed.pushMenu');
                    }
                } else {
                    if ($("body").hasClass('sidebar-open')) {
                        $("body").removeClass('sidebar-open').removeClass('sidebar-collapse').trigger('collapsed.pushMenu');
                    } else {
                        $("body").addClass('sidebar-open').trigger('expanded.pushMenu');
                    }
                }
            });

            //小于776，点击内容区菜单收缩
            $(".content-wrapper").click(function() {
                if ($(window).width() <= (screenSizes.sm - 1) && $("body").hasClass("sidebar-open")) {
                    $("body").removeClass('sidebar-open');
                }
            });


            // 触摸左侧菜单
            if ($.AdminMy.options.sidebarExpandOnHover || ($('body').hasClass('fixed') && $('body').hasClass('sidebar-mini'))) {
                this.expandOnHvoer();
            }
        },
        expandOnHover: function() {
            var _this = this;
            var screenWidth = $.AdminMy.options.screenSizes.sm - 1;
            //触摸到左侧菜单，当window.width>776时，
            $('.main-sider').hover(function() {
                if ($('body').hasClass('sidebar-mini') && $('body').hasClass('sidebar-collapse') && $(window).width() > screenWidth) {
                    _this.expand();
                }
            }, function() {
                if ($('body').hasClass('sidebar-mini') && $('body').hasClass('sidebar-expanded-on-hover') && $(window).width() > screenWidth0) {
                    _this.collapse();
                }
            });
        },
        expand: function() {
            $("body").removeClass('sidebar-collapse').addClass('sidebar-expanded-on-hover')
        },
        collapse: function() {
            if ($('body').hasClass('sidebar-expanded-on-hover')) {
                $('body').removeClass('sidebar-expanded-on-hover').addClass('sidebar-collapse');
            }
        }
    };

    //tree('.sidebar')
    $.AdminMy.tree = function(menu) {
        var _this = this;

        var animationSpeed = $.AdminMy.options.animationSpeed;
        // ' li a'前面要有空格
        $(document).off('click', menu + ' li a')
            .on('click', menu + ' li a', function(e) {
                var $this = $(this);
                // treeview-menu  
                var checkElement = $this.next();
                //在没有收缩的时候
                if ((checkElement.is('.treeview-menu')) && (checkElement.is(':visible')) && (!$('body').hasClass('sidebar-collapse'))) {
                    checkElement.slideUp(animationSpeed, function() {
                        checkElement.removeClass('menu-open');
                    });
                    checkElement.parent("li").removeClass("active")
                } else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {

                    var parent = $this.parents('ul').first();

                    var ul = parent.find('ul:visible').slideUp(animationSpeed);
                    ul.removeClass('menu-open');

                    var parent_li = $this.parent("li");

                    checkElement.slideDown(animationSpeed, function() {
                        checkElement.addClass('menu-open');
                        parent.find('li.active').removeClass('active');
                        parent_li.addClass('active');

                    });
                }

                if (checkElement.is('.treeview-menu')) {
                    e.preventDefault();
                }

            });

    };

}