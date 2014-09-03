{{ 'asset/file/51e4943d57817ea0e50000b1/handlebars.js' | asset_url | javascript_include }}
{{ 'https://checkout.stripe.com/checkout.js' | javascript_include }}
{{ 'http://local.dev/spitfire/cart/launchly-cart.min.js' | javascript_include }}

{% javascript %}
$(document).ready(function() {

	{% if current_user.admin? %}
		cart.canPayLater = true;
	{% endif %}

	cart.account_organisation = '{{ account.organisation.name }}';
	cart.user_email = '{{ current_user.email }}';
	cart.stripe_key = '{{ account.payment_gateway.stripe_key }}';
	cart.secure_url = "{{ '/' | secure_url }}";

	cart.init({
		css_path: 		'http://local.dev/spitfire/cart/cart.min.css',
		templates_path: 'http://local.dev/spitfire/cart/launchly-cart.templates.html'
	});

});
{% endjavascript %}