{{ 'asset/file/51e4943d57817ea0e50000b1/handlebars.js' | asset_url | javascript_include }}
{{ 'https://checkout.stripe.com/checkout.js' | javascript_include }}
{{ 'http://local.dev/spitfire/cart/launchly-cart.min.js' | javascript_include }}

{% javascript %}
$(document).ready(function() {

	cart.init({
		{% if current_user.admin? %}
			can_pay_later: true,
		{% endif %}
		account_organisation: '{{ account.organisation.name }}',
		user_email: '{{ current_user.email }}',
		stripe_key: '{{ account.payment_gateway.stripe_key }}',
		secure_url: "{{ '/' | secure_url }}",
		css_path: 		'http://local.dev/spitfire/cart/cart.min.css',
		templates_path: 'http://local.dev/spitfire/cart/launchly-cart.templates.html'
	});

});
{% endjavascript %}