/* global cart */

jQuery(cart).on('cart.on_account.success', function(event, data) {
	jQuery(cart).trigger('cart.payment.success', data);
});
