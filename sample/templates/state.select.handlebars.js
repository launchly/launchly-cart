<script id="state-select-template" type="text/x-handlebars-template">
	<div class="control-group">
		<div class="controls">
			<select name="{{type}}_state" id="{{type}}_state">
				<option value="">- select state -</option>
				{{#states}}
					<option value="{{abbreviation}}">{{name}}</option>
				{{/states}}
			</select>
		</div>
	</div>
</script>
