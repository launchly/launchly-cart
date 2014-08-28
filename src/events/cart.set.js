/* Cart Event: cart.set */

jQuery(cart).on('cart.set', function() {
	var cart_panel = jQuery('#shopping-cart');
	if (!cart_panel.hasClass('cbp-spmenu-open')) {
		cart_panel.addClass('cbp-spmenu-open'); 
	}
});
