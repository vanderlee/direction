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

    $.widget("vanderlee.direction", {
		options: {
            values: {}
        },
        
        _create: function () {
			var that = this,
				val;

            that.widgetEventPrefix = 'direction';

            that.element.hide();
            
            that.buttons = that._generate();
            
            $('.ui-button', that.buttons).click(function() {
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
            return typeof this.options.values[value] === 'undefined' ? value : this.options.values[value];
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
            var that = this,
                val = that.element.val(),
                index = that._find(val, that.options.values),
                value = index !== -1 ? index : val,
                row = $('<div/>');
            
            $.each(items, function() {							
                $('<span class="ui-button ui-state-default ui-corner-all '+(this === value ? 'ui-state-active' : '')+'" data-value="'+this+'"/>')
					.html('<span class="ui-icon '+(this === 'c' ? 'ui-icon-arrow-4' : 'ui-icon-arrow-1-' + this)+'"/>')
					.appendTo(row);				
            });
                
            return row;
        },
        
        _generate: function() {
            var table = $('<div/>').insertAfter(this.element);
                
            this._generate_row(['nw', 'n', 'ne']).appendTo(table);            
            this._generate_row(['w', 'c', 'e']).appendTo(table);            
            this._generate_row(['sw', 's', 'se']).appendTo(table);
            return table;
        }
    });
}(jQuery));