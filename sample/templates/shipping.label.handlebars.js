<script id="shipping-label-address-template" type="text/x-handlebars-template">
<div style="background-color:#f6f6f6;border-radius:6px;margin-top:8px;">
	<div style="padding:10px;">
		<p><strong>Your order will be shipped to:</strong></p>
		<p>
			{{line1}}<br>
			{{#if line2}}
				{{line2}}<br>
			{{/if}}
			{{suburb}}{{#if state}}{{#if suburb}}, {{/if}}{{state}}{{/if}}
			<br>
			{{country}} {{post_code}}
		</p>
		<p><a href="#" id="ship-to-alternate" class="btn">Ship to a different address</a></p>
	</div>
</div>
</script>
