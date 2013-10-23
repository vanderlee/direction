/*jslint devel: true, bitwise: true, regexp: true, browser: true, confusion: true, unparam: true, eqeq: true, white: true, nomen: true, plusplus: true, maxerr: 50, indent: 4 */
/*globals jQuery */

/*!
 * Direction
 *
 * Copyright (c) 2013 Martijn W. van der Lee
 * Licensed under the MIT license.
 */
/* Simple direction/alignment control, displaying a 3x3 grid
 */

;(function($, undefined) {
	"use strict";

	$.direction = new function() {
		this.styles = {
		'carat':		{	'c':	'ui-icon-radio-on',
							'n':	'ui-icon-carat-1-n',
							'e':	'ui-icon-carat-1-e',
							's':	'ui-icon-carat-1-s',
							'w':	'ui-icon-carat-1-w',
							'nw':	'ui-icon-carat-1-nw',
							'ne':	'ui-icon-carat-1-ne',
							'sw':	'ui-icon-carat-1-sw',
							'se':	'ui-icon-carat-1-se'
						},
		'triangle':		{	'c':	'ui-icon-bullet',
							'n':	'ui-icon-triangle-1-n',
							'e':	'ui-icon-triangle-1-e',
							's':	'ui-icon-triangle-1-s',
							'w':	'ui-icon-triangle-1-w',
							'nw':	'ui-icon-triangle-1-nw',
							'ne':	'ui-icon-triangle-1-ne',
							'sw':	'ui-icon-triangle-1-sw',
							'se':	'ui-icon-triangle-1-se'
						},
		'arrow':		{	'c':	'ui-icon-arrow-4',
							'n':	'ui-icon-arrow-1-n',
							'e':	'ui-icon-arrow-1-e',
							's':	'ui-icon-arrow-1-s',
							'w':	'ui-icon-arrow-1-w',
							'nw':	'ui-icon-arrow-1-nw',
							'ne':	'ui-icon-arrow-1-ne',
							'sw':	'ui-icon-arrow-1-sw',
							'se':	'ui-icon-arrow-1-se'
						},
		'arrowthick':	{	'c':	'ui-icon-icon-plus',
							'n':	'ui-icon-arrowthick-1-n',
							'e':	'ui-icon-arrowthick-1-e',
							's':	'ui-icon-arrowthick-1-s',
							'w':	'ui-icon-arrowthick-1-w',
							'nw':	'ui-icon-arrowthick-1-nw',
							'ne':	'ui-icon-arrowthick-1-ne',
							'sw':	'ui-icon-arrowthick-1-sw',
							'se':	'ui-icon-arrowthick-1-se'
						},
		'edgethick':	{	'c':	'ui-icon-radio-on',
							'n':	'ui-icon-arrowthickstop-1-n',
							'e':	'ui-icon-arrowthickstop-1-e',
							's':	'ui-icon-arrowthickstop-1-s',
							'w':	'ui-icon-arrowthickstop-1-w',
							'nw':	'ui-icon-carat-1-nw',
							'ne':	'ui-icon-carat-1-ne',
							'sw':	'ui-icon-carat-1-sw',
							'se':	'ui-icon-carat-1-se'
						}
	};
	}();
	
    $.widget("vanderlee.direction", {
		options: {
			disable:	null,	// array of directions to appear disabled
			hide:		null,	// array of directions to be hidden from view
			style:		null,	// 'carat', 'triangle', 'arrow', 'arrowthick' or an object
            values:		null	// object with values to match directions
        },
        
        _create: function () {
			var that = this,
				val;

            that.element.hide();

            that.widgetEventPrefix	= 'direction';
            that.buttons			= that._generate();
            
            $('.ui-button.ui-state-default', that.buttons).click(function() {
                $('.ui-state-active', that.buttons).not(this).removeClass('ui-state-active');
                $(this).toggleClass('ui-state-active');
                
				val = $(this).is('.ui-state-active') ? that._getVal($(this).data('value')) : '';
				if (that.element.val() !== val) {
					that.element.val('');
					that.element.change();
				}
            });


            return that;
        },
        
        _getVal: function(value) {
            return (this.options.values && (typeof this.options.values[value] !== 'undefined')) ? this.options.values[value] : value;
        },
        
        _find: function(value, array) {
            var result = -1;
            $.each(array, function(k, v) {
                if (v === value) {
                    result = k;
                    return false;
                }
            });
            return result;
        },
        
        _generate_row: function(items) {
            var that	= this,
                val		= that.element.val(),
                index	= that.options.values ? that._find(val, that.options.values) : -1,
                //index	= that.options.values ? that._find(val, that.options.values) : -1,
                value	= index !== -1 ? index : val,
				style	= $.isPlainObject(that.options.style)? that.options.style
						: that.options.style && $.direction.styles[that.options.style] ? $.direction.styles[that.options.style]
						: $.direction.styles['arrow'],
				html	= '',
				hidden	= 0,
				state;

            $.each(items, function() {
				if (that.options.hide && $.inArray(this, that.options.hide) >= 0) {
					++hidden;
					html += '<span style="display:table-cell" class="ui-direction-hidden"/>';
				} else {
					state = that.options.disable && $.inArray(this, that.options.disable) >= 0 ? 'ui-state-disabled' : 'ui-state-default';
					html += '<span style="display:table-cell" class="ui-direction-button ui-button '+state+' ui-corner-all '+(this === value ? 'ui-state-active' : '')+'" data-value="'+this+'">'
						+'<span class="ui-icon '+style[this]+'"/>'
						+'</span>';
				}
            });

            return hidden >= items.length ? '' : '<span style="display:table-row">'+html+'</span>';
        },
        
        _generate: function() {
			return $(	'<span style="display:inline-block;" class="ui-direction">'
					+	this._generate_row(['nw', 'n', 'ne'])
					+	this._generate_row(['w', 'c', 'e'])
					+	this._generate_row(['sw', 's', 'se'])
					+	'</span>').insertAfter(this.element);
        }
    });
}(jQuery));