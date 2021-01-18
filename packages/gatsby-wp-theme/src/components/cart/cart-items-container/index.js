import Link from "gatsby-link";
import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { getFormattedCart, getUpdatedItems } from "../../../utils/functions";
import CartItem from "../cart-item";
import { v4 } from "uuid";
import { useMutation, useQuery } from "@apollo/client";
import UPDATE_CART from "../../../mutations/update-cart";
import GET_CART from "../../../queries/get-cart";
import CLEAR_CART_MUTATION from "../../../mutations/clear-cart";

const CartItemsContainer = () => {
  const [cart, setCart] = useContext(AppContext);
  const [requestError, setRequestError] = useState(null);

  // Get Cart Data.
  const { data, refetch } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      // console.warn( 'completed GET_CART', data );

      // Update cart in the localStorage.
      const updatedCart = getFormattedCart(data);
      localStorage.setItem("woo-next-cart", JSON.stringify(updatedCart));

      // Update cart data in React Context.
      setCart(updatedCart);
    },
  });

  // Update Cart Mutation.
  const [updateCart, { loading: updateCartProcessing }] = useMutation(
    UPDATE_CART,
    {
      onCompleted: () => {
        refetch();
      },
      onError: (error) => {
        if (error) {
          setRequestError(error.graphQLErrors[0].message);
        }
      },
    }
  );

  // Update Cart Mutation.
  const [clearCart, { loading: clearCartProcessing }] = useMutation(
    CLEAR_CART_MUTATION,
    {
      onCompleted: () => {
        refetch();
      },
      onError: (error) => {
        if (error) {
          setRequestError(error.graphQLErrors[0].message);
        }
      },
    }
  );

  /*
   * Handle remove product click.
   *
   * @param {Object} event event
   * @param {Integer} Product Id.
   *
   * @return {void}
   */
  const handleRemoveProductClick = (event, cartKey, products) => {
    event.stopPropagation();
    if (products.length) {
      // By passing the newQty to 0 in updateCart Mutation, it will remove the item.
      const newQty = 0;
      const updatedItems = getUpdatedItems(products, newQty, cartKey);

      updateCart({
        variables: {
          input: {
            clientMutationId: v4(),
            items: updatedItems,
          },
        },
      });
    }
  };

  // Clear the entire cart.
  const handleClearCart = (event) => {
    event.stopPropagation();

    if (clearCartProcessing) {
      return;
    }

    clearCart({
      variables: {
        input: {
          clientMutationId: v4(),
          all: true,
        },
      },
    });
  };

  return (
    <div className="content-wrap-cart">
      {cart ? (
        <div className="container woo-next-cart-wrapper">
          <h1 className="mt-5 woo-next-cart-heading">Cart</h1>
          <div className="woo-next-cart-table-row row">
            <div className="woo-next-cart-table col-md-8 mb-md-0 mb-5">
	            {cart.products.length &&
	            cart.products.map((item) => (
		            <CartItem
			            key={item.productId}
			            item={item}
			            updateCartProcessing={updateCartProcessing}
			            products={cart.products}
			            handleRemoveProductClick={handleRemoveProductClick}
			            updateCart={updateCart}
		            />
	            ))}

              {/*Clear entire cart*/}
              <div className="clear-cart">
                <button
                  className="btn btn-light "
                  onClick={(event) => handleClearCart(event)}
                  disabled={clearCartProcessing}
                >
                  <span className="woo-next-cart">Clear Cart</span>
                  <i className="fa fa-arrow-alt-right" />
                </button>
                {clearCartProcessing ? <p>Clearing...</p> : ""}
              </div>
            </div>

            {/* Display Errors if any */}
            {requestError ? (
              <div className="mt-5 row woo-next-cart-total-container">
                {" "}
                {requestError}{" "}
              </div>
            ) : (
              ""
            )}

            {/*Cart Total*/}
            <div className="woo-next-cart-total-container col-md-4">
              <h2>Cart Total</h2>
              <table className="table table-hover">
                <tbody>
                  <tr className="table-light">
                    <td className="woo-next-cart-element-total">Subtotal</td>
                    <td className="woo-next-cart-element-amt">
                      {"string" !== typeof cart.totalProductsPrice
                        ? cart.totalProductsPrice.toFixed(2)
                        : cart.totalProductsPrice}
                    </td>
                  </tr>
                  <tr className="table-light">
                    <td className="woo-next-cart-element-total">Total</td>
                    <td className="woo-next-cart-element-amt">
                      {"string" !== typeof cart.totalProductsPrice
                        ? cart.totalProductsPrice.toFixed(2)
                        : cart.totalProductsPrice}
                    </td>
                  </tr>
                </tbody>
              </table>
              <Link to="/checkout">
                <button className="btn btn-dark woo-next-large-black-btn">
                  <span className="woo-next-cart-checkout-txt">
                    Proceed to Checkout
                  </span>
                  <i className="fas fa-long-arrow-alt-right" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mt-5" style={{height: '72vh'}}>
          <h2>No items in the cart</h2>
          <Link to="/">
            <button className="btn btn-secondary woo-next-large-black-btn">
              <span className="woo-next-cart-checkout-txt">
                Add New Products
              </span>
              <i className="fas fa-long-arrow-alt-right" />
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartItemsContainer;
