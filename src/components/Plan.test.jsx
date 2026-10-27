import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { describe, expect, it, vi } from 'vitest';
import userReducer, { login } from '../features/userSlice';
import Plan from './Plan';

const firestoreMock = vi.hoisted(() => {
  const addCheckoutSession = vi.fn(async () => ({ onSnapshot: () => {} }));
  const premiumProduct = {
    id: 'prod_premium',
    data: () => ({ name: 'Premium', description: '4K + HDR' }),
    ref: {
      collection: () => ({
        where: () => ({
          get: async () => ({ docs: [{ id: 'price_premium', data: () => ({ unit_amount: 1999 }) }] }),
        }),
      }),
    },
  };
  const customerDoc = {
    collection: (name) =>
      name === 'subscriptions'
        ? { get: async () => ({ forEach: () => {} }) }
        : { add: addCheckoutSession },
  };
  return {
    addCheckoutSession,
    db: {
      collection: (name) =>
        name === 'products'
          ? { where: () => ({ get: async () => ({ docs: [premiumProduct] }) }) }
          : { doc: () => customerDoc },
    },
  };
});

vi.mock('../firebaseClient', () => ({ db: firestoreMock.db }));

const renderPlanForSignedInUser = () => {
  const store = configureStore({ reducer: { user: userReducer } });
  store.dispatch(login({ uid: 'user-1', email: 'viewer@example.com' }));
  render(
    <Provider store={store}>
      <Plan />
    </Provider>,
  );
};

describe('Plan', () => {
  it('lists active plans once their prices have loaded', async () => {
    renderPlanForSignedInUser();

    expect(await screen.findByText('Premium')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Subscribe' })).toBeInTheDocument();
  });

  it('starts a Stripe checkout session for the plan price', async () => {
    renderPlanForSignedInUser();

    await userEvent.click(await screen.findByRole('button', { name: 'Subscribe' }));

    expect(firestoreMock.addCheckoutSession).toHaveBeenCalledWith(
      expect.objectContaining({ price: 'price_premium' }),
    );
  });
});
