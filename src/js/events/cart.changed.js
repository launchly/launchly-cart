/* global cart */

jQuery(cart).on('cart.changed', function(event, current_cart) { 

	var currentYear = (new Date()).getFullYear();
	current_cart.expiry_years = [];

	for (var i=0; i<=10; i++) {
		current_cart.expiry_years.push(currentYear + i);
	}
	
	current_cart['can_pay_later'] = cart.canPayLater;
	
	current_cart.account_organisation = cart.account_organisation;
	current_cart.user_email = cart.user_email;
	current_cart.stripe_key = cart.stripe_key;

	jQuery('#cart-contact-details-container').html(cart.cached_template('cart_contact_details', current_cart) );
	jQuery('#cart-payment-container').html(cart.cached_template('cart_payment', current_cart) );
	jQuery('#store-side').html(cart.cached_template('shopping_cart', current_cart));
	cart.populate_states(jQuery('#billing_country'), 'billing', current_cart.billing_state);
	jQuery('.cart-checkout').html(cart.cached_template('cart_checkout', current_cart));
});