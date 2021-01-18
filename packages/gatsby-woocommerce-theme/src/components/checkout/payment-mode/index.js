import React from 'react';
import Error from "../error";

const Index = ( { input, handleOnChange } ) => {
	return (
		<div className="mt-3">
			<Error errors={ input.errors } fieldName={ 'paymentMethod' }/>
			{/*Direct bank transfers*/}
			<div className="form-check woo-next-payment-input-container mt-2">
				<label className="form-check-label">
					<input onChange={ handleOnChange } value="bacs" className="form-check-input" name="paymentMethod" type="radio"/>
					<span className="woo-next-payment-content">Direct Bank Transfer</span>
				</label>
			</div>
			{/*Pay with Paypal*/}
			<div className="form-check woo-next-payment-input-container mt-2">
				<label className="form-check-label">
					<input onChange={ handleOnChange } value="paypal" className="form-check-input" name="paymentMethod" type="radio"/>
					<span className="woo-next-payment-content">Pay with Paypal</span>
				</label>
			</div>
			{/*Check Payments*/}
			<div className="form-check woo-next-payment-input-container mt-2">
				<label className="form-check-label">
					<input onChange={ handleOnChange } value="cheque" className="form-check-input" name="paymentMethod" type="radio"/>
					<span className="woo-next-payment-content">Check Payments</span>
				</label>
			</div>
			{/*Pay with Stripe*/}
			<div className="form-check woo-next-payment-input-container mt-2">
				<label className="form-check-label">
					<input onChange={ handleOnChange } value="cod" className="form-check-input" name="paymentMethod" type="radio"/>
					<span className="woo-next-payment-content">Cash on Delivery</span>
				</label>
			</div>
			<div className="form-check woo-next-payment-input-container mt-2">
				<label className="form-check-label">
					<input onChange={ handleOnChange } value="jccpaymentgatewayredirect" className="form-check-input" name="paymentMethod" type="radio"/>
					<span className="woo-next-payment-content">JCC</span>
				</label>
			</div>
			<div className="form-check woo-next-payment-input-container mt-2">
				<label className="form-check-label">
					<input onChange={ handleOnChange } value="ccavenue" className="form-check-input" name="paymentMethod" type="radio"/>
					<span className="woo-next-payment-content">CC Avenue</span>
				</label>
			</div>
			{/*	Payment Instructions*/}
			<div className="woo-next-checkout-payment-instructions mt-2">
				Please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode.
			</div>
		</div>
	);
};

export default Index;
