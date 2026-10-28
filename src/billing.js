import { addDoc, collection, getDocs, getFirestore, onSnapshot, query, where } from 'firebase/firestore';
import { firebaseApp } from './firebaseClient';

const db = getFirestore(firebaseApp);

// Collection names and fields follow the Stripe Firebase extension's schema.
const activeOnly = where('active', '==', true);

export async function loadActiveProductsWithPrice() {
  const productSnapshot = await getDocs(query(collection(db, 'products'), activeOnly));

  const productEntries = await Promise.all(
    productSnapshot.docs.map(async (productDoc) => {
      const priceSnapshot = await getDocs(query(collection(productDoc.ref, 'prices'), activeOnly));
      const [price] = priceSnapshot.docs;
      const prices = price && { priceId: price.id, priceData: price.data() };
      return [productDoc.id, { ...productDoc.data(), prices }];
    })
  );

  return Object.fromEntries(productEntries);
}

export async function loadSubscriptions(userId) {
  const subscriptionSnapshot = await getDocs(collection(db, 'customers', userId, 'subscriptions'));

  return subscriptionSnapshot.docs.map((subscriptionDoc) => {
    const { role, current_period_end, current_period_start } = subscriptionDoc.data();
    return {
      role,
      current_period_end: current_period_end.seconds,
      current_period_start: current_period_start.seconds,
    };
  });
}

export async function startCheckoutSession(userId, priceId, { onCheckoutUrl, onError }) {
  const checkoutSessionRef = await addDoc(collection(db, 'customers', userId, 'checkout_sessions'), {
    price: priceId,
    success_url: window.location.origin,
    cancel_url: window.location.origin,
  });

  return onSnapshot(checkoutSessionRef, (snapshot) => {
    const { error, url } = snapshot.data() ?? {};
    if (error) onError(error);
    if (url) onCheckoutUrl(url);
  });
}
