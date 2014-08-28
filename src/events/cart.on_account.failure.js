/* Cart Event: cart.on_account.failure */

jQuery(cart).on('cart.on_account.failure', function(event, data) {
	jQuery(cart).trigger('cart.payment.failure', data);
});