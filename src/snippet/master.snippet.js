{{ '//cdnjs.cloudflare.com/ajax/libs/handlebars.js/2.0.0-alpha.4/handlebars.min.js' | javascript_include }}
{{ 'https://checkout.stripe.com/checkout.js' | javascript_include }}
{{ 'https://d1adef9hr2r55o.cloudfront.net/latest/launchly-cart.min.js' | javascript_include }}

{% javascript %}
$(document).ready(function() {

	cart.init({

		{% if current_user.admin? %}
			canPayLater: 		true,
		{% endif %}

		secure_url: 			'{{ '/' | secure_url }}',
		css_path: 				'https://d1adef9hr2r55o.cloudfront.net/latest/cart.min.css',
		templates_path: 		'https://d1adef9hr2r55o.cloudfront.net/latest/launchly-cart.templates.html'

	});

});
{% endjavascript %}