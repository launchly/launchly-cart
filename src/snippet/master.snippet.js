{{ '//cdnjs.cloudflare.com/ajax/libs/handlebars.js/2.0.0-alpha.4/handlebars.min.js' | javascript_include }}
{{ 'https://checkout.stripe.com/checkout.js' | javascript_include }}
{{ 'https://d1adef9hr2r55o.cloudfront.net/latest/launchly-cart.min.js' | javascript_include }}

{% javascript %}
$(document).ready(function() {

	cart.init({
<<<<<<< HEAD
		{% if current_user.admin? %}
			can_pay_later: true,
		{% endif %}
		account_organisation: '{{ account.organisation.name }}',
		user_email: '{{ current_user.email }}',
		stripe_key: '{{ account.payment_gateway.stripe_key }}',
		secure_url: "{{ '/' | secure_url }}",
		css_path: 		'http://local.dev/spitfire/cart/cart.min.css',
		templates_path: 'http://local.dev/spitfire/cart/launchly-cart.templates.html'
=======

		{% if current_user.admin? %}
			canPayLater: 		true,
		{% endif %}

		account_organisation: 	'{{ account.organisation.name }}',
		user_email: 			'{{ current_user.email }}',
		stripe_key: 			'{{ account.payment_gateway.stripe_key }}',
		secure_url: 			'{{ '/' | secure_url }}',
		css_path: 				'https://d1adef9hr2r55o.cloudfront.net/latest/cart.min.css',
		templates_path: 		'https://d1adef9hr2r55o.cloudfront.net/latest/launchly-cart.templates.html'

>>>>>>> 20fe5c879e08d353d7a1fd4907e2a2c10e6cc21a
	});

});
{% endjavascript %}