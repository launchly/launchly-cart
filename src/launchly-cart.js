/*
 * launchly-cart
 * https://github.com/craig/launchly-cart
 *
 * Copyright (c) 2013 Craig Sullivan
 * Licensed under the MIT license.
 */

/* List of cart methods
 * ------------
 *
 * add            
 * dec            
 * empty          
 * get 
 * update 
 * inc                    
 * remove                 
 * set                    
 * on_account
 * pay                    
 * paypal
 * paypal_confirm_purchase
 * paypal_cancel_purchase
 * payment_type_from_number
 *
 * List of cart events
 * ------------
 *
 * cart.changed           the contents of the shopping cart has changed
 * cart.recieved          a new cart has been downloaded
 * cart.payment.success   the order was successfully paid for
 * cart.payment.failure   the payment was rejected and the order was not submitted
 * cart.price             a price check has been retrieved
 * cart.on_account.success	the order was successfully submitted, but not paid for
 * cart.on_account.failure	the order was rejected and the order was not submitted
 *
 */

var cart;
cart = {

};