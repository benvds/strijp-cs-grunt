// Slider
(function ($) {
    'use strict';

    var Slider = function(element) {
        this.$slider = $(element);
        this.$left = this.$slider.children('.slider-left');
        this.$right = this.$slider.children('.slider-right');
        this.$content = this.$slider.find('.slider-content');
        this.$inner = this.$content.children('.slider-inner');
        this.$sliderGroups = this.$content.find('.slider-group');
        this.init();
    };
    Slider.prototype = {
        init: function() {
            var that = this;

            this.setContentWidth();
            this.setHeights();

            this.$left.on('click', function(event) {
                that.showPrevGroup();
            });
            this.$right.on('click', function(event) {
                that.showNextGroup();
            });
        },

        setContentWidth: function() {
            var totalWidth = 0,
                leftWidth = this.$left.outerWidth(),
                rightWidth = this.$right.outerWidth();

            this.$sliderGroups.each(function() {
                totalWidth += $(this).outerWidth();
            });

            this.$inner.width(totalWidth + leftWidth + rightWidth);
        },

        setHeights: function() {
            this.$slider.children().height(this.$content.outerHeight());
        },

        contentOffsetLeft: function() {
            return this.$content.offset().left;
        },

        innerMarginLeft: function() {
            return parseInt(this.$inner.css('marginLeft'), 10);
        },

        prevFilter: function(sliderGroup) {
            return $(sliderGroup).offset().left < this.contentOffsetLeft();
        },

        showPrevGroup: function(event) {
            var that = this,
                prev = _.last(_.filter(this.$sliderGroups,
                                       _.bind(this.prevFilter, this))),
                diff;

            if (prev) {
                diff = $(prev).position().left - that.contentOffsetLeft();
                this.$inner.css('marginLeft',
                                that.innerMarginLeft() + (-1 * diff));
            }
        },

        showNextGroup: function(event) {
            var that = this,
                next = _.find(this.$sliderGroups, function(sliderGroup) {
                    return $(sliderGroup).offset().left > that.contentOffsetLeft();
                });

            if (next) {
                this.$inner.css('marginLeft', that.innerMarginLeft() +
                    (-1 * $(next).offset().left + that.contentOffsetLeft()));
            }
        }
    };

    // document load
    $(function() {
        $('.slider').each(function() {
            new Slider(this);
        });
    });

})(jQuery);
