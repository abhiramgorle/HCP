import React, { createContext, useState, useContext, useEffect, ReactNode} from 'react';

// Define the shape of your user data
interface User {
  email: string;
  name: string;
  relationToPatient?: string; 
  location?: string;
  // Add any other fields 
}

interface AuthContextType {
  user: User | null;
  login: (userData: User, token?: string) => void; // token is optional, for JWT etc.
  logout: () => void;
  isLoading: boolean; // To check if loading user from storage
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Start with loading true

  useEffect(() => {
    // Try to load user from localStorage on initial app load
    try {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('currentUser'); // Clear corrupted data
    }
    setIsLoading(false); // Done loading
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
    // If you implement token-based auth, store the token securely (e.g., localStorage or HttpOnly cookie managed by backend)
    // localStorage.setItem('authToken', token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    // localStorage.removeItem('authToken');
    // You might want to redirect to login page or home page here
    // window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// interface AuthContextInterface {
//   isAuthenticated: boolean;
//   login: (kidCode: string, formCode: string) => Promise<boolean>;
//   logout: () => void;
//   sessionData: any;
// }

// export const AuthContext = createContext<AuthContextInterface>({
//   isAuthenticated: false,
//   login: async () => false,
//   logout: () => { },
//   sessionData: null,
// });

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [sessionData, setSessionData] = useState({});


//   useEffect(() => {
//     // Load state from local storage on component mount
//     const storedAuth = JSON.parse(localStorage.getItem('auth') || '{}');
//     setIsAuthenticated(storedAuth.isAuthenticated);
//     setSessionData(storedAuth.sessionData);
//   }, []);

//   useEffect(() => {
//     // Update local storage whenever auth state changes
//     localStorage.setItem('auth', JSON.stringify({ isAuthenticated, sessionData }));
//   }, [isAuthenticated, sessionData]);

//   const login = async (kidCode: string, formCode: string) => {
//     const response = await fetch(`https://wordchomp.org/api/wc_kidlogin.php?zandon=1&kidcode=${kidCode}&formcode=${formCode}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (response.ok) {
//       const loginResponse = await response.json();
//       console.log('Login response:', loginResponse);
//       if (Object.keys(loginResponse).length > 0) {
//         setIsAuthenticated(true);
//         setSessionData(loginResponse);
//         return true;
//       }
//     } else {
//       setIsAuthenticated(false);
//       setSessionData({});
//       return false;
//     }
//     return false;
//   };

//   const logout = () => {
//     setIsAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout, sessionData }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }