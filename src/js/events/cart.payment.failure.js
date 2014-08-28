/* global cart */

jQuery(cart).on('cart.payment.failure', function(event, data) { 
	jQuery('#cart-payment').modal('hide');	
	jQuery('#cart-payment-processing-placeholder').modal('hide');
	jQuery('#cart-payment-failure-container').html(cart.cached['cart_payment_failure'](data));
	jQuery('#cart-payment-failure-placeholder').modal({ backdrop: false });
});
