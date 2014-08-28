/*
 * launchly-cart
 * https://github.com/craig/launchly-cart
 *
 * Copyright (c) 2013 Craig Sullivan
 * Licensed under the MIT license.
 */

/* List of cart methods
 * ------------
 *
 * add            
 * dec            
 * empty          
 * get 
 * update 
 * inc                    
 * remove                 
 * set                    
 * on_account
 * pay                    
 * paypal
 * paypal_confirm_purchase
 * paypal_cancel_purchase
 * payment_type_from_number
 *
 * List of cart events
 * ------------
 *
 * cart.changed           the contents of the shopping cart has changed
 * cart.recieved          a new cart has been downloaded
 * cart.payment.success   the order was successfully paid for
 * cart.payment.failure   the payment was rejected and the order was not submitted
 * cart.price             a price check has been retrieved
 * cart.on_account.success	the order was successfully submitted, but not paid for
 * cart.on_account.failure	the order was rejected and the order was not submitted
 *
 */

cart = {
	
	billingCountry: '',
	billingState: '',

	/* do a particular cart function */
	do: function(element) {		
		cart[element.data('cart-function')](element);		
	},

	dec: function(element) {
		$.post("/__/cart/inc.json", cart.variant_data(element), function(data) {
			$(cart).trigger('cart.changed', [data]);
			$(cart).trigger('cart.dec', [data]);
		});
	},

	/* empty the shopping cart */
	empty: function(element) {
		$.get("/__/cart/empty.json", { authenticity_token: rails_authenticity_token }, function(data) {
			$(cart).trigger('cart.changed', [data]);
			$(cart).trigger('cart.empty', [data]);
		});
	},

	/* get the current shopping cart */
	get: function(element) {
		$.get("/__/cart.json", { authenticity_token: rails_authenticity_token }, function(data) { 
			$(cart).trigger('cart.changed', [data]);
			$(cart).trigger('cart.get', [data]);
		});
	},

	/* increment an item in the cart */
	inc: function(element) {
		$.post("/__/cart/inc.json", cart.variant_data(element), function(data) {
			$(cart).trigger('cart.changed', [data]);
			$(cart).trigger('cart.inc', [data]);
		});
	},

	/* set the quantity for an item in the cart */
	set: function(element) {
		$.post("/__/cart/set.json", cart.variant_data(element), function(data) {
			$(cart).trigger('cart.changed', [data]);
			$(cart).trigger('cart.set', [data]);
		});
	},

	/* extract the item id for an element */
	item_id: function(element) {
		return element.data('item');
	},

	/* extract the selected variant id for an item */
	variant_id: function(item_id) {

		variant_id = $('#v_' + item_id + ' :selected').val();

		if (typeof variant_id == "undefined") {
			variant_id = $('#v_' + item_id).val();
		}

		return variant_id;
	},
	
	/* get the selected quantity for a given item */
	qty: function(item_id) {
		return $('#q_' + item_id).val();
	},

	variant_data: function(element) {

		i_id = cart.item_id(element);
		v_id = cart.variant_id(i_id);
		qty = cart.qty(i_id);

		data = {
			'authenticity_token': rails_authenticity_token,
			'v': []
		};

		data['v'].push(v_id);
		data['q_' + v_id] = qty;

		return data;
	},
	
	/* pay for an order */
	pay: function() {

		var request = $.ajax({
			type: "POST",
			url: "{{ '/__/pay/cart.json' | secure_url }}",
			data: {
				'_launch_ly_session': $('#session_id').val(),
				'reference': $('#cart_reference').val(),
				'first_name': $('#card_first_name').val(),
				'last_name': $('#card_last_name').val(),
				'card_number': $('#card_number').val(),
				'payment_type': $('#payment_type').val(),
				'expires_month': $('#card_expires_month').val(),
				'expires_year': $('#card_expires_year').val(),
				'card_verification': $('#card_verification').val()
			}
		});
		
		this.setup_callbacks(request, 'payment');

	},

	/* pay via paypal express */
	paypal: function(element) {
		
		var request = $.ajax({
			type: "POST",
			url: "{{ '/__/pay/paypal.json' | secure_url }}",
			data: {
				'_launch_ly_session': $('#session_id').val(),
				'reference': $('#cart_reference').val(),
				'return_url': document.URL
			}
		});
		
		request.done(function(data, textStatus, jqXHR) {
			window.location = data.paypal_url;
		});
		
		request.fail(function(jqXHR, textStatus, errorThrown) {
			switch(jqXHR.status) {
				case 400:
					$(cart).trigger('cart.paypal.failure', jqXHR.responseJSON);
					break;
				case 500:
					alert('Sorry, there was a server error. Our administrators have been alerted.');
					break;
			}
		});		
		
	},
	
	/* pay via paypal express */
	paypal_confirm_purchase: function(element) {
		
		var request = $.ajax({
			type: "POST",
			url: "{{ '/__/pay/paypal/confirm.json' | secure_url }}",
			data: {
				'_launch_ly_session': $('#session_id').val(),
				'reference': $('#cart_reference').val()
			}
		});

		this.setup_callbacks(request, 'paypal.confirm');		
		
	},	

	paypal_cancel_purchase: function(element) {
		
		var request = $.ajax({
			type: "POST",
			url: "{{ '/__/pay/paypal/cancel.json' | secure_url }}",
			data: {
				'_launch_ly_session': $('#session_id').val(),
				'reference': $('#cart_reference').val()
			}
		});

		this.setup_callbacks(request, 'paypal.cancel');		
		
	},	
	
	/* submit an order without paying for it */
	on_account: function(element) {
		
		var request = $.ajax({
			type: "POST",
			url: "{{ '/__/pay/on_account.json' | secure_url }}",
			data: {
				'_launch_ly_session': $('#session_id').val(),
				'reference': $('#cart_reference').val()
			}
		});
		
		this.setup_callbacks(request, 'on_account');		
	},

	/* get a price check on an item */
	price: function(element) {

		i_id = cart.item_id(element);
		qty = cart.qty(i_id);
		
		if (!(qty == '' || isNaN(parseInt(qty)))) {
			
			$.getJSON('/__/price_check/' + cart.variant_id(i_id) + '/' + qty + '.json',
				{ authenticity_token: rails_authenticity_token },
				function(data) { 
					$(cart).trigger('cart.price', [data]);
				}
			);			
		}

	},

	/* setup callbacks from ajax requests */
	setup_callbacks: function(request, method) {

		request.done(function(data, textStatus, jqXHR) {			
			$(cart).trigger('cart.' + method + '.success', data);
		});
		
		request.fail(function(jqXHR, textStatus, errorThrown) {
			console.log(jqXHR.status);
			switch(jqXHR.status) {
				case 400:
					$(cart).trigger('cart.' + method + '.failure', jqXHR.responseJSON);
					break;
				case 500:
					alert('Sorry, there was a server error. Our administrators have been alerted.');
					break;
			}
		});
		
	},
	

	/* extract the payment type from the credit card number */
	payment_type_from_number: function(card_number) {	

		card_type = '';
		card_number = card_number.replace(/[^\d]/g,'');

		// see http://en.wikipedia.org/wiki/List_of_Bank_Identification_Numbers
		if (card_number.match(/^37\d{13}/)) { card_type = 'american_express'; }
		if (card_number.match(/^4\d{15}/) || card_number.match(/^4\d{12}/)) { card_type = 'visa'; }
		if (card_number.match(/^5[1-5]\d{14}$/)) { card_type = 'master'; }
		if (card_number.match(/^36\d{11}/)) { card_type = 'diners_club'; }	

		return card_type;	
	},	

	remove: function(element) {
		$.get("/__/cart/remove/" + element.data('variant') + ".json", function(data) {
			$(cart).trigger('cart.changed', [data]);
		});		
	},

	update: function(element) {
		data = {
			'authenticity_token': rails_authenticity_token,
			'v': [],
			'billing_line1': $('#billing_line1').val(),
			'billing_line2': $('#billing_line2').val(),
			'billing_suburb': $('#billing_suburb').val(),
			'billing_state': $('#billing_state').val(),
			'billing_state_other': $('#billing_state_other').val(),
			'billing_country': $('#billing_country').val(),
			'billing_post_code': $('#billing_post_code').val(),
			'shipping_same_as_billing': 1,
			'shipping_line1': $('#shipping_line1').val(),
			'shipping_line2': $('#shipping_line2').val(),
			'shipping_suburb': $('#shipping_suburb').val(),
			'shipping_state': $('#shipping_state').val(),
			'shipping_state_other': $('#shipping_state_other').val(),
			'shipping_country': $('#shipping_country').val(),
			'shipping_post_code': $('#shipping_post_code').val(),
			'coupon_code': $('#coupon_code').val(),
			'instructions_to_seller': $('#instructions_to_seller').val(),
			'telephone_number': $('#telephone_number').val(),
			'first_name': $('#first_name').val(),
			'last_name': $('#last_name').val()
		};
		
		this.billingCountry = data.billing_country;
		this.billingState = data.billing_state;

		$('input[data-cart="qty"]').each(function(i, obj) {
			v_id = $(this).attr('data-item');
			data['v'].push(v_id);
			data['q_' + v_id] = $(obj).val();
		});
		
		$.post("/__/cart.json", data, function(data) { 
			$(cart).trigger('cart.changed', [data]);
		});
	},
	
	track_order: function(data) {
		
		order = data.order;
		
		_gaq.push(['_addTrans',
			data.reference,         		// transaction ID - required
			data.domain,  					// affiliation or store name
			order.grand_total,      		// total - required
			order.tax_total,        		// tax
			order.shipping_and_handling,	// shipping
			order.shipping_suburb,  		// city
 			order.shipping_state,   		// state or province
			order.shipping_country  		// country
  		]);

		$.each(order.line_items, function(index, line_item) {

			_gaq.push(['_addItem',
				data.reference,				// transaction ID - required
				line_item.sku,				// SKU/code - required
				line_item.item_name,		// product name
				line_item.name_a + ': ' + line_item.name_b,		// category or variation
				line_item.price,			// unit price - required
        		line_item.quantity			// quantity - required
  			]);

		});

		_gaq.push(['_setCustomVar', 1, 'Coupon Code', order.coupon_code, 3]);
		_gaq.push(['_setCustomVar', 2, 'Discount', order.discount, 3]);
		_gaq.push(['_trackTrans']);		
	}

};