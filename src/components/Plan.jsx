import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { loadActiveProductsWithPrice, loadSubscriptions, startCheckoutSession } from '../billing';
import './Plan.css';

function Plan() {
  const user = useSelector(selectUser);

  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    loadSubscriptions(user.uid)
      .then((subscriptions) => setSubscription(subscriptions.at(-1) ?? null))
      .catch((error) => console.warn(`Could not load subscription: ${error.message}`));
  }, [user.uid]);

  const [products, setProducts] = useState({});

  useEffect(() => {
    loadActiveProductsWithPrice()
      .then(setProducts)
      .catch((error) => console.warn(`Could not load subscription plans: ${error.message}`));
  }, []);

  const startStripeCheckout = (priceId) =>
    startCheckoutSession(user.uid, priceId, {
      onCheckoutUrl: (url) => window.location.assign(url),
      // Details are in the Stripe extension's Cloud Function logs in the Firebase console.
      onError: (error) => alert(`An error occurred: ${error.message}`),
    });

  return (
    <div className='planScreen'>
      <br />

      {subscription && (
        <p>
          Renewal date:
          {new Date(
            subscription?.current_period_end * 1000
          ).toLocaleDateString()}
        </p>
      )}

      {Object.entries(products).map(([productId, productData]) => {
        const isCurrentPlan = productData.name
          ?.toLowerCase()
          .includes(subscription?.role);

        return (
          <div
            key={productId}
            className={`${
              isCurrentPlan && 'planScreen__plan--disabled'
            } planScreen__plan`}>
            <div className='planScreen__info'>
              <h5>{productData.name}</h5>
              <h6 key={productData.description}>{productData.description}</h6>
            </div>

            <button
              onClick={() =>
                !isCurrentPlan && startStripeCheckout(productData?.prices?.priceId)
              }>
              {isCurrentPlan ? 'Current Plan' : 'Subscribe'}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Plan;
