/* global cart */

jQuery(cart).on('cart.ready', function() {
	cart.get();
});
