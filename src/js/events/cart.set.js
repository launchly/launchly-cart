/* global cart */

jQuery(cart).on('cart.set', function() {
	jQuery('#shopping-cart').toggleClass('sc-menu-open');
});
