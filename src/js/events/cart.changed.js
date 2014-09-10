/* global cart */

jQuery(cart).on('cart.changed', function(event, current_cart) { 

	var currentYear = (new Date()).getFullYear();
	current_cart.expiry_years = [];

	for (var i=0; i<=10; i++) {
		current_cart.expiry_years.push(currentYear + i);
	}
	
	current_cart['can_pay_later'] = cart.can_pay_later;
	current_cart['enable_instructions_to_seller'] = cart.enable_instructions_to_seller;
	
	current_cart.stripe_icon = cart.stripe_icon;

	jQuery('#cart-contact-details-container').html(cart.cached_template('cart_contact_details', current_cart) );
	jQuery('#cart-payment-container').html(cart.cached_template('cart_payment', current_cart) );

	jQuery('#shopping-cart').html(cart.cached_template('shopping_cart', current_cart));
	cart.populate_states(jQuery('#billing_country'), 'billing', current_cart.billing_state);
	jQuery('.cart-checkout').html(cart.cached_template('cart_checkout', current_cart));
	
	if (jQuery('#instructions_to_seller').length > 0) {

		if (jQuery('#instructions_to_seller').val().length > 0) {
			jQuery('#instructions_to_seller').removeClass('hidden');
		} else {
			jQuery('#instructions-to-seller').removeClass('hidden');
		}
	}
	
	jQuery('#instructions-to-seller').unbind('click').bind('click', function(event) {
		event.preventDefault();
		jQuery(this).addClass('hidden');
		jQuery('#instructions_to_seller').removeClass('hidden');
		jQuery('#instructions_to_seller').focus();
	});
});
