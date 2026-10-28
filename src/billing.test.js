import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getDocs, onSnapshot } from 'firebase/firestore';
import { loadActiveProductsWithPrice, startCheckoutSession } from './billing';

vi.mock('./firebaseClient', () => ({ firebaseApp: {} }));
vi.mock('firebase/firestore', () => ({
  getFirestore: () => ({}),
  collection: (parent, ...path) => ({ path: [parent.path ?? 'db', ...path].join('/') }),
  query: (collectionRef) => collectionRef,
  where: () => ({}),
  getDocs: vi.fn(),
  addDoc: vi.fn(async () => ({ id: 'session-1' })),
  onSnapshot: vi.fn(),
}));

const snapshotOf = (docs) => ({ docs });

describe('loadActiveProductsWithPrice', () => {
  beforeEach(() => vi.clearAllMocks());

  it('pairs each active product with its first active price', async () => {
    getDocs.mockImplementation(async ({ path }) =>
      path === 'db/products'
        ? snapshotOf([{ id: 'prod_basic', ref: { path: 'products/prod_basic' }, data: () => ({ name: 'Basic' }) }])
        : snapshotOf([{ id: 'price_basic', data: () => ({ unit_amount: 999 }) }]),
    );

    await expect(loadActiveProductsWithPrice()).resolves.toEqual({
      prod_basic: { name: 'Basic', prices: { priceId: 'price_basic', priceData: { unit_amount: 999 } } },
    });
  });
});

describe('startCheckoutSession', () => {
  it('hands the Stripe checkout URL or the error to the caller', async () => {
    const onCheckoutUrl = vi.fn();
    const onError = vi.fn();
    await startCheckoutSession('user-1', 'price_basic', { onCheckoutUrl, onError });
    const reportSessionUpdate = onSnapshot.mock.calls[0][1];

    reportSessionUpdate({ data: () => ({}) });
    reportSessionUpdate({ data: () => ({ url: 'https://checkout.stripe.com/c/session-1' }) });
    reportSessionUpdate({ data: () => ({ error: { message: 'No such price' } }) });

    expect(onCheckoutUrl).toHaveBeenCalledWith('https://checkout.stripe.com/c/session-1');
    expect(onError).toHaveBeenCalledWith({ message: 'No such price' });
  });
});
