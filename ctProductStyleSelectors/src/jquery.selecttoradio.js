/*
 *  jquery-selectToRadio - v4.0.0
 *  http://jqueryselectToRadio.com
 *
 *  Made by Andy Davies
 *  Under MIT License
 */
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;( function( $, window, document, undefined ) {

	"use strict";

		// undefined is used here as the undefined global variable in ECMAScript 3 is
		// mutable (ie. it can be changed by someone else). undefined isn't really being
		// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
		// can no longer be modified.

		// window and document are passed through as local variable rather than global
		// as this (slightly) quickens the resolution process and can be more efficiently
		// minified (especially when both are regularly referenced in your plugin).

		// Create the defaults once
		var pluginName = "productStyle",
			defaults = {
				productStyle: 			"nostyle",
				spaceAlt: 					"_",
				showItemImg: 				false
			};

		//additional Private Functions
		var stockInOut = function(element) {
			console.log('stockInOut');
			var concat = '';
			$('.oos').removeClass('oos');
			$('.is').removeClass('is');
			/* create an array of checked style values */
			var checked_styles = [];
			$('.ct_pd_options_style :radio:checked, .ct_pd_options_style :selected').each(function() {
				var item = $(this).attr('value');
				checked_styles.push($(this).attr('value'));
			});
			concat = checked_styles.join('_');

			/* Find out if there is an item for these styles  */
			/* Show the no styles warning if there are no items for the selected styles */
			if (!$('#'+concat).length) {
				$('#ct_pd_noStyle').show();
			} else {
				$('#ct_pd_noStyle').hide();
			}
			/* Find All out of stock items */	
			$('.ct_pd_item_availability_out.ct_pd_item_value').each(function() {
				/*Create an array of the style values for that item*/	
				var out_of_stock_item = $(this).parent().attr('id').split('_');
				/* Find the difference between the checked styles and the out of stock item*/
				//var out_of_stock_style = out_of_stock_item.diff(checked_styles);
				var out_of_stock_style = $(out_of_stock_item).not(checked_styles).get();

				if (out_of_stock_style.length == 1) { //Only make this style "out of stock"
					$('input[value=' + out_of_stock_style[0] + ']').parent().addClass('oos');
					$('option[value=' + out_of_stock_style[0] + ']').addClass('oos');
				} else if (out_of_stock_style.length == 0){ //Make all checked values "out of stock"
					for(var i = out_of_stock_item.length - 1; i >= 0; i--) {
						$('input[value=' + out_of_stock_item[i] + ']').parent().addClass('oos');
						$('option[value=' + out_of_stock_item[i] + ']').addClass('oos');	
					}
				}

			});

			// Find All in stock items
			$('.ct_pd_item_availability_in.ct_pd_item_value').each(function() {
				//Create an array of the style values for that item
				var in_stock_item = $(this).parent().attr('id').split('_');
				// Find the difference between the checked styles and the in stock item
				//var in_stock_style = in_stock_item.diff(checked_styles);
				var in_stock_style = $(in_stock_item).not(checked_styles).get();
				//var in_stock_style = 1;
				if (in_stock_style.length == 1) { //Only make this style "out of stock"
					$('input[value=' + in_stock_style[0] + ']').parent().addClass('is');
					$('option[value=' + in_stock_style[0] + ']').addClass('is');
				} else if (in_stock_style.length == 0){ //Make all checked values "in stock"
					for(var i = in_stock_item.length - 1; i >= 0; i--) {
						$('input[value=' + in_stock_item[i] + ']').parent().addClass('is');
						$('option[value=' + in_stock_item[i] + ']').addClass('is');		
					}
				}

			});	

			return concat;		
		};

		var currentStyles = function() {
			console.log('currentStyles');
			$('.current-style').remove();
			$('.ct_pd_options_style :radio:checked').each(function() {	
				var current_style = ($(this).siblings('label').text());
				$(this).parent().parent().children('label').append('<span class="current-style">' + current_style + '</span>');
			});
		};

		var	showSelectedItem = function(concat) {
			console.log('showSelectedItem');
			$('.ct_pd_item').hide();
			$('#'+concat).fadeIn( 'slow');
		};				


		// The actual plugin constructor
		function Plugin ( element, options ) {
			this.element = element;

			// jQuery has an extend method which merges the contents of two or
			// more objects, storing the result in the first object. The first object
			// is generally empty as we don't want to alter the default options for
			// future instances of the plugin
			this.settings = $.extend( {}, defaults, options );
			this._defaults = defaults;
			this._name = pluginName;
			this.init();
		}

		// Avoid Plugin.prototype conflicts
		$.extend( Plugin.prototype, {
			init: function() {
				// Place initialization logic here
				// You already have access to the DOM element and
				// the options via the instance, e.g. this.element
				// and this.settings
				// you can add more functions like the one below and
				// call them like the example bellow
				//this.yourOtherFunction( "jQuery selectToRadio" );
				if($('#ct_pd_itemList').length) {
					this.underscoreLabel();
					this.makeRadios();
					if (this.settings.showItemImg) {
						this.showItemImage();
					}
					var concat = stockInOut.call(this);
					currentStyles.call(this);
					showSelectedItem.call(this, concat);
					this.clickStyle();
				}
			},
			underscoreLabel: function() {
				console.log('underscoreLabel');
				var text = $( this.element ).siblings('label').text().replace(' ', this.settings.spaceAlt);
				var $select = $( this.element);
				$select.siblings('label').text(text);	//Don't do this! Just for visual purposes			
			},
			makeRadios: function() {
				console.log('makeRadios');
				var $select = $( this.element);
				var prodStyle = this.settings.productStyle;
				//var thisStyles = prodStyles[prodStyle];
				$select.find('option').each(function() {
					var $option = $(this);
					var $radio = $('<input type="radio" />');
					if ($(this).val() > 0) {
						var $divwrap = $('<div />').addClass($select.attr('name') + $option.attr('value'));
		        $radio.attr('name', $select.attr('name')).attr('value', $option.val()).attr('id', $select.attr('name') + $option.val());
		        //$radio.attr('name', $select.attr('name')).attr('id', $option.val());
		        // Set checked if the option was selected
		        if ($option.attr('selected')) $radio.attr('checked', 'checked');

		        // Insert radio before select box:
		        $select.before($divwrap);
		        $divwrap.append($radio);
		        var i = 0, strLength = $option.text().length;
						for(i; i < strLength; i++) { 
							$option.text($option.text().replace(" ", ""));
						}
		        $divwrap.append($("<label />").attr('for', $select.attr('name') + $option.attr('value')).text($option.text()).addClass($option.text().toLowerCase()));						

		        var opttext = $.trim($option.text());
		        if (prodStyle !== 'nostyle') {
							var bg = prodStyles[prodStyle][opttext];
		          if (bg === undefined || bg == '') {
		            bg = 'url(/webbuild/layout/no-colour.jpg) no-repeat center center transparent';
		          } else if (bg.substring(0,6) == 'itembg') {
		            bg = 'url(/' + bg + ') no-repeat center center transparent';
		          }
		          $divwrap.addClass('hidden');
          		$divwrap.find('label').prepend($('<span style="background: '+bg+'"></span>'));		        	
		        }

					}
				});
				$select.remove();
			},
			showItemImage: function() {
				console.log('showItemImage');
				if($('.ct_pd_item:visible .product_prev img').length) {
					$('.displayer').attr('src', $('.ct_pd_item:visible .product_prev img').attr('src').replace('.thumb.', '.')).fadeIn('slow');
				}				
			},
			clickStyle: function() {
				$( ".ct_pd_options_style input").click(function() {
					console.log('clickStyle Clicked');
					$(this).attr('checked', 'checked');
					var concat = stockInOut.call(this);
					currentStyles.call(this);
					showSelectedItem.call(this, concat);
				});
				$( ".ct_pd_options_style select").change(function() {
					console.log('clickStyle Selected');
					$(this).attr('selected', 'selected');
					var concat = stockInOut.call(this);
					currentStyles.call(this);
					showSelectedItem.call(this, concat);
				});
			}			

		} );

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function( options ) {
			return this.each( function() {
				if ( !$.data( this, "plugin_" + pluginName ) ) {
					$.data( this, "plugin_" +
						pluginName, new Plugin( this, options ) );
				}
			} );
		};

} )( jQuery, window, document );
