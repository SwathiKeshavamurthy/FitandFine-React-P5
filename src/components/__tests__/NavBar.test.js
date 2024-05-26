import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CurrentUserProvider, SetCurrentUserContext } from '../../contexts/CurrentUserContext';
import NavBar from '../NavBar';
import axios from 'axios';
import { axiosReq, axiosRes } from '../../api/axiosDefaults';

jest.mock('axios');
jest.mock('../../api/axiosDefaults', () => ({
  axiosReq: {
    interceptors: {
      request: {
        use: jest.fn(),
      },
    },
  },
  axiosRes: {
    interceptors: {
      response: {
        use: jest.fn(),
      },
    },
  },
}));

describe('NavBar', () => {
  const renderNavBar = async (currentUser = null) => {
    await act(async () => {
      render(
        <Router>
          <CurrentUserProvider>
            <SetCurrentUserContext.Provider value={jest.fn()}>
              <NavBar />
            </SetCurrentUserContext.Provider>
          </CurrentUserProvider>
        </Router>
      );
    });
  };

  beforeEach(async () => {
    axios.post.mockResolvedValue({});
    axios.get.mockResolvedValue({ data: null });
    axiosReq.interceptors.request.use.mockImplementation((callback) => callback);
    axiosRes.interceptors.response.use.mockImplementation(
      (response) => response,
      (err) => Promise.reject(err)
    );
  });

  test('renders the logo and brand name', async () => {
    await renderNavBar();
    expect(screen.getByAltText('Fit&Fine Logo')).toBeInTheDocument();
    expect(screen.getByText('Fit&Fine')).toBeInTheDocument();
    expect(screen.getByText('Set. Sweat. Share. Shine.')).toBeInTheDocument();
  });

  test('toggles the menu on click', async () => {
    await renderNavBar();
    const toggleButton = screen.getByLabelText('Toggle navigation');
    fireEvent.click(toggleButton);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  test('shows sign in and sign up links when not logged in', async () => {
    await renderNavBar();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.getByText('Sign up')).toBeInTheDocument();
  });

  test('shows user links when logged in', async () => {
    const currentUser = {
      username: 'testuser',
      profile_image: 'testimage.jpg',
      profile_id: 1,
    };
    await renderNavBar(currentUser);
    expect(screen.queryByText('Add Post')).not.toBeInTheDocument();
    expect(screen.queryByText('Add Daily Routine')).not.toBeInTheDocument();
    expect(screen.queryByText('My Profile')).not.toBeInTheDocument();
    expect(screen.queryByText('Sign out')).not.toBeInTheDocument();
  });
});
