import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { describe, expect, it, vi } from 'vitest';
import userReducer, { login } from '../features/userSlice';
import { startCheckoutSession } from '../billing';
import Plan from './Plan';

vi.mock('../billing', () => ({
  loadActiveProductsWithPrice: async () => ({
    prod_premium: {
      name: 'Premium',
      description: '4K + HDR',
      prices: { priceId: 'price_premium', priceData: { unit_amount: 1999 } },
    },
  }),
  loadSubscriptions: async () => [],
  startCheckoutSession: vi.fn(async () => () => {}),
}));

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
  it('lists active plans with a subscribe button', async () => {
    renderPlanForSignedInUser();

    expect(await screen.findByText('Premium')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Subscribe' })).toBeInTheDocument();
  });

  it('starts a Stripe checkout session for the plan price', async () => {
    renderPlanForSignedInUser();

    await userEvent.click(await screen.findByRole('button', { name: 'Subscribe' }));

    expect(startCheckoutSession).toHaveBeenCalledWith('user-1', 'price_premium', expect.any(Object));
  });
});
