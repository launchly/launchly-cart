/* Cart Event: cart.paypal.confirm.success */

jQuery(cart).on('cart.paypal.confirm.success', function(event, data) { 
	jQuery('#paypal-express-confirmation').hide();
	jQuery(cart).trigger('cart.payment.success', data);
});
