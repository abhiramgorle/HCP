

import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccessRedirectTo : string;
    
}
const CheckIcon = () => (
  <svg
    className="w-16 h-16 text-green-500 mx-auto my-4"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path d="M5 13l4 4L19 7"></path>
  </svg>
);


const SpinnerIcon = () => (
  <svg
    className="animate-spin h-10 w-10 text-blue-500 mx-auto my-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

export default function LoginModal({ isOpen, onClose, onLoginSuccessRedirectTo = "/"}: LoginModalProps) {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(null);
    const { login: authLogin } = useAuth();

    useEffect(() => {
      if (isOpen) {
        // Reset form fields and states when modal becomes visible
        setEmail("");
        setPassword("");
        setIsLoading(false);
        setIsSuccess(false);
        setError(null);
        document.body.classList.add('overflow-y-hidden');
      } else {
        document.body.classList.remove('overflow-y-hidden');
      }
  
      // Cleanup function for body class
      return () => {
          document.body.classList.remove('overflow-y-hidden');
      };
    }, [isOpen]);

    useEffect(() => {
      const handleKeyDown = (e) => {
        if (e.key === 'Escape' && isOpen) {
          onClose();
        }
      };
  
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [isOpen, onClose]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
    setIsLoading(true);
    setIsSuccess(false);
    setError(null);

    try {
      const res = await fetch("http://localhost:8888/php-backend-api/api/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || `Error: ${res.status}`);
      }

      
      if (data.success) { 
        console.log("Login successful:", data);
        authLogin(data.user);
        setIsSuccess(true);
        setIsLoading(false);

        setTimeout(() => {
          onClose();
          window.location.href = onLoginSuccessRedirectTo;
        }, 2000); 
      } else {
        // Handle login failure from backend 
        throw new Error(data.message || "Login failed. Please check your credentials.");
      }
    } catch (err : any) {
      console.error("Login error:", err);
      setError(err.message || "An unexpected error occurred.");
      setIsLoading(false);
      setIsSuccess(false);
    }
  };
  
    if (!isOpen) {
      return null; 
    }
  
    
  
    return (
      <div id="login-popup" tabIndex={-1} className="bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 h-full flex items-center justify-center">
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          <div className="relative bg-white  rounded-lg shadow" >
            <button type="button" onClick={onClose} 
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center popup-close cursor-pointer">
              {/* SVG and Close text */}
              <svg aria-hidden="true" className="w-5 h-5" fill="#c6c7c7" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
              <span className="sr-only">Close popup</span>
            </button>
            
            <div className="p-5">
            {isLoading && (
              <div className="text-center py-10">
                <SpinnerIcon />
                <p className="text-lg font-medium text-slate-700">Logging in...</p>
              </div>
            )}

            {isSuccess && (
              <div className="text-center py-10">
                <CheckIcon />
                <p className="text-xl font-semibold text-green-600">Login Successful!</p>
                <p className="text-sm text-slate-600">Redirecting...</p>
              </div>
            )}

{!isLoading && !isSuccess && (
              <>
              <h3 className="text-2xl mb-0.5 font-medium"></h3>
                  <p className="mb-4 text-sm font-normal text-gray-800"></p>

                  <div className="text-center">
                      <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900">
                          Login to your account
                      </p>
                  </div>
                  {error && (
                  <div className="my-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                    {error}
                  </div>
                )}
              <form className="w-full" onSubmit={handleSubmit}>
              <input name="email" type="email" autoComplete="email" required
                        className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none focus:ring-2 placeholder-black text-gray-400 focus:ring-black focus:ring-offset-1 "
                        placeholder="Email Address"  onChange={(e) => setEmail(e.target.value)}/>
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input name="password" type="password" autoComplete="current-password" required
                        className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none focus:ring-2 placeholder-black text-gray-400 focus:ring-black focus:ring-offset-1"
                        placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <p className="mb-3 mt-2 text-sm text-gray-500">
                        <a href="/forgot-password" className="text-blue-800 hover:text-blue-600">Reset your password?</a>
                    </p>
                    <button type="submit" disabled={isLoading}
                        className="inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400">
                        Continue
                    </button>
              </form>
              <div className="mt-6 text-center text-sm text-slate-600">
                    Don't have an account?
                    <a href="/register" className="font-medium text-[#4285f4]">Sign up</a>
                </div>
                </> 
            )}
            </div>
            
          </div>
        </div>
      </div>
    );
  }
  