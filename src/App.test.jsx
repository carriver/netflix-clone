import { act, render, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import userReducer from './features/userSlice';
import App from './App';

const authMock = vi.hoisted(() => {
  let notifyAuthState = () => {};
  return {
    watchSignedInUser: (onChange) => {
      notifyAuthState = onChange;
      return () => {};
    },
    signOutUser: () => {},
    reportSignedInUser: (user) => notifyAuthState(user),
  };
});

vi.mock('./authService', () => authMock);
vi.mock('./billing', () => ({
  loadActiveProductsWithPrice: async () => ({}),
  loadSubscriptions: async () => [],
  startCheckoutSession: async () => () => {},
}));
vi.mock('./fetchTmdbResults', () => ({ fetchTmdbResults: async () => [] }));
vi.mock('swiper/react', () => ({
  Swiper: ({ children }) => <div>{children}</div>,
  SwiperSlide: ({ children }) => <div>{children}</div>,
}));
vi.mock('typewriter-effect', () => ({ default: () => null }));

const signedInUser = { uid: 'user-1', email: 'viewer@example.com' };

const renderAppAt = (path) => {
  window.history.pushState({}, '', path);
  const store = configureStore({ reducer: { user: userReducer } });
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
};

const reportAuthState = (user) => act(() => authMock.reportSignedInUser(user));

describe('App routes', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/');
  });

  it('lets visitors browse the home screen', async () => {
    renderAppAt('/');
    reportAuthState(null);

    expect(await screen.findByText('STREAMING ORIGINALS')).toBeInTheDocument();
  });

  it('sends visitors who open /profile to the sign-in page', async () => {
    renderAppAt('/profile');
    reportAuthState(null);

    expect(await screen.findByText('Browse movies and shows, demo style.')).toBeInTheDocument();
    expect(window.location.pathname).toBe('/login');
  });

  it('tells visitors on the sign-in page that this is a demo, not Netflix', async () => {
    renderAppAt('/login');
    reportAuthState(null);

    const notice = await screen.findByRole('note');
    expect(notice).toHaveTextContent('Not affiliated with Netflix');
    expect(notice).toHaveTextContent('user@example.com');
  });

  it('waits for Firebase to restore the session before guarding /profile', () => {
    renderAppAt('/profile');

    expect(window.location.pathname).toBe('/profile');
    expect(screen.queryByText('Browse movies and shows, demo style.')).not.toBeInTheDocument();
  });

  it('shows the profile to signed-in users', async () => {
    renderAppAt('/profile');
    reportAuthState(signedInUser);

    expect(await screen.findByText(signedInUser.email)).toBeInTheDocument();
  });

  it('sends signed-in users from /login to their profile', async () => {
    renderAppAt('/login');
    reportAuthState(signedInUser);

    expect(await screen.findByText(signedInUser.email)).toBeInTheDocument();
    expect(window.location.pathname).toBe('/profile');
  });
});
