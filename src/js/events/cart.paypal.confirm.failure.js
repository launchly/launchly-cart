/* global cart */

jQuery(cart).on('cart.paypal.confirm.failure', function(event, data) { 
	data['has_paypal'] = true;
	jQuery(cart).trigger('cart.payment.failure', data);
});
