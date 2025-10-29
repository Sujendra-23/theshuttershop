import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const productId = queryParams.get('productId');
  const qty = Number(queryParams.get('qty')) || 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // Add product from URL if present
  React.useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p>
          Your cart is empty. <Link to="/" className="text-blue-600 hover:underline">Go back</Link>
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-3 space-y-4">
            {cartItems.map((item) => (
              <div key={item.product} className="flex items-center border rounded p-4">
                <img
                  src={item.image || '/placeholder.png'}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded mr-4"
                />
                <div className="flex-1">
                  <Link to={`/product/${item.product}`} className="text-lg font-semibold hover:text-blue-600">
                    {item.name}
                  </Link>
                  <p className="text-gray-700">${item.price.toFixed(2)}</p>
                  <select
                    value={item.qty}
                    onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                    className="border px-2 py-1 rounded mt-2"
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => removeFromCartHandler(item.product)}
                  className="ml-4 text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="border rounded p-4 h-fit">
            <h2 className="text-xl font-bold mb-4">Subtotal</h2>
            <p className="mb-4">
              {cartItems.reduce((acc, item) => acc + item.qty, 0)} items
            </p>
            <p className="text-2xl font-semibold mb-4">${subtotal.toFixed(2)}</p>
            <button
              onClick={checkoutHandler}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
