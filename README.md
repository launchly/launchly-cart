# launch.ly Shopping Cart

JQuery shopping cart plugin to [launch.ly](http://launch.ly)


## Requirements

- Handlebars https://github.com/wycats/handlebars.js/
- Stripe (if using stripe payment gateway)


## CDN Locations

https://d1adef9hr2r55o.cloudfront.net/latest/cart.min.css
https://d1adef9hr2r55o.cloudfront.net/latest/launchly-cart.min.js
https://d1adef9hr2r55o.cloudfront.net/latest/launchly-cart.templates.html


## Getting Started

~~~~

{{ 'asset/file/51e4943d57817ea0e50000b1/handlebars.js' | asset_url | javascript_include }}
{{ 'https://d1adef9hr2r55o.cloudfront.net/latest/launchly-cart.min.js' | javascript_include }}

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
		templates_path: 'https://d1adef9hr2r55o.cloudfront.net/latest/launchly-cart.templates.html',
		css_path: 'https://d1adef9hr2r55o.cloudfront.net/latest/cart.min.css'
	});

});
{% endjavascript %}
~~~~


## Releases

This project uses [Bump Build](https://github.com/blueimp/grunt-bump-build-git) to change version numbers

Here is a quick cheat sheet ...

grunt build:major
grunt build:minor
grunt build:patch

run **grunt build** to generate a release
