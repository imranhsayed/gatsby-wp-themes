import React from 'react';

const OrderSuccess = ( props ) => {

	const { response } = props;

	if ( ! response ) {
		return null;
	}

	const responseData = response.checkout;

	window.location.href = responseData.redirect;

	return (
		<div className="container">
			{ 'success' === responseData.result ? (
				<div>
					<h2>Order no: { responseData.order.orderKey } </h2>
					<p>Status : { responseData.order.status }</p>
				</div>
			): ''}
		</div>
	)
};

export default OrderSuccess;
