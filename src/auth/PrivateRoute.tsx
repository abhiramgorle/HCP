// import React, {useEffect} from 'react';
// import {  useLocation, useNavigate } from 'react-router-dom';
// import { useAuth } from './AuthContext';

// interface PrivateRouteProps {
//   children: React.ReactNode;
// }

// export const PrivateRoute = ({ children }: PrivateRouteProps) => {
//   const { isAuthenticated } = useAuth();
//   console.log(isAuthenticated);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const localStoredAuth = JSON.parse(localStorage.getItem('auth') || '{}');
//   const localIsAuthenticated = localStoredAuth.isAuthenticated;
//   const restrictedToUfl = true;
//   const userEmail = localStoredAuth.email || '';

//   useEffect(() => {
//     if (!isAuthenticated && !localIsAuthenticated ) {
//       // Redirect to the login page
//       navigate('/');
//     } else if (restrictedToUfl && userEmail.endsWith('@ufl.edu')) {
//       // Redirect to a "not authorized" page if the user is not from @ufl.edu
//       navigate('/not-authorized', { state: { from: location } });
//     }
//   }, [isAuthenticated,localIsAuthenticated, userEmail, navigate, location]);

//   return <>{children}</>;
// };
