/*
 * launchly-cart
 * https://github.com/launchly/launchly-cart
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
 * inc                    
 * on_account
 * pay                    
 * paypal
 * paypal_confirm_purchase
 * paypal_cancel_purchase
 * payment_type_from_number
 * remove                 
 * set                    
 * stripe_pay
 * update 
 * 
 *
 * List of cart events
 * ------------
 *
 * cart.changed				the contents of the shopping cart has changed
 * cart.recieved			a new cart has been downloaded
 * cart.payment.success		the order was successfully paid for
 * cart.payment.failure		the payment was rejected and the order was not submitted
 * cart.price				a price check has been retrieved
 * cart.on_account.success	the order was successfully submitted, but not paid for
 * cart.on_account.failure	the order was rejected and the order was not submitted
 * cart.dec					a variant's quantity has been decremented
 * cart.inc					a variant's quantity has been incremented
 * cart.set					a variant's quantity has been set
 * cart.empty				the shopping cart has been emptied
 * cart.get					the shopping cart has been fetched
 * cart.paypal.failure		payment by paypal could not be made
 * cart.ready				launchly-cart has downloaded all supporting materials and is ready to begin processing
 * payment.success			payment was successful
 * payment.failure			payment failed for some reason
 * paypal.confirm.success	paypal express checkout was confirmed
 * paypal.confirm.failure
 * paypal.cancel.success	request to cancel paypal payment was successful
 * paypal.cancel.failure	request to cancel paypal payment failed
 * 
 */

