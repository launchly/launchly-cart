/* Cart Event: cart.empty */

jQuery(cart).on('cart.empty', function() { 
	if (typeof ga !== 'undefined') {
		ga('ec:setAction', 'empty');
		ga('send', 'event', 'UX', 'click', 'empty cart');
	}
});
