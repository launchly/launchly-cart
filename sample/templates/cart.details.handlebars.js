<div class="modal hide fade" id="cart-details-placeholder" style="display: none;">
	<div class="modal-header">
		<a class="close" data-dismiss="modal">&times;</a>

		<img src="/spitfire/icons/payment/tag.png" border="0" class="pull-left" style="margin-right:1.5em;margin-top:2px;">

		<h1>Personal Details</h1>
		<p>Your name and address information</p>
	</div>
	<div class="modal-body">
		<input type="hidden" name="shipping_same_as_billing" id="shipping_same_as_billing" value="{{shipping_same_as_billing}}">

		<div class="pull-left column first">
			<h3>Billing Information</h3>

			<div id="billing-form-placeholder">
				<div class="control-group">
					<div class="controls">
						<select name="billing_country" id="billing_country">
							<option value="">- select country -</option>
							{{#countries}}
								<option value="{{a2}}">{{name}}</option>
							{{/countries}}
						</select>				
					</div>
				</div>

				<div id="state-billing-select-placeholder"></div>

				<div class="control-group">
					<label class="control-label" for="billing_line1">Address</label>
					<div class="controls">
						<input type="text" name="billing_line1" id="billing_line1" value="{{billing_line1}}"><br>
						<input type="text" name="billing_line2" id="billing_line2" value="{{billing_line2}}">
					</div>
				</div>

				<div class="control-group">
					<label class="control-label" for="billing_suburb">City/Suburb</label>
					<div class="controls"><input type="text" name="billing_suburb" id="billing_suburb" value="{{billing_suburb}}"></div>
				</div>

				<div class="control-group">
					<label class="control-label" for="billing_post_code">Post Code</label>
					<div class="controls"><input type="text" name="billing_post_code" id="billing_post_code" value="{{billing_post_code}}"></div>
				</div>

			</div>			
		</div>
		<div class="pull-left column">		
			<div id="shipping-label-address-placeholder"{{#unless shipping_same_as_billing}} style="display:none;"{{/unless}}></div>
		
			<div id="shipping-form-placeholder"{{#if shipping_same_as_billing}} style="display:none;"{{/if}}>
		
				<h3>Shipping Information</h3>
		
				<div class="control-group">
					<div class="controls">
						<select name="shipping_country" id="shipping_country">
							<option value="">- select country -</option>
							{{#countries}}
								<option value="{{a2}}">{{name}}</option>
							{{/countries}}
						</select>
					</div>
				</div>

				<div id="state-shipping-select-placeholder"></div>

				<div class="control-group">
					<label class="control-label" for="shipping_line1">Address</label>
					<div class="controls">
						<input type="text" name="shipping_line1" id="shipping_line1" value="{{shipping_line1}}"><br>
						<input type="text" name="shipping_line2" id="shipping_line2" value="{{shipping_line2}}">
					</div>
				</div>

				<div class="control-group">
					<label class="control-label" for="shipping_suburb">City/Suburb</label>
					<div class="controls"><input type="text" name="shipping_suburb" id="shipping_suburb" value="{{shipping_suburb}}"></div>
				</div>

				<div class="control-group">
					<label class="control-label" for="shipping_post_code">Post Code</label>
					<div class="controls"><input type="text" name="shipping_post_code" id="shipping_post_code" value="{{shipping_post_code}}"></div>
				</div>

				<div class="control-group">
					<div class="controls">
						<a href="#" id="ship-to-billing" class="btn">Use billing address</a>
					</div>
				</div>
			</div>    
		</div>
		<div class="clear"></div>
	</div>
	<div class="modal-footer">
		<div class="pull-left">
			<a href="#" class="btn" onclick="$('#cart-details-placeholder').modal('hide');$('#cart-placeholder').modal({ backdrop: false });">Back</a>
			<a href="#" class="btn" data-dismiss="modal">Close</a>
		</div>
		<div class="pull-right">
			<a href="#" class="btn btn-success update-cart-link">Update Details</a>
		</div>
	</div>
</div>
</script>