var cart = {

	billingCountry: '',
	billingState: '',
	can_pay_later: false,
	cached: {},
	account_organisation: '',
	user_email: '',
	stripe_icon: '<%= pkg.cdn %>/images/launchly-stripe-icon.png',
	secure_url: '',
	templates_path: '<%= pkg.cdn %>/releases/<%= pkg.version %>/launchly-cart.templates.html',
	css_path: '<%= pkg.cdn %>/releases/<%= pkg.version %>/cart.min.css',
	templates: [
		'cart_checkout',
		'cart_contact_details',
		'cart_payment',
		'cart_payment_failure',
		'cart_payment_success',
		'shopping_cart',
		'state_select',
		'cart_components'
	],
	
	/* do a particular cart function */
	do: function(element) {		
		cart[element.data('cart-function')](element);
	},

	dec: function(element) {
		jQuery.post("/__/cart/inc.json", cart.variant_data(element), function(data) {
			jQuery(cart).trigger('cart.changed', [data]);
			jQuery(cart).trigger('cart.dec', [data]);
		});
	},
	
	/* empty the shopping cart */
	empty: function() {
		jQuery.get("/__/cart/empty.json", { authenticity_token: rails_authenticity_token }, function(data) {
			jQuery(cart).trigger('cart.changed', [data]);
			jQuery(cart).trigger('cart.empty', [data]);
		});
	},

	/* get the current shopping cart */
	get: function(element, callback) {
		jQuery.get("/__/cart.json", { authenticity_token: rails_authenticity_token }, function(data) { 
			jQuery(cart).trigger('cart.changed', [data]);
			jQuery(cart).trigger('cart.get', [data]);
			if (callback) { callback(); }
		});
	},
	
	/* increment an item in the cart */
	inc: function(element) {
		jQuery.post("/__/cart/inc.json", cart.variant_data(element), function(data) {
			jQuery(cart).trigger('cart.changed', [data]);
			jQuery(cart).trigger('cart.inc', [data]);
		});
	},

	/* set the quantity for an item in the cart */
	set: function(element) {
		jQuery.post("/__/cart/set.json", cart.variant_data(element), function(data) {
			jQuery(cart).trigger('cart.changed', [data]);
			jQuery(cart).trigger('cart.set', [data]);
		});
	},
	
	/* extract the item id for an element */
	item_id: function(element) {
		return element.data('item');
	},
	
	/* extract the selected variant id for an item */
	variant_id: function(item_id) {

		var variant_id = jQuery('#v_' + item_id + ' :selected').val();

		if (typeof variant_id === "undefined") {
			variant_id = jQuery('#v_' + item_id).val();
		}

		return variant_id;
	},
	
	/* get the selected quantity for a given item */
	qty: function(item_id) {
		return jQuery('#q_' + item_id).val();
	},
	
	note: function(item_id) {
		return jQuery('#notes_' + item_id).val();
	},
	
	variant_data: function(element) {

		var i_id = cart.item_id(element);
		var v_id = cart.variant_id(i_id);
		var qty = cart.qty(i_id);
		var note = cart.note(i_id);

		var data = {
			'authenticity_token': rails_authenticity_token,
			'v': []
		};

		data['v'].push(v_id);
		data['q_' + v_id] = qty;
		if (note) { data['notes_' + v_id] = note; }

		return data;
	},
	
	/* pay for an order */
	pay: function() {
		
		var btn = jQuery('a[data-cart-function="pay"]');
		var loading_text = btn.data('loading-text');

		var request = jQuery.ajax({
			type: "POST",
			url: cart.secure_url + "/__/pay/cart.json",
			beforeSend: function() {
				btn.text(loading_text);
			},
			data: {
				'_launch_ly_session': jQuery('#session_id').val(),
				'reference': jQuery('#cart_reference').val(),
				'first_name': jQuery('#card_first_name').val(),
				'last_name': jQuery('#card_last_name').val(),
				'card_number': jQuery('#card_number').val(),
				'payment_type': jQuery('#payment_type').val(),
				'expires_month': jQuery('#card_expires_month').val(),
				'expires_year': jQuery('#card_expires_year').val(),
				'card_verification': jQuery('#card_verification').val()
			}
		});
		
		this.setup_callbacks(request, 'payment');

	},

	stripe_pay: function(token) {


		token._launch_ly_session = jQuery('#session_id').val();
		token.reference = jQuery('#cart_reference').val();

		var request = jQuery.ajax({
			type: "POST",
			url: cart.secure_url + "/__/pay/cart.json",
			beforeSend: function() {
				jQuery('#cart-payment-processing-placeholder').modal({ backdrop: false });
			},
			data: token
		});

		this.setup_callbacks(request, 'payment');
		
	},
	
	/* pay via paypal express */
	paypal: function() {
		
		var request = jQuery.ajax({
			type: "POST",
			url: cart.secure_url + "/__/pay/paypal.json",
			data: {
				'_launch_ly_session': jQuery('#session_id').val(),
				'reference': jQuery('#cart_reference').val(),
				'return_url': document.URL
			}
		});
		
		request.done(function(data) {
			window.location = data.paypal_url;
		});
		
		request.fail(function(jqXHR) {
			switch(jqXHR.status) {
				case 400:
					jQuery(cart).trigger('cart.paypal.failure', jqXHR.responseJSON);
					break;
				case 500:
					window.alert('Sorry, there was a server error. Our administrators have been alerted.');
					break;
			}
		});		
		
	},
	
	/* pay via paypal express */
	paypal_confirm_purchase: function() {
		
		var request = jQuery.ajax({
			type: "POST",
			url: cart.secure_url + "/__/pay/paypal/confirm.json",
			data: {
				'_launch_ly_session': jQuery('#session_id').val(),
				'reference': jQuery('#cart_reference').val()
			}
		});

		this.setup_callbacks(request, 'paypal.confirm');		
		
	},
	
	paypal_cancel_purchase: function() {
		
		var request = jQuery.ajax({
			type: "POST",
			url: cart.secure_url + "/__/pay/paypal/cancel.json",
			data: {
				'_launch_ly_session': jQuery('#session_id').val(),
				'reference': jQuery('#cart_reference').val()
			}
		});

		this.setup_callbacks(request, 'paypal.cancel');		
		
	},
	
	/* submit an order without paying for it */
	on_account: function() {

		var request = jQuery.ajax({
			type: "POST",
			url: cart.secure_url + '/__/pay/on_account.json',
			data: {
				'_launch_ly_session': jQuery('#session_id').val(),
				'reference': jQuery('#cart_reference').val()
			}
		});

		this.setup_callbacks(request, 'on_account');		
	},
	
	/* get a price check on an item */
	price: function(element) {

		var i_id = cart.item_id(element);
		var qty = cart.qty(i_id);
		
		if (!(qty === '' || isNaN(parseInt(qty, 10)))) {
			
			jQuery.getJSON('/__/price_check/' + cart.variant_id(i_id) + '/' + qty + '.json',
				{ authenticity_token: rails_authenticity_token },
				function(data) { 
					jQuery(cart).trigger('cart.price', [data]);
				}
			);			
		}

	},
	
	/* setup callbacks from ajax requests */
	setup_callbacks: function(request, method) {

		request.done(function(data) {
			jQuery(cart).trigger('cart.' + method + '.success', data);
		});
		
		request.fail(function(jqXHR) {
			switch(jqXHR.status) {
				case 400:
					jQuery(cart).trigger('cart.' + method + '.failure', jqXHR.responseJSON);
					break;
				case 500:
					window.alert('Sorry, there was a server error. Our administrators have been alerted.');
					break;
			}
		});
		
	},
	
	/* extract the payment type from the credit card number */
	payment_type_from_number: function(card_number) {	

		var card_type = '';
		card_number = card_number.replace(/[^\d]/g,'');

		// see http://en.wikipedia.org/wiki/List_of_Bank_Identification_Numbers
		if (card_number.match(/^37\d{13}/)) { card_type = 'american_express'; }
		if (card_number.match(/^4\d{15}/) || card_number.match(/^4\d{12}/)) { card_type = 'visa'; }
		if (card_number.match(/^5[1-5]\d{14}jQuery/)) { card_type = 'master'; }
		if (card_number.match(/^36\d{11}/)) { card_type = 'diners_club'; }	

		return card_type;	
	},	

	remove: function(element) {
		jQuery.get("/__/cart/remove/" + element.data('variant') + ".json", function(data) {
			jQuery(cart).trigger('cart.changed', [data]);
		});		
	},
	
	update: function() {
		var data = {
			'authenticity_token': rails_authenticity_token,
			'v': [],
			'billing_line1': jQuery('#billing_line1').val(),
			'billing_line2': jQuery('#billing_line2').val(),
			'billing_suburb': jQuery('#billing_suburb').val(),
			'billing_state': jQuery('#billing_state').val(),
			'billing_state_other': jQuery('#billing_state_other').val(),
			'billing_country': jQuery('#billing_country').val(),
			'billing_post_code': jQuery('#billing_post_code').val(),
			'shipping_same_as_billing': 1,
			'shipping_line1': jQuery('#shipping_line1').val(),
			'shipping_line2': jQuery('#shipping_line2').val(),
			'shipping_suburb': jQuery('#shipping_suburb').val(),
			'shipping_state': jQuery('#shipping_state').val(),
			'shipping_state_other': jQuery('#shipping_state_other').val(),
			'shipping_country': jQuery('#shipping_country').val(),
			'shipping_post_code': jQuery('#shipping_post_code').val(),
			'coupon_code': jQuery('#coupon_code').val(),
			'instructions_to_seller': jQuery('#instructions_to_seller').val(),
			'telephone_number': jQuery('#telephone_number').val(),
			'first_name': jQuery('#first_name').val(),
			'last_name': jQuery('#last_name').val()
		};
		
		this.billingCountry = data.billing_country;
		this.billingState = data.billing_state;

		jQuery('input[data-cart="qty"]').each(function(i, obj) {
			var v_id = jQuery(this).attr('data-item');
			data['v'].push(v_id);
			data['q_' + v_id] = jQuery(obj).val();
		});
		
		jQuery.post("/__/cart.json", data, function(data) { 
			jQuery(cart).trigger('cart.changed', [data]);
		});
	},
	
	track_order: function(data) {
		
		if (typeof ga !== 'undefined') {

			var order = data.order;

			jQuery.each(order.line_items, function(index, line_item) {

				ga('ec:addProduct', {
					'name': line_item.item_name,
					'id': line_item.sku,
					'variant': line_item.name_a + ': ' + line_item.name_b,
					'price': line_item.price,
					'quantity': line_item.quantity,
					'coupon': order.coupon_code
				});
			
			});

			ga('ec:setAction', 'purchase', {
				'id': data.reference,
				'affiliation': data.domain,
				'revenue': order.grand_tota,
				'shipping': order.shipping_and_handling,
				'tax': order.tax_total,
				'currency': order.currency,
				'coupon': order.coupon_code
			});
		}
	},
	
	init: function(options) {

		if ( typeof options.can_pay_later !== 'undefined') { cart.can_pay_later = options.can_pay_later; }
		if ( typeof options.account_organisation !== 'undefined') { cart.account_organisation = options.account_organisation; }
		if ( typeof options.user_email !== 'undefined') { cart.user_email = options.user_email; }
		if ( typeof options.stripe_icon !== 'undefined') { cart.stripe_icon = options.stripe_icon; }
		if ( typeof options.secure_url !== 'undefined') { cart.secure_url = options.secure_url; }
		if ( typeof options.templates_path !== 'undefined') { cart.templates_path = options.templates_path; }
		if ( typeof options.css_path !== 'undefined') { cart.css_path = options.css_path; }
		
		cart.loadCSS();
		cart.loadTemplates();
	},
	
	loadTemplates: function() {
		jQuery.ajax({
			url: cart.templates_path
		}).done(function(data) {
			jQuery('body').append( data );

			var totalTemplates = cart.templates.length;
			cart.cached = {};
			
			for (var i=0; i<totalTemplates; i++) {
				var template = cart.templates[i];
				var selector = '#' + template + '-template';
				var source = jQuery(selector).html();
				cart.store(template, source);
			}
			
			cart.loadComponents();
			
			jQuery(cart).trigger('cart.ready');
		});
	},
	
	loadComponents: function() {
		var context = {};
		var html = cart.cached_template('cart_components', context);
		jQuery('body').prepend(html);
	},
	
	loadCSS: function() {
		jQuery('head').append( jQuery('<link rel="stylesheet" type="text/css">').attr('href', cart.css_path) );
	},
	
	store: function(name, raw) {
		cart.cached[name] = Handlebars.compile(raw);
	},
	
	render: function(name, context, selector) {

		if (typeof context === 'undefined') { 
			context = {};
		}

		var html = cart.cached[name](context);
		jQuery(selector).html(html);
	},

	/* populate a select box with the list of states for a given country */
	populate_states: function(element, name, selectedState) {

		var el = jQuery('#state-' + name + '-select-placeholder');
		el.empty();
		var country = element.val();
		var context = null;

		if (country !== '') {		
			var uri = '/__/countries/' + country + '/entities.json';
			jQuery.get(uri, function(data) {
				context = { states: data.regions, type: name };
				el.html(cart.cached_template('state_select', context));
				if (selectedState) { jQuery('#billing_state').val( selectedState ); }
			});
		}
	},

	/* select payment type and highlight payment icons */
	select_payment_type: function(payment_type) {
		jQuery('#payment_type').val(payment_type);
		jQuery(".payment-icon[data-type='" + payment_type + "']").fadeTo('fast', 1);
		jQuery(".payment-icon:not([data-type='" + payment_type + "'])").fadeTo('slow', 0.2);
	},
	
	cached_template: function(template_name, data) {
		return cart.cached[template_name](data);
	},
	
	toggle: function() {
		jQuery('#shopping-cart').toggleClass('sc-menu-open');
	}
};