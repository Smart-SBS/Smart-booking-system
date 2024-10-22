/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import AppRoutes from './Routes';
import axios from 'axios';
import Error503Page from './Error503Page';
import { fetchUserData } from './redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import ErrorComponent from './components/ErrorComponent';
import AuthPopupWrapper from './components/AuthPopupWrapper';
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorComponent error={this.state.error} />;
    }

    return this.props.children;
  }
}

function App() {
  const API_URL = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState(false);
  const [serverError, setServerError] = useState(false);
  const isOpen = useSelector(state => state.authPopup.isOpen);

  const validateToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await axios.get(`${API_URL}/validate-token`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        setAuthError(false);
      }
    } catch (error) {
      console.log(error)
      setAuthError(true);
    }
  };

  useEffect(() => {
    validateToken();
    scrollTo(0, 0)
  }, [navigate]);

  useEffect(() => {
    if (authError) {
      localStorage.clear();
      window.location.reload()
    }
  }, [authError]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(`${API_URL}/ma-popular-cities`);
        if (response.status === 200) {
          setServerError(false);
        }
      } catch (error) {
        if (error.response?.status === 503) {
          console.log('HTTP 503 error: Service Unavailable');
          setServerError(true);
        } else {
          console.log('An error occurred:', error.message);
        }
      }
    };
    fetchLocations();
  }, [API_URL]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }

    // Cleanup function to reset the style when component unmounts
    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        dispatch(fetchUserData());
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  }, [API_URL, dispatch]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen overflow-hidden">
        {
          serverError ?
            <Error503Page />
            :
            <>
              <AppRoutes />
              <AuthPopupWrapper />
            </>
        }
      </div>
    </ErrorBoundary>
  );
}

export default App;