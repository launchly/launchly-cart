{{ 'asset/file/51e4943d57817ea0e50000b1/handlebars.js' | asset_url | javascript_include }}
{{ 'https://checkout.stripe.com/checkout.js' | javascript_include }}
{{ '/launchly-cart.js' | javascript_include }}

{% javascript %}
$(document).ready(function() {

	{% if current_user.admin? %}
		cart.canPayLater = true;
	{% endif %}

	cart.account_organisation = '{{ account.organisation.name }}';
	cart.user_email = '{{ current_user.email }}';
	cart.stripe_key = '{{ account.payment_gateway.stripe_key }}';
	cart.secure_url = "{{ '/' | secure_url }}";
	cart.authenticity_token = '{{ rails_authenticity_token }}';

	cart.init({
		templates_path: '/launchly-cart-templates.html',
		css_path: '/cart.min.css'
	});
	
	cart.get();

});
{% endjavascript %}