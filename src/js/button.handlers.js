/* global cart */


/*
 *
 * Button Handlers ...
 *
 */

/* cart function handlers */
jQuery(document).on('click', '*[data-cart-function]', function(event) { 
	event.preventDefault();
	cart.do(jQuery(this));
});

/* screen display handlers */	
jQuery(document).on('click', '*[data-cart-screen]', function(event) { 

	event.preventDefault();		
	
	var cartScreen = jQuery(this).data('cart-screen');
	
	if (cartScreen === 'payment') {
		jQuery('#cart-payment-failure-placeholder').modal('hide');
		
		var text = jQuery('a[data-cart-function="pay"]').data('text');
		jQuery('a[data-cart-function="pay"]').text(text);
	}
	
	jQuery('#cart-' + cartScreen).modal({ backdrop: false }); 
});

/* on variant or quantity change, update price */
jQuery(document).on('change', 'select[data-cart-variant]', function(event) { 
	event.preventDefault();
	cart.price(jQuery(this));
});

jQuery(document).on('keyup', 'input[data-cart-quantity]', function(event) { 
	event.preventDefault();
	cart.price(jQuery(this));
});

jQuery('#store-side').on('changed', function() {
	jQuery('#store-inner').css('height', jQuery(window).height() - 140);		
});

/* on country dropdown change, show/hide state dropdown */
jQuery(document).on('change', '#billing_country', function() { cart.populate_states(jQuery(this), 'billing'); });

/* fade in/out cvv icon */
jQuery(document).on('focus', '#card_verification', function() { jQuery('#cvv-icon').fadeTo('fast', 1); });	
jQuery(document).on('blur', '#card_verification', function() { jQuery('#cvv-icon').fadeTo('fast', 0.2); });

/* changing card number must change payment type */
jQuery(document).on('change', '#card_number', function() { cart.select_payment_type(cart.payment_type_from_number(jQuery('#card_number').val())); });

/* manually selecting a payment type */
jQuery(document).on('click', '.payment-icon', function() { cart.select_payment_type(jQuery(this).data('type')); });

jQuery(document).on('click', '#customButton', function(event) {
	var btn = jQuery(this);
	var btnText = btn.text();
	btn.text('Loading').attr('disabled', 'disabled');
	
	var handler = StripeCheckout.configure({
		key: jQuery(this).data('key'),
		image: jQuery(this).data('image'),
		token: function(token, args) {
			// Use the token to create the charge with a server-side script.
			cart.stripe_pay(token, args);
		},
		opened: function() {
			btn.text(btnText).removeAttr('disabled');
		},
		closed: function() {
			btn.text(btnText).removeAttr('disabled');
		}
	});
	
	handler.open({
		name: jQuery(this).data('name'),
		description: jQuery(this).data('description'),
		amount: jQuery(this).data('amount'),
		email: jQuery(this).data('email'),
		currency: jQuery(this).data('currency')
		});
	
	event.preventDefault();
});

jQuery(document).on('click', '.show-hide-cart', function(event) {
	event.preventDefault();
	jQuery('#shopping-cart').toggleClass('cbp-spmenu-open');
});
