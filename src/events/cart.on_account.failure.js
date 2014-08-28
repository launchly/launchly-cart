/* global cart */

jQuery(cart).on('cart.on_account.failure', function(event, data) {
	jQuery(cart).trigger('cart.payment.failure', data);
});