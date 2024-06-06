import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CurrentUserProvider, SetCurrentUserContext } from '../../contexts/CurrentUserContext';
import NavBar from '../NavBar';
import axios from 'axios';
import { axiosReq, axiosRes } from '../../api/axiosDefaults';

jest.mock('axios');
jest.mock('../../api/axiosDefaults', () => {
  const axiosReq = {
    interceptors: {
      request: {
        use: jest.fn(),
        eject: jest.fn(),
      },
    },
  };

  const axiosRes = {
    interceptors: {
        response: {
            use: jest.fn(),
            eject: jest.fn(),
        },
    },
  };

  return { axiosReq, axiosRes };
});

describe('NavBar', () => {
  const renderNavBar = () => {
    render(
      <Router>
        <CurrentUserProvider>
          <SetCurrentUserContext.Provider value={jest.fn()}>
            <NavBar />
          </SetCurrentUserContext.Provider>
        </CurrentUserProvider>
      </Router>
    );
  };

  beforeEach(() => {
    axios.post.mockResolvedValue({});
    axios.get.mockResolvedValue({ data: null });
    axiosReq.interceptors.request.use.mockImplementation((callback) => callback);
    axiosRes.interceptors.response.use.mockImplementation(
      (response) => response,
      (err) => Promise.reject(err)
    );
  });

  test('renders the logo and brand name', () => {
    renderNavBar();
    expect(screen.getByAltText('Fit&Fine Logo')).toBeInTheDocument();
    expect(screen.getByText('Fit&Fine')).toBeInTheDocument();
    expect(screen.getByText('Set. Sweat. Share. Shine.')).toBeInTheDocument();
  });

  test('toggles the menu on click', () => {
    renderNavBar();
    const toggleButton = screen.getByLabelText('Toggle navigation');
    fireEvent.click(toggleButton);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  test('shows sign in and sign up links when not logged in', () => {
    renderNavBar();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.getByText('Sign up')).toBeInTheDocument();
  });
});
