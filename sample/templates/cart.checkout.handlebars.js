<script id="cart-template" type="text/x-handlebars-template">
<div id="cart-payment-container"></div>
<div class="modal hide fade" id="cart-placeholder">
	<div class="modal-body">
		<a class="close" data-dismiss="modal">&times;</a>
		<input type="hidden" id="session_id" name="session_id" value="{{session_id}}">
	    <table class="cart-table">
	    {{#items}}
	    <tr>
			<td class="icon"><img src="{{column_2}}"></td>
			<td class="title">
				<a href="{{url}}" class="variant-name">{{title}}</a><br>
				<span class="variant">
				{{name_a}}: {{name_b}}
				{{#if sku}}
					({{sku}})
				{{/if}}
				<br>
				</span>
				{{ teaser }}
			</td>
			<td class="quantity">
				<div class="control-group string optional">
					<div class="controls">
						<div class="input-append">
							<input class="string optional" name="cart-quantity" data-item="{{variant_id}}" placeholder="0" size="20" style="width:25px;" type="text" value="{{quantity}}"><span class="add-on">&times; {{ formatted_price }}</span>
						</div>
					</div>
				</div>
			</td>
			<td class="total">{{formatted_total}}</td>
		</tr>
		{{/items}}

		<tr>
			<td>&nbsp;</td>
			<td style="padding-top:30px;">
				<div class="control-group string optional">
					<div class="controls">
						<input class="string optional" name="coupon-code" data-item="{{coupon_code}}" placeholder="coupon code" size="20" style="width:100px;" type="text" value="{{coupon_code}}">
					</div>
				</div>
			</td>
			<td><a href="#" class="btn update-cart-link">Update</a></td>
			<td colspan="4" class="sub-total">{{formatted_total}}</td>
		</tr>
		</table>		
				
	</div>

	<div class="modal-footer">
		<div class="pull-left">
			<a href="#" class="btn empty-cart-link">Empty Cart</a>
			<a href="#" class="btn" data-dismiss="modal">Close</a>
		</div>
		{{#if signed_in }}
			{{#if has_addresses }}
				<a href="#" class="btn btn-primary" onclick="$('#cart-placeholder').modal('hide');$('#cart-payment-placeholder').modal({ backdrop: false });">Pay now <i class="icon icon-white icon-chevron-right"></i></a>
				<a href="#" class="btn" onclick="$('#cart-placeholder').modal('hide');$('#cart-details-placeholder').modal({ backdrop: false });">Change details</a>
			{{else}}
				<a href="#" class="btn btn-primary" onclick="$('#cart-placeholder').modal('hide');$('#cart-details-placeholder').modal({ backdrop: false });">Your details &hellip;</a>
			{{/if}}    
		
		{{else}}
			<a href="{{sign_in_link}}" class="btn" data-link="{{sign_in_link}}" onclick="newWindow=window.open('{{sign_in_link}}', 'loginwindow', 'height=600,width=940,status=yes'); if (window.focus) { newWindow.focus(); } return false;">Sign in or Register to continue &hellip;</a>    	
		{{/if}}    
	</div>
</div>