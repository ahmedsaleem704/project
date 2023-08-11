/**
 * Header Component.
 *
 * @author Htmlstream
 * @version 1.0
 *
 */
;(function ($) {
  'use strict';

  $.MyTravelHeader = {

    /**
     * Base configuration.
     *
     * @var Object _baseConfig
     */
    _baseConfig: {
      headerFixMoment: 0,
      headerFixEffect: 'slide',
      breakpointsMap: {
        'md': 768,
        'sm': 576,
        'lg': 992,
        'xl': 1200
      }
    },

    /**
     * Initializtion of header.
     *
     * @param jQuery element
     *
     * @return jQuery
     */
    init: function (element) {

      if (!element || element.length !== 1 || element.data('MyTravelHeader')) return;

      var self = this;

      this.element = element;
      this.config = $.extend(true, {}, this._baseConfig, element.data());

      this.observers = this._detectObservers();
      this.fixMediaDifference(this.element);
      this.element.data('MyTravelHeader', new MyTravelHeader(this.element, this.config, this.observers));

      $(window)
          .on('scroll.uHeader', function (e) {

            if ($(window).scrollTop() < ($(element).data('header-fix-moment') - 100) && $(element).data('effect-compensation') === true) {
              $(element).css({
                top: -($(window).scrollTop())
              })
                  .addClass($(element).data('effect-compensation-start-class'))
                  .removeClass($(element).data('effect-compensation-end-class'));
            } else if ($(element).data('effect-compensation') === true) {
              $(element).css({
                top: 0
              })
                  .addClass($(element).data('effect-compensation-end-class'))
                  .removeClass($(element).data('effect-compensation-start-class'));
            }

            if ($(window).scrollTop() > 5 && !$(element).hasClass('.u-scrolled')) {
              $(element).addClass('u-scrolled')
            } else {
              $(element).removeClass('u-scrolled')
            }

            element
                .data('MyTravelHeader')
                .notify();

          })
          .on('resize.uHeader', function (e) {

            if (self.resizeTimeOutId) clearTimeout(self.resizeTimeOutId);

            self.resizeTimeOutId = setTimeout(function () {

              element
                  .data('MyTravelHeader')
                  .checkViewport()
                  .update();

            }, 100);

          })
          .trigger('scroll.uHeader');

      return this.element;

    },

    /**
     *
     *
     * @param
     *
     * @return
     */
    _detectObservers: function () {

      if (!this.element || !this.element.length) return;

      var observers = {
        'xs': [],
        'sm': [],
        'md': [],
        'lg': [],
        'xl': []
      };

      /* ------------------------ xs -------------------------*/

      // Has Hidden Element
      if (this.element.hasClass('u-header--has-hidden-element')) {
        observers['xs'].push(
            new MyTravelHeaderHasHiddenElement(this.element)
        );
      }

      // Sticky top

      if (this.element.hasClass('u-header--sticky-top')) {

        if (this.element.hasClass('u-header--show-hide')) {

          observers['xs'].push(
              new MyTravelHeaderMomentShowHideObserver(this.element)
          );

        }
        else if (this.element.hasClass('u-header--toggle-section')) {

          observers['xs'].push(
              new MyTravelHeaderHideSectionObserver(this.element)
          );

        }

        if (this.element.hasClass('u-header--change-logo')) {

          observers['xs'].push(
              new MyTravelHeaderChangeLogoObserver(this.element)
          );

        }

        if (this.element.hasClass('u-header--change-appearance')) {

          observers['xs'].push(
              new MyTravelHeaderChangeAppearanceObserver(this.element)
          );

        }

      }

      // Floating

      if (this.element.hasClass('u-header--floating')) {

        observers['xs'].push(
            new MyTravelHeaderFloatingObserver(this.element)
        );

      }

      if (this.element.hasClass('u-header--invulnerable')) {
        observers['xs'].push(
            new MyTravelHeaderWithoutBehaviorObserver(this.element)
        );
      }

      // Sticky bottom

      if (this.element.hasClass('u-header--sticky-bottom')) {

        if (this.element.hasClass('u-header--change-appearance')) {
          observers['xs'].push(
              new MyTravelHeaderChangeAppearanceObserver(this.element)
          );
        }

        if (this.element.hasClass('u-header--change-logo')) {

          observers['xs'].push(
              new MyTravelHeaderChangeLogoObserver(this.element)
          );

        }

      }

      // Abs top & Static

      if (this.element.hasClass('u-header--abs-top') || this.element.hasClass('u-header--static')) {

        if (this.element.hasClass('u-header--show-hide')) {

          observers['xs'].push(
              new MyTravelHeaderShowHideObserver(this.element)
          );

        }

        if (this.element.hasClass('u-header--change-logo')) {

          observers['xs'].push(
              new MyTravelHeaderChangeLogoObserver(this.element)
          );

        }

        if (this.element.hasClass('u-header--change-appearance')) {

          observers['xs'].push(
              new MyTravelHeaderChangeAppearanceObserver(this.element)
          );

        }

      }

      // Abs bottom & Abs top 2nd screen

      if (this.element.hasClass('u-header--abs-bottom') || this.element.hasClass('u-header--abs-top-2nd-screen')) {

        observers['xs'].push(
            new MyTravelHeaderStickObserver(this.element)
        );

        if (this.element.hasClass('u-header--change-appearance')) {

          observers['xs'].push(
              new MyTravelHeaderChangeAppearanceObserver(this.element, {
                fixPointSelf: true
              })
          );

        }

        if (this.element.hasClass('u-header--change-logo')) {

          observers['xs'].push(
              new MyTravelHeaderChangeLogoObserver(this.element, {
                fixPointSelf: true
              })
          );

        }

      }

      /* ------------------------ sm -------------------------*/

      // Sticky top

      // Has Hidden Element
      if (this.element.hasClass('u-header--has-hidden-element-sm')) {
        observers['sm'].push(
            new MyTravelHeaderHasHiddenElement(this.element)
        );
      }

      if (this.element.hasClass('u-header--sticky-top-sm')) {

        if (this.element.hasClass('u-header--show-hide-sm')) {

          observers['sm'].push(
              new MyTravelHeaderMomentShowHideObserver(this.element)
          );

        }
        else if (this.element.hasClass('u-header--toggle-section-sm')) {

          observers['sm'].push(
              new MyTravelHeaderHideSectionObserver(this.element)
          );

        }

        if (this.element.hasClass('u-header--change-logo-sm')) {

          observers['sm'].push(
              new MyTravelHeaderChangeLogoObserver(this.element)
          );

        }

        if (this.element.hasClass('u-header--change-appearance-sm')) {

          observers['sm'].push(
              new MyTravelHeaderChangeAppearanceObserver(this.element)
          );

        }

      }

      // Floating

      if (this.element.hasClass('u-header--floating-sm')) {

        observers['sm'].push(
            new MyTravelHeaderFloatingObserver(this.element)
        );

      }

      if (this.element.hasClass('u-header--invulnerable-sm')) {
        observers['sm'].push(
            new MyTravelHeaderWithoutBehaviorObserver(this.element)
        );
      }

      // Sticky bottom

      if (this.element.hasClass('u-header--sticky-bottom-sm')) {

        if (this.element.hasClass('u-header--change-appearance-sm')) {
          observers['sm'].push(
              new MyTravelHeaderChangeAppearanceObserver(this.element)
          );
        }

        if (this.element.hasClass('u-header--change-logo-sm')) {

          observers['sm'].push(
              new MyTravelHeaderChangeLogoObserver(this.element)
          );

        }

      }

      // Abs top & Static

      if (this.element.hasClass('u-header--abs-top-sm') || this.element.hasClass('u-header--static-sm')) {

        if (this.element.hasClass('u-header--show-hide-sm')) {

          observers['sm'].push(
              new MyTravelHeaderShowHideObserver(this.element)
          );

        }

        if (this.element.hasClass('u-header--change-logo-sm')) {

          observers['sm'].push(
              new MyTravelHeaderChangeLogoObserver(this.element)
          );

        }

        if (this.element.hasClass('u-header--change-appearance-sm')) {

          observers['sm'].push(
              new MyTravelHeaderChangeAppearanceObserver(this.element)
          );

        }

      }

      // Abs bottom & Abs top 2nd screen

      if (this.element.hasClass('u-header--abs-bottom-sm') || this.element.hasClass('u-header--abs-top-2nd-screen-sm')) {

        observers['sm'].push(
            new MyTravelHeaderStickObserver(this.element)
        );

        if (this.element.hasClass('u-header--change-appearance-sm')) {

          observers['sm'].push(
              new MyTravelHeaderChangeAppearanceObserver(this.element, {
                fixPointSelf: true
              })
          );

        }

        if (this.element.hasClass('u-header--change-logo-sm')) {

          observers['sm'].push(
              new MyTravelHeaderChangeLogoObserver(this.element, {
                fixPointSelf: true
              })
          );

        }

      }

      /* ------------------------ md -------------------------*/

      // Has Hidden Element
      if (this.element.hasClass('u-header--has-hidden-element-md')) {
        observers['md'].push(
            new MyTravelHeaderHasHiddenElement(this.element)
        );
      }

      // Sticky top

      if (this.element.hasClass('u-header--sticky-top-md')) {

        console.log(1);

        if (this.element.hasClass('u-header--show-hide-md')) {

          observers['md'].push(
              new MyTravelHeaderMomentShowHideObserver(this.element)
          );

        }
        else if (this.element.hasClass('u-header--toggle-section-md')) {

          observers['md'].push(
              new MyTravelHeaderHideSectionObserver(this.element)
          );

        }

        if (this.element.hasClass('u-header--change-logo-md')) {

          observers['md'].push(
              new MyTravelHeaderChangeLogoObserver(this.element)
          );

        }

        if (this.element.hasClass('u-header--change-appearance-md')) {

          observers['md'].push(
              new MyTravelHeaderChangeAppearanceObserver(this.element)
          );

        }

      }

      // Floating

      if (this.element.hasClass('u-header--floating-md')) {

        observers['md'].push(
            new MyTravelHeaderFloatingObserver(this.element)
        );

      }

      if (this.element.hasClass('u-header--invulnerable-md')) {
        observers['md'].push(
            new MyTravelHeaderWithoutBehaviorObserver(this.element)
        );
      }

      // Sticky bottom

      if (this.element.hasClass('u-header--sticky-bottom-md')) {

        if (this.element.hasClass('u-header--change-appearance-md')) {
          observers['md'].push(
              new MyTravelHeaderChangeAppearanceObserver(this.element)
          );
        }

        if (this.element.hasClass('u-header--change-logo-md')) {

          observers['md'].push(
              new MyTravelHeaderChangeLogoObserver(this.element)
          );

        }

      }

      // Abs top & Static

      if (this.element.hasClass('u-header--abs-top-md') || this.element.hasClass('u-header--static-md')) {

        if (this.element.hasClass('u-header--show-hide-md')) {

          observers['md'].push(
              new MyTravelHeaderShowHideObserver(this.element)
          );

        }

        if (this.element.hasClass('u-header--change-logo-md')) {

          observers['md'].push(
              new MyTravelHeaderChangeLogoObserver(this.element)
          );

        }

        if (this.element.hasClass('u-header--change-appearance-md')) {

          observers['md'].push(
              new MyTravelHeaderChangeAppearanceObserver(this.element)
          );

        }

      }

      // Abs bottom & Abs top 2nd screen

      if (this.element.hasClass('u-header--abs-bottom-md') || this.element.hasClass('u-header--abs-top-2nd-screen-md')) {

        observers['md'].push(
            new MyTravelHeaderStickObserver(this.element)
        );

        if (this.element.hasClass('u-header--change-appearance-md')) {

          observers['md'].push(
              new MyTravelHeaderChangeAppearanceObserver(this.element, {
                fixPointSelf: true
              })
          );

        }

        if (this.element.hasClass('u-header--change-logo-md')) {

          observers['md'].push(
              new MyTravelHeaderChangeLogoObserver(this.element, {
                fixPointSelf: true
              })
          );

        }

      }


      /* ------------------------ lg -------------------------*/

      // Has Hidden Element
      if (this.element.hasClass('u-header--has-hidden-element-lg')) {
        observers['lg'].push(
            new MyTravelHeaderHasHiddenElement(this.element)
        );
      }

      // Sticky top

      if (this.element.hasClass('u-header--sticky-top-lg')) {

        if (this.element.hasClass('u-header--show-hide-lg')) {

          observers['lg'].push(
              new MyTravelHeaderMomentShowHideObserver(this.element)
          );

        }
        else if (this.element.hasClass('u-header--toggle-section-lg')) {

          observers['lg'].push(
              new MyTravelHeaderHideSectionObserver(this.element)
          );

        }

        if (this.element.hasClass('u-header--change-logo-lg')) {

          observers['lg'].push(
              new MyTravelHeaderChangeLogoObserver(this.element)
          );

        }

        if (this.element.hasClass('u-header--change-appearance-lg')) {

          observers['lg'].push(
              new MyTravelHeaderChangeAppearanceObserver(this.element)
          );

        }

      }

      // Floating

      if (this.element.hasClass('u-header--floating-lg')) {

        observers['lg'].push(
            new MyTravelHeaderFloatingObserver(this.element)
        );

      }

      if (this.element.hasClass('u-header--invulnerable-lg')) {
        observers['lg'].push(
            new MyTravelHeaderWithoutBehaviorObserver(this.element)
        );
      }

      // Sticky bottom

      if (this.element.hasClass('u-header--sticky-bottom-lg')) {

        if (this.element.hasClass('u-header--change-appearance-lg')) {
          observers['lg'].push(
              new MyTravelHeaderChangeAppearanceObserver(this.element)
          );
        }

        if (this.element.hasClass('u-header--change-logo-lg')) {

          observers['lg'].push(
              new MyTravelHeaderChangeLogoObserver(this.element)
          );

        }

      }

      // Abs top & Static

      if (this.element.hasClass('u-header--abs-top-lg') || this.element.hasClass('u-header--static-lg')) {

        if (this.element.hasClass('u-header--show-hide-lg')) {

          observers['lg'].push(
              new MyTravelHeaderShowHideObserver(this.element)
          );

        }

        if (this.element.hasClass('u-header--change-logo-lg')) {

          observers['lg'].push(
              new MyTravelHeaderChangeLogoObserver(this.element)
          );

        }

        if (this.element.hasClass('u-header--change-appearance-lg')) {

          observers['lg'].push(
              new MyTravelHeaderChangeAppearanceObserver(this.element)
          );

        }

      }

      // Abs bottom & Abs top 2nd screen

      if (this.element.hasClass('u-header--abs-bottom-lg') || this.element.hasClass('u-header--abs-top-2nd-screen-lg')) {

        observers['lg'].push(
            new MyTravelHeaderStickObserver(this.element)
        );

        if (this.element.hasClass('u-header--change-appearance-lg')) {

          observers['lg'].push(
              new MyTravelHeaderChangeAppearanceObserver(this.element, {
                fixPointSelf: true
              })
          );

        }

        if (this.element.hasClass('u-header--change-logo-lg')) {

          observers['lg'].push(
              new MyTravelHeaderChangeLogoObserver(this.element, {
                fixPointSelf: true
              })
          );

        }

      }

      /* ------------------------ xl -------------------------*/

      // Has Hidden Element
      if (this.element.hasClass('u-header--has-hidden-element-xl')) {
        observers['xl'].push(
            new MyTravelHeaderHasHiddenElement(this.element)
        );
      }

      // Sticky top

      if (this.element.hasClass('u-header--sticky-top-xl')) {

        if (this.element.hasClass('u-header--show-hide-xl')) {

          observers['xl'].push(
              new MyTravelHeaderMomentShowHideObserver(this.element)
          );

        }
        else if (this.element.hasClass('u-header--toggle-section-xl')) {

          observers['xl'].push(
              new MyTravelHeaderHideSectionObserver(this.element)
          );

        }

        if (this.element.hasClass('u-header--change-logo-xl')) {

          observers['xl'].push(
              new MyTravelHeaderChangeLogoObserver(this.element)
          );

        }

        if (this.element.hasClass('u-header--change-appearance-xl')) {

          observers['xl'].push(
              new MyTravelHeaderChangeAppearanceObserver(this.element)
          );

        }

      }

      // Floating

      if (this.element.hasClass('u-header--floating-xl')) {

        observers['xl'].push(
            new MyTravelHeaderFloatingObserver(this.element)
        );

      }

      // Sticky bottom

      if (this.element.hasClass('u-header--invulnerable-xl')) {
        observers['xl'].push(
            new MyTravelHeaderWithoutBehaviorObserver(this.element)
        );
      }

      // Sticky bottom

      if (this.element.hasClass('u-header--sticky-bottom-xl')) {

        if (this.element.hasClass('u-header--change-appearance-xl')) {
          observers['xl'].push(
              new MyTravelHeaderChangeAppearanceObserver(this.element)
          );
        }

        if (this.element.hasClass('u-header--change-logo-xl')) {

          observers['xl'].push(
              new MyTravelHeaderChangeLogoObserver(this.element)
          );

        }

      }

      // Abs top & Static

      if (this.element.hasClass('u-header--abs-top-xl') || this.element.hasClass('u-header--static-xl')) {

        if (this.element.hasClass('u-header--show-hide-xl')) {

          observers['xl'].push(
              new MyTravelHeaderShowHideObserver(this.element)
          );

        }

        if (this.element.hasClass('u-header--change-logo-xl')) {

          observers['xl'].push(
              new MyTravelHeaderChangeLogoObserver(this.element)
          );

        }

        if (this.element.hasClass('u-header--change-appearance-xl')) {

          observers['xl'].push(
              new MyTravelHeaderChangeAppearanceObserver(this.element)
          );

        }

      }

      // Abs bottom & Abs top 2nd screen

      if (this.element.hasClass('u-header--abs-bottom-xl') || this.element.hasClass('u-header--abs-top-2nd-screen-xl')) {

        observers['xl'].push(
            new MyTravelHeaderStickObserver(this.element)
        );

        if (this.element.hasClass('u-header--change-appearance-xl')) {

          observers['xl'].push(
              new MyTravelHeaderChangeAppearanceObserver(this.element, {
                fixPointSelf: true
              })
          );

        }

        if (this.element.hasClass('u-header--change-logo-xl')) {

          observers['xl'].push(
              new MyTravelHeaderChangeLogoObserver(this.element, {
                fixPointSelf: true
              })
          );

        }

      }


      return observers;

    },

    /**
     *
     *
     * @param
     *
     * @return
     */
    fixMediaDifference: function (element) {

      if (!element || !element.length || !element.filter('[class*="u-header--side"]').length) return;

      var toggleable;

      if (element.hasClass('u-header--side-left-xl') || element.hasClass('u-header--side-right-xl')) {

        toggleable = element.find('.navbar-expand-xl');

        if (toggleable.length) {
          toggleable
              .removeClass('navbar-expand-xl')
              .addClass('navbar-expand-lg');
        }

      }
      else if (element.hasClass('u-header--side-left-lg') || element.hasClass('u-header--side-right-lg')) {

        toggleable = element.find('.navbar-expand-lg');

        if (toggleable.length) {
          toggleable
              .removeClass('navbar-expand-lg')
              .addClass('navbar-expand-md');
        }

      }
      else if (element.hasClass('u-header--side-left-md') || element.hasClass('u-header--side-right-md')) {

        toggleable = element.find('.navbar-expand-md');

        if (toggleable.length) {
          toggleable
              .removeClass('navbar-expand-md')
              .addClass('navbar-expand-sm');
        }

      }
      else if (element.hasClass('u-header--side-left-sm') || element.hasClass('u-header--side-right-sm')) {

        toggleable = element.find('.navbar-expand-sm');

        if (toggleable.length) {
          toggleable
              .removeClass('navbar-expand-sm')
              .addClass('navbar-expand');
        }

      }

    }

  };

  /**
   * MyTravelHeader constructor function.
   *
   * @param jQuery element
   * @param Object config
   * @param Object observers
   *
   * @return undefined
   */
  function MyTravelHeader(element, config, observers) {

    if (!element || !element.length) return;

    this.element = element;
    this.config = config;

    this.observers = observers && $.isPlainObject(observers) ? observers : {};

    this.viewport = 'xs';
    this.checkViewport();

  }

  /**
   *
   *
   * @return Object
   */
  MyTravelHeader.prototype.checkViewport = function () {

    var $w = $(window);

    if ($w.width() > this.config.breakpointsMap['sm'] && this.observers['sm'].length) {
      this.prevViewport = this.viewport;
      this.viewport = 'sm';

      if(this.element[0].dataset.headerFixMoment && $w.scrollTop() > this.element[0].dataset.headerFixMoment) {

        if(typeof this.config.breakpointsMap['sm'] === 'undefined') {
          this.element.removeClass('js-header-fix-moment');
        } else {
          this.element.addClass('js-header-fix-moment');
        }

      }

      return this;
    }

    if ($w.width() > this.config.breakpointsMap['md'] && this.observers['md'].length) {
      this.prevViewport = this.viewport;
      this.viewport = 'md';

      if(this.element[0].dataset.headerFixMoment && $w.scrollTop() > this.element[0].dataset.headerFixMoment) {

        if (typeof this.config.breakpointsMap['md'] === 'undefined') {
          this.element.removeClass('js-header-fix-moment');
        } else {
          this.element.addClass('js-header-fix-moment');
        }

      }

      return this;
    }

    if ($w.width() > this.config.breakpointsMap['lg'] && this.observers['lg'].length) {
      this.prevViewport = this.viewport;
      this.viewport = 'lg';

      if(this.element[0].dataset.headerFixMoment && $w.scrollTop() > this.element[0].dataset.headerFixMoment) {

        if (typeof this.config.breakpointsMap['lg'] === 'undefined') {
          this.element.removeClass('js-header-fix-moment');
        } else {
          this.element.addClass('js-header-fix-moment');
        }

      }

      return this;
    }

    if ($w.width() > this.config.breakpointsMap['xl'] && this.observers['xl'].length) {
      this.prevViewport = this.viewport;
      this.viewport = 'xl';

      if(this.element[0].dataset.headerFixMoment && $w.scrollTop() > this.element[0].dataset.headerFixMoment) {

        if (typeof this.config.breakpointsMap['xl'] === 'undefined') {
          this.element.removeClass('js-header-fix-moment');
        } else {
          this.element.addClass('js-header-fix-moment');
        }

      }

      return this;
    }


    if (this.prevViewport) this.prevViewport = this.viewport;

    if(this.element[0].dataset.headerFixMoment && $w.scrollTop() > this.element[0].dataset.headerFixMoment) {

      if (typeof this.config.breakpointsMap['xs'] === 'undefined') {
        this.element.removeClass('js-header-fix-moment');
      } else {
        this.element.addClass('js-header-fix-moment');
      }

    }

    this.viewport = 'xs';


    return this;

  };

  /**
   * Notifies all observers.
   *
   * @return Object
   */
  MyTravelHeader.prototype.notify = function () {

    if (this.prevViewport) {
      this.observers[this.prevViewport].forEach(function (observer) {
        observer.destroy();
      });
      this.prevViewport = null;
    }

    this.observers[this.viewport].forEach(function (observer) {
      observer.check();
    });

    return this;

  };

  /**
   * Reinit all header's observers.
   *
   * @return Object
   */
  MyTravelHeader.prototype.update = function () {

    for (var viewport in this.observers) {

      this.observers[viewport].forEach(function (observer) {
        observer.destroy();
      });

    }

    this.prevViewport = null;

    this.observers[this.viewport].forEach(function (observer) {
      observer.reinit();
    });

    return this;

  };

  /**
   * Abstract constructor function for each observer.
   *
   * @param jQuery element
   *
   * @return Boolean|undefined
   */
  function MyTravelAbstractObserver(element) {
    if (!element || !element.length) return;

    this.element = element;
    this.defaultState = true;

    this.reinit = function () {

      this
          .destroy()
          .init()
          .check();
    };

    return true;
  }

  /**
   * Header's observer which is responsible for 'sticky' behavior.
   *
   * @param jQuery element
   */
  function MyTravelHeaderStickObserver(element) {
    if (!MyTravelAbstractObserver.call(this, element)) return;

    this.init();

  }

  /**
   *
   *
   * @param
   *
   * @return
   */
  MyTravelHeaderStickObserver.prototype.init = function () {
    this.defaultState = true;
    this.offset = this.element.offset().top;

    return this;
  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  MyTravelHeaderStickObserver.prototype.destroy = function () {
    this.toDefaultState();

    return this;
  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  MyTravelHeaderStickObserver.prototype.check = function () {

    var $w = $(window),
        docScrolled = $w.scrollTop();

    if (docScrolled > this.offset && this.defaultState) {
      this.changeState();
    }
    else if (docScrolled < this.offset && !this.defaultState) {
      this.toDefaultState();
    }

    return this;

  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  MyTravelHeaderStickObserver.prototype.changeState = function () {

    this.element.addClass('js-header-fix-moment');
    this.defaultState = !this.defaultState;

    return this;

  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  MyTravelHeaderStickObserver.prototype.toDefaultState = function () {

    this.element.removeClass('js-header-fix-moment');
    this.defaultState = !this.defaultState;

    return this;

  };


  /**
   * Header's observer which is responsible for 'show/hide' behavior which is depended on scroll direction.
   *
   * @param jQuery element
   */
  function MyTravelHeaderMomentShowHideObserver(element) {
    if (!MyTravelAbstractObserver.call(this, element)) return;

    this.init();
  }

  /**
   *
   *
   * @return Object
   */
  MyTravelHeaderMomentShowHideObserver.prototype.init = function () {
    this.direction = 'down';
    this.delta = 0;
    this.defaultState = true;

    this.offset = isFinite(this.element.data('header-fix-moment')) && this.element.data('header-fix-moment') !== 0 ? this.element.data('header-fix-moment') : 5;
    this.effect = this.element.data('header-fix-effect') ? this.element.data('header-fix-effect') : 'show-hide';

    return this;
  };

  /**
   *
   *
   * @return Object
   */
  MyTravelHeaderMomentShowHideObserver.prototype.destroy = function () {
    this.toDefaultState();

    return this;
  };

  /**
   *
   *
   * @param
   *
   * @return Object
   */
  MyTravelHeaderMomentShowHideObserver.prototype.checkDirection = function () {

    if ($(window).scrollTop() > this.delta) {
      this.direction = 'down';
    }
    else {
      this.direction = 'up';
    }

    this.delta = $(window).scrollTop();

    return this;

  };

  /**
   *
   *
   * @return Object
   */
  MyTravelHeaderMomentShowHideObserver.prototype.toDefaultState = function () {

    switch (this.effect) {
      case 'slide' :
        this.element.removeClass('u-header--moved-up');
        break;

      case 'fade' :
        this.element.removeClass('u-header--faded');
        break;

      default:
        this.element.removeClass('u-header--invisible');
    }

    this.defaultState = !this.defaultState;

    return this;
  };

  /**
   *
   *
   * @return Object
   */
  MyTravelHeaderMomentShowHideObserver.prototype.changeState = function () {

    switch (this.effect) {
      case 'slide' :
        this.element.addClass('u-header--moved-up');
        break;

      case 'fade' :
        this.element.addClass('u-header--faded');
        break;

      default:
        this.element.addClass('u-header--invisible');
    }

    this.defaultState = !this.defaultState;

    return this;
  };

  /**
   *
   *
   * @return Object
   */
  MyTravelHeaderMomentShowHideObserver.prototype.check = function () {

    var docScrolled = $(window).scrollTop();
    this.checkDirection();


    if (docScrolled >= this.offset && this.defaultState && this.direction === 'down') {
      this.changeState();
    }
    else if (!this.defaultState && this.direction === 'up') {
      this.toDefaultState();
    }

    return this;

  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  function MyTravelHeaderShowHideObserver(element) {
    if (!MyTravelAbstractObserver.call(this, element)) return;

    this.init();
  }

  /**
   *
   *
   * @param
   *
   * @return Object
   */
  MyTravelHeaderShowHideObserver.prototype.init = function () {
    if (!this.defaultState && $(window).scrollTop() > this.offset) return this;

    this.defaultState = true;
    this.transitionDuration = parseFloat(getComputedStyle(this.element.get(0))['transition-duration'], 10) * 1000;

    this.offset = isFinite(this.element.data('header-fix-moment')) && this.element.data('header-fix-moment') > this.element.outerHeight() ? this.element.data('header-fix-moment') : this.element.outerHeight() + 100;
    this.effect = this.element.data('header-fix-effect') ? this.element.data('header-fix-effect') : 'show-hide';

    return this;
  };

  /**
   *
   *
   * @param
   *
   * @return Object
   */
  MyTravelHeaderShowHideObserver.prototype.destroy = function () {
    if (!this.defaultState && $(window).scrollTop() > this.offset) return this;

    this.element.removeClass('u-header--untransitioned');
    this._removeCap();

    return this;
  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  MyTravelHeaderShowHideObserver.prototype._insertCap = function () {

    this.element.addClass('js-header-fix-moment u-header--untransitioned');

    if (this.element.hasClass('u-header--static')) {

      $('html').css('padding-top', this.element.outerHeight());

    }

    switch (this.effect) {
      case 'fade' :
        this.element.addClass('u-header--faded');
        break;

      case 'slide' :
        this.element.addClass('u-header--moved-up');
        break;

      default :
        this.element.addClass('u-header--invisible')
    }

    this.capInserted = true;

  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  MyTravelHeaderShowHideObserver.prototype._removeCap = function () {

    var self = this;

    this.element.removeClass('js-header-fix-moment');

    if (this.element.hasClass('u-header--static')) {

      $('html').css('padding-top', 0);

    }

    if (this.removeCapTimeOutId) clearTimeout(this.removeCapTimeOutId);

    this.removeCapTimeOutId = setTimeout(function () {
      self.element.removeClass('u-header--moved-up u-header--faded u-header--invisible');
    }, 10);

    this.capInserted = false;

  };


  /**
   *
   *
   * @param
   *
   * @return
   */
  MyTravelHeaderShowHideObserver.prototype.check = function () {

    var $w = $(window);

    if ($w.scrollTop() > this.element.outerHeight() && !this.capInserted) {
      this._insertCap();
    }
    else if ($w.scrollTop() <= this.element.outerHeight() && this.capInserted) {
      this._removeCap();
    }

    if ($w.scrollTop() > this.offset && this.defaultState) {
      this.changeState();
    }
    else if ($w.scrollTop() <= this.offset && !this.defaultState) {
      this.toDefaultState();
    }

  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  MyTravelHeaderShowHideObserver.prototype.changeState = function () {

    this.element.removeClass('u-header--untransitioned');

    if (this.animationTimeoutId) clearTimeout(this.animationTimeoutId);

    switch (this.effect) {
      case 'fade' :
        this.element.removeClass('u-header--faded');
        break;

      case 'slide' :
        this.element.removeClass('u-header--moved-up');
        break;

      default:
        this.element.removeClass('u-header--invisible');
    }

    this.defaultState = !this.defaultState;

  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  MyTravelHeaderShowHideObserver.prototype.toDefaultState = function () {

    var self = this;

    this.animationTimeoutId = setTimeout(function () {
      self.element.addClass('u-header--untransitioned');
    }, this.transitionDuration);


    switch (this.effect) {
      case 'fade' :
        this.element.addClass('u-header--faded');
        break;
      case 'slide' :
        this.element.addClass('u-header--moved-up');
        break;
      default:
        this.element.addClass('u-header--invisible');
    }

    this.defaultState = !this.defaultState;

  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  function MyTravelHeaderChangeLogoObserver(element, config) {

    if (!MyTravelAbstractObserver.call(this, element)) return;

    this.config = {
      fixPointSelf: false
    };

    if (config && $.isPlainObject(config)) this.config = $.extend(true, {}, this.config, config);

    this.init();

  }

  /**
   *
   *
   * @param
   *
   * @return
   */
  MyTravelHeaderChangeLogoObserver.prototype.init = function () {

    if (this.element.hasClass('js-header-fix-moment')) {
      this.hasFixedClass = true;
      this.element.removeClass('js-header-fix-moment');
    }
    if (this.config.fixPointSelf) {
      this.offset = this.element.offset().top;
    }
    else {
      this.offset = isFinite(this.element.data('header-fix-moment')) ? this.element.data('header-fix-moment') : 0;
    }
    if (this.hasFixedClass) {
      this.hasFixedClass = false;
      this.element.addClass('js-header-fix-moment');
    }

    this.imgs = this.element.find('.u-header__logo-img');
    this.defaultState = true;

    this.mainLogo = this.imgs.filter('.u-header__logo-img--main');
    this.additionalLogo = this.imgs.not('.u-header__logo-img--main');

    if (!this.imgs.length) return this;

    return this;
  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  MyTravelHeaderChangeLogoObserver.prototype.destroy = function () {
    this.toDefaultState();

    return this;
  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  MyTravelHeaderChangeLogoObserver.prototype.check = function () {

    var $w = $(window);

    if (!this.imgs.length) return this;

    if ($w.scrollTop() > this.offset && this.defaultState) {
      this.changeState();
    }
    else if ($w.scrollTop() <= this.offset && !this.defaultState) {
      this.toDefaultState();
    }

    return this;

  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  MyTravelHeaderChangeLogoObserver.prototype.changeState = function () {

    if (this.mainLogo.length) {
      this.mainLogo.removeClass('u-header__logo-img--main');
    }
    if (this.additionalLogo.length) {
      this.additionalLogo.addClass('u-header__logo-img--main');
    }

    this.defaultState = !this.defaultState;

    return this;
  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  MyTravelHeaderChangeLogoObserver.prototype.toDefaultState = function () {

    if (this.mainLogo.length) {
      this.mainLogo.addClass('u-header__logo-img--main');
    }
    if (this.additionalLogo.length) {
      this.additionalLogo.removeClass('u-header__logo-img--main');
    }

    this.defaultState = !this.defaultState;

    return this;
  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  function MyTravelHeaderHideSectionObserver(element) {
    if (!MyTravelAbstractObserver.call(this, element)) return;

    this.init();
  }

  /**
   *
   *
   * @param
   *
   * @return Object
   */
  MyTravelHeaderHideSectionObserver.prototype.init = function () {

    this.offset = isFinite(this.element.data('header-fix-moment')) ? this.element.data('header-fix-moment') : 5;
    this.section = this.element.find('.u-header__section--hidden');
    this.defaultState = true;

    this.sectionHeight = this.section.length ? this.section.outerHeight() : 0;


    return this;

  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  MyTravelHeaderHideSectionObserver.prototype.destroy = function () {

    if (this.section.length) {

      this.element.css({
        'margin-top': 0
      });

    }

    return this;

  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  MyTravelHeaderHideSectionObserver.prototype.check = function () {

    if (!this.section.length) return this;

    var $w = $(window),
        docScrolled = $w.scrollTop();

    if (docScrolled > this.offset && this.defaultState) {
      this.changeState();
    }
    else if (docScrolled <= this.offset && !this.defaultState) {
      this.toDefaultState();
    }

    return this;

  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  MyTravelHeaderHideSectionObserver.prototype.changeState = function () {

    var self = this;

    this.element.stop().animate({
      'margin-top': self.sectionHeight * -1 - 1 // last '-1' is a small fix
    });

    this.defaultState = !this.defaultState;
    return this;

  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  MyTravelHeaderHideSectionObserver.prototype.toDefaultState = function () {

    this.element.stop().animate({
      'margin-top': 0
    });

    this.defaultState = !this.defaultState;
    return this;

  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  function MyTravelHeaderChangeAppearanceObserver(element, config) {
    if (!MyTravelAbstractObserver.call(this, element)) return;

    this.config = {
      fixPointSelf: false
    };

    if (config && $.isPlainObject(config)) this.config = $.extend(true, {}, this.config, config);

    this.init();
  }

  /**
   *
   *
   * @param
   *
   * @return
   */
  MyTravelHeaderChangeAppearanceObserver.prototype.init = function () {

    if (this.element.hasClass('js-header-fix-moment')) {
      this.hasFixedClass = true;
      this.element.removeClass('js-header-fix-moment');
    }

    if (this.config.fixPointSelf) {
      this.offset = this.element.offset().top;
    }
    else {
      this.offset = isFinite(this.element.data('header-fix-moment')) ? this.element.data('header-fix-moment') : 5;
    }

    if (this.hasFixedClass) {
      this.hasFixedClass = false;
      this.element.addClass('js-header-fix-moment');
    }

    this.sections = this.element.find('[data-header-fix-moment-classes]');

    this.defaultState = true;


    return this;

  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  MyTravelHeaderChangeAppearanceObserver.prototype.destroy = function () {

    this.toDefaultState();

    return this;

  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  MyTravelHeaderChangeAppearanceObserver.prototype.check = function () {

    if (!this.sections.length) return this;

    var $w = $(window),
        docScrolled = $w.scrollTop();

    if (docScrolled > this.offset && this.defaultState) {
      this.changeState();
    }
    else if (docScrolled <= this.offset && !this.defaultState) {
      this.toDefaultState();
    }

    return this;

  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  MyTravelHeaderChangeAppearanceObserver.prototype.changeState = function () {

    this.sections.each(function (i, el) {

      var $this = $(el),
          classes = $this.data('header-fix-moment-classes'),
          exclude = $this.data('header-fix-moment-exclude');

      if (!classes && !exclude) return;

      $this.addClass(classes + ' js-header-change-moment');
      $this.removeClass(exclude);

    });

    this.defaultState = !this.defaultState;
    return this;

  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  MyTravelHeaderChangeAppearanceObserver.prototype.toDefaultState = function () {

    this.sections.each(function (i, el) {

      var $this = $(el),
          classes = $this.data('header-fix-moment-classes'),
          exclude = $this.data('header-fix-moment-exclude');

      if (!classes && !exclude) return;

      $this.removeClass(classes + ' js-header-change-moment');
      $this.addClass(exclude);

    });

    this.defaultState = !this.defaultState;
    return this;

  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  function MyTravelHeaderHasHiddenElement(element, config) {
    if (!MyTravelAbstractObserver.call(this, element)) return;

    this.config = {
      animated: true
    };

    if (config && $.isPlainObject(config)) this.config = $.extend(true, {}, this.config, config);

    this.init();
  }

  /**
   *
   *
   * @param
   *
   * @return
   */
  MyTravelHeaderHasHiddenElement.prototype.init = function () {
    this.offset = isFinite(this.element.data('header-fix-moment')) ? this.element.data('header-fix-moment') : 5;
    this.elements = this.element.find('.u-header--hidden-element');
    this.defaultState = true;
    return this;
  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  MyTravelHeaderHasHiddenElement.prototype.destroy = function () {

    this.toDefaultState();

    return this;

  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  MyTravelHeaderHasHiddenElement.prototype.check = function () {

    if (!this.elements.length) return this;

    var $w = $(window),
        docScrolled = $w.scrollTop();

    if (docScrolled > this.offset && this.defaultState) {
      this.changeState();
    }
    else if (docScrolled <= this.offset && !this.defaultState) {
      this.toDefaultState();
    }

    return this;

  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  MyTravelHeaderHasHiddenElement.prototype.changeState = function () {

    if (this.config.animated) {
      this.elements.stop().slideUp();
    }
    else {
      this.elements.hide();
    }

    this.defaultState = !this.defaultState;
    return this;

  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  MyTravelHeaderHasHiddenElement.prototype.toDefaultState = function () {

    if (this.config.animated) {
      this.elements.stop().slideDown();
    }
    else {
      this.elements.show();
    }

    this.defaultState = !this.defaultState;
    return this;

  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  function MyTravelHeaderFloatingObserver(element, config) {
    if (!MyTravelAbstractObserver.call(this, element)) return;

    this.config = config && $.isPlainObject(config) ? $.extend(true, {}, this.config, config) : {};
    this.init();
  }

  /**
   *
   *
   * @param
   *
   * @return
   */
  MyTravelHeaderFloatingObserver.prototype.init = function () {

    this.offset = this.element.offset().top;
    this.sections = this.element.find('.u-header__section');

    this.defaultState = true;

    return this;

  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  MyTravelHeaderFloatingObserver.prototype.destroy = function () {

    this.toDefaultState();

    return this;

  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  MyTravelHeaderFloatingObserver.prototype.check = function () {

    var $w = $(window),
        docScrolled = $w.scrollTop();

    if (docScrolled > this.offset && this.defaultState) {
      this.changeState();
    }
    else if (docScrolled <= this.offset && !this.defaultState) {
      this.toDefaultState();
    }

    return this;

  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  MyTravelHeaderFloatingObserver.prototype.changeState = function () {

    this.element
        .addClass('js-header-fix-moment')
        .addClass(this.element.data('header-fix-moment-classes'))
        .removeClass(this.element.data('header-fix-moment-exclude'));

    if (this.sections.length) {
      this.sections.each(function (i, el) {

        var $section = $(el);

        $section.addClass($section.data('header-fix-moment-classes'))
            .removeClass($section.data('header-fix-moment-exclude'));

      });
    }

    this.defaultState = !this.defaultState;
    return this;

  };

  /**
   *
   *
   * @param
   *
   * @return
   */
  MyTravelHeaderFloatingObserver.prototype.toDefaultState = function () {

    this.element
        .removeClass('js-header-fix-moment')
        .removeClass(this.element.data('header-fix-moment-classes'))
        .addClass(this.element.data('header-fix-moment-exclude'));

    if (this.sections.length) {
      this.sections.each(function (i, el) {

        var $section = $(el);

        $section.removeClass($section.data('header-fix-moment-classes'))
            .addClass($section.data('header-fix-moment-exclude'));

      });
    }

    this.defaultState = !this.defaultState;
    return this;

  };


  /**
   *
   *
   * @param
   *
   * @return
   */
  function MyTravelHeaderWithoutBehaviorObserver(element) {
    if (!MyTravelAbstractObserver.call(this, element)) return;
  }

  MyTravelHeaderWithoutBehaviorObserver.prototype.check = function () {
    return this;
  };

  MyTravelHeaderWithoutBehaviorObserver.prototype.init = function () {
    return this;
  };

  MyTravelHeaderWithoutBehaviorObserver.prototype.destroy = function () {
    return this;
  };

  MyTravelHeaderWithoutBehaviorObserver.prototype.changeState = function () {
    return this;
  };

  MyTravelHeaderWithoutBehaviorObserver.prototype.toDefaultState = function () {
    return this;
  }


})(jQuery);