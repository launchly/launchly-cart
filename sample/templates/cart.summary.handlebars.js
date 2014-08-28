<script id="shopping-cart-template" type="text/x-handlebars-template">
<div id="store-items">

	{{#items}}
		<div class="item">
			<div class="title pull-left"><a href="#">{{title}}</a></div>
			<div class="price pull-right">{{formatted_total}}</div>
			<div class="teaser">{{teaser}}</div>
		</div>
	{{/items}}
		
	<div class="items-subtotal">
			<div class="title pull-left">Subtotal</div>
			<div class="price pull-left">{{formatted_total}}</div>
	</div>
	
	<a href="#" class="btn btn-primary">Checkout</a>
	
</div>
</script>
