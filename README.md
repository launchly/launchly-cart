# launch.ly Shopping Cart

JQuery shopping cart plugin to [launch.ly](http://launch.ly)


## Requirements

- [launch.ly](http://launch.ly) account
- [Handlebars](https://github.com/wycats/handlebars.js)
- [Stripe](http://stripe.com) (if using stripe payment gateway)


## CDN Locations

You can access the latest runtime versions of launchly-cart files at these locations

- https://d1adef9hr2r55o.cloudfront.net/latest/cart.min.css
- https://d1adef9hr2r55o.cloudfront.net/latest/launchly-cart.min.js
- https://d1adef9hr2r55o.cloudfront.net/latest/launchly-cart.templates.html

For specific releases use the following format

- https://d1adef9hr2r55o.cloudfront.net/releases/0.1.0/cart.min.css
- https://d1adef9hr2r55o.cloudfront.net/releases/0.1.0/launchly-cart.min.js
- https://d1adef9hr2r55o.cloudfront.net/releases/0.1.0/launchly-cart.templates.html

... in this instance, I am using the 0.1.0 specific version of launchly-cart.


For handlebars, you can access a CDN at http://cdnjs.com/libraries/handlebars.js/


## Getting Started

~~~~

{{ '//cdnjs.cloudflare.com/ajax/libs/handlebars.js/2.0.0-alpha.4/handlebars.min.js' | javascript_include }}
{{ 'https://checkout.stripe.com/checkout.js' | javascript_include }}
{{ 'https://d1adef9hr2r55o.cloudfront.net/latest/launchly-cart.min.js' | javascript_include }}

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
