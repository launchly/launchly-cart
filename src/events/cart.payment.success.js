/* Cart Event: cart.payment.success */	

jQuery(cart).on('cart.payment.success', function(event, data) {
	jQuery('#cart-payment').modal('hide');	
	jQuery('#cart-payment-processing-placeholder').modal('hide');
	jQuery('#cart-payment-success-container').html(cart.cached['cart_payment_failure'](data));
	jQuery('#cart-payment-success-placeholder').modal({ backdrop: false });
	cart.get();
	cart.track_order(data);
});