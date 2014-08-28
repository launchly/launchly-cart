/* Cart Event: cart.paypal.cancel.success */

jQuery(cart).on('cart.paypal.cancel.success', function() { 
	window.alert('You have not been charged.');
	window.location = '/';
});

