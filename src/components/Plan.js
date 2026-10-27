import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import db from '../firebase';
import './Plan.css';

async function loadActiveProductsWithPrice() {
  const productSnapshot = await db.collection('products').where('active', '==', true).get();

  const productEntries = await Promise.all(
    productSnapshot.docs.map(async (productDoc) => {
      const priceSnapshot = await productDoc.ref
        .collection('prices')
        .where('active', '==', true)
        .get();
      const [price] = priceSnapshot.docs;
      const prices = price && { priceId: price.id, priceData: price.data() };
      return [productDoc.id, { ...productDoc.data(), prices }];
    })
  );

  return Object.fromEntries(productEntries);
}

function Plan() {
  const user = useSelector(selectUser);

  //List available subscription data
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    db.collection('customers')
      .doc(user.uid)
      .collection('subscriptions')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (subscription) => {
          setSubscription({
            role: subscription.data().role,
            current_period_end: subscription.data().current_period_end.seconds,
            current_period_start:
              subscription.data().current_period_start.seconds,
          });
        });
      });
  }, [user.uid]);

  const [products, setProducts] = useState({});

  useEffect(() => {
    loadActiveProductsWithPrice()
      .then(setProducts)
      .catch((error) => console.warn(`Could not load subscription plans: ${error.message}`));
  }, []);

  //Start a Subscription Checkout Session with Stripe Checkout
  const loadCheckout = async (priceId) => {
    const docRef = await db
      .collection('customers')
      .doc(user.uid)
      .collection('checkout_sessions')
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

    docRef.onSnapshot(async (snap) => {
      const { error, url } = snap.data();
      if (error) {
        // Show an error to your customer and
        // inspect your Cloud Function logs in the Firebase console.
        alert(`An error occured: ${error.message}`);
      }
      if (url) {
        // We have a Stripe Checkout URL, let's redirect.
        window.location.assign(url);
      }
    });
  };

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
                !isCurrentPlan && loadCheckout(productData?.prices?.priceId)
              }>
              {isCurrentPlan ? 'Current Plan' : 'Suscribe'}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Plan;
