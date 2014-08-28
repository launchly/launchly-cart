/* Cart Event: cart.price */

jQuery(cart).on('cart.price', function(event, price_check) { 
	
	var price = price_check.formatted_price;
	var formatted_original_selling_price = price_check.formatted_original_selling_price;
	
	jQuery('#item_' + price_check.item_id + '_price').html(price);
	if (price_check.has_original_selling_price === true) {
		jQuery('#item_' + price_check.item_id + '_was_price').html("Was <del>" + formatted_original_selling_price + "</del>");
	} else {
		jQuery('#item_' + price_check.item_id + '_was_price').html("&nbsp;");
	}
});
