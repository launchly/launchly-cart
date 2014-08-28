<div class="modal hide fade" id="cart-payment-placeholder" style="display: none;">
	<div class="modal-header">
		<a class="close" data-dismiss="modal">&times;</a>
	
		<img src="/spitfire/icons/payment/padlock.png" border="0" class="pull-left" style="margin-right:1.5em;margin-top:2px;">
		<h1>Secure credit card payment</h1>
		<p>This is a secure 256-bit SSL encrypted payment</p>
	</div>
	<div class="modal-body">
		
		{{#if testing_payment_gateway }}
			<div class="alert alert-error">
				<strong>WARNING:</strong> Do not submit real orders. Payment gateway is currently in test and evaluation mode.
			</div>
		{{/if}}
		
		<input type="hidden" id="cart_reference" name="cart_reference" value="{{reference}}">

		<div style="background-color:#f6f6f6;width:100%;margin:1.5em 0em 1.5em 0em;" class="clearfix">
			<div style="padding:10px;" class="clearfix">

				<div class='pull-left' id='payment-panel'>
				
					<div class='pull-left' style='margin-right:1em;'>
						<div class="control-group string required">
							<label class="string required control-label" for="card_first_name"><abbr title="required">*</abbr> Card first name</label>
							<div class="controls">
								<input class="string required" id="card_first_name" name="card_first_name" placeholder="first name" size="50" style="width:120px;" type="text">
							</div>
						</div>
					</div>
				
					<div class='pull-left'>
						<div class="control-group string required">
							<label class="string required control-label" for="card_last_name"><abbr title="required">*</abbr> Card last name</label>
							<div class="controls">
								<input class="string required" id="card_last_name" name="card_last_name" placeholder="last name" size="50" style="width:180px" type="text">
							</div>
						</div>
					</div>

					<div class='clear'></div>

					<div class='pull-left' id='card-number' style='margin-right:1em;'>
						<div class="control-group string required">
							<label class="string required control-label" for="card_number"><abbr title="required">*</abbr> Card number</label>
							<div class="controls">
								<input class="string required" id="card_number" name="card_number" size="50" style="width:190px" type="text">
							</div>
						</div>
					</div>

					<div class='pull-left' style='margin-top:1.6em;'>
						<img alt="Visa" data-type="visa" class="payment-icon" style="cursor:hand;" src="https://d19sd42nsxuauk.cloudfront.net/spitfire/icons/payment/visa.png">
						<img alt="Master" data-type="master" class="payment-icon" style="cursor:hand;" src="https://d19sd42nsxuauk.cloudfront.net/spitfire/icons/payment/master.png">
						<img alt="American Express" data-type="american_express" style="cursor:hand;" class="payment-icon" src="https://d19sd42nsxuauk.cloudfront.net/spitfire/icons/payment/american_express.png">
					</div>

					<div class='clear'></div>

					<div id='card-type-select' style="display:none;">
						<select id="payment_type" name="payment_type">
							<option value="">- select payment method -</option>
							<option value="visa">Visa</option>
							<option value="master">Mastercard</option>
							<option value="american_express">American Express</option>
						</select>
					</div>

					<div class='pull-left' id='card-expires-month' style='margin-right:1em;'>
						<div class="control-group select required">
							<label class="select required control-label" for="card_expires_month"><abbr title="required">*</abbr> Expiry Month</label>
							<div class="controls">
								<select class="select required" id="card_expires_month" name="card_expires_month" style="width:130px;">
									<option value="">- select month -</option>
									<option value="1">1 - January</option>
									<option value="2">2 - February</option>
									<option value="3">3 - March</option>
									<option value="4">4 - April</option>
									<option value="5">5 - May</option>
									<option value="6">6 - June</option>
									<option value="7">7 - July</option>
									<option value="8">8 - August</option>
									<option value="9">9 - September</option>
									<option value="10">10 - October</option>
									<option value="11">11 - November</option>
									<option value="12">12 - December</option>
								</select>
							</div>
						</div>
					</div>

					<div class='pull-left' id='card-expires-year' style='margin-right:1em;'>
						<div class="control-group select required">
							<label class="select required control-label" for="card_expires_year"><abbr title="required">*</abbr> Expiry Year</label>
							<div class="controls">
								<select class="select required" id="card_expires_year" name="card_expires_year" style="width:120px;">
									<option value="">- select year -</option>
									{{#expiry_years}}
										<option value="{{.}}">{{.}}</option>
									{{/expiry_years}}									
								</select>
							</div>
						</div>
					</div>

					<div class='pull-left' id='cvv'>
						<div class="control-group string required">
							<label class="string required control-label" for="card_verification"><abbr title="required">*</abbr> CVV</label>
							<div class="controls">
								<input class="string required" id="card_verification" name="card_verification" size="50" style="width:50px" type="text">
							</div>
						</div>
					</div>
					
					<img src="/spitfire/icons/payment/cvv.png" border="0" id="cvv-icon" class="pull-left" style="margin-left:1em;margin-top:22px;opacity:0.2;">
					

				</div>
			</div>

		</div>
		
	</div>
	<div class="modal-footer">
		<div class="pull-left">
			<a href="#" class="btn" onclick="$('#cart-payment-placeholder').modal('hide');$('#cart-placeholder').modal({ backdrop: false });">Back</a>
			<a href="#" class="btn" data-dismiss="modal">Close</a>
		</div>
		<div class="pull-right">
			<a href="#" class="btn btn-large btn-success" id="pay_now" data-loading-text="Processing payment &hellip;">Process Payment</a>
		</div>
	</div>
</div>