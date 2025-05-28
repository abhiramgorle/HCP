import './App.css'
import Header from './Components/Header';
import Courses from './Pages/Courses';
import Homepage from './Pages/Homepage'
import { Route, Routes } from "react-router-dom"
import Team from './Pages/Team';
import footer from "./assets/Footer-Background.png"
import Module1 from './Pages/Module1';
import Register from './Pages/Register';
import { AuthProvider } from './auth/AuthContext'; 
import Dashboard from './Pages/Dashboard';
import LandngPage from './Pages/LandngPage';
import Module2 from './Pages/Module2';



function App() {
  return (
    <div className="bg-white w-screen min-h-screen flex flex-col m-0">
      <AuthProvider>
      <Routes>
        <Route
        path="/"
        element={<LandngPage />}
        />
        <Route
        path="*"
        element={
          <>
          <Header />
          <div className="flex-1 w-[90%] mx-auto">
            <Routes>
            <Route path="/course" element={<Homepage />} />
            <Route path="/parts" element={<Courses />} />
            <Route path="/team" element={<Team />} />
            <Route path="/part1" element={<Module1 />} />
            <Route path="/part2" element={<Module2 />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
          <footer className="w-full mt-auto">
            <img src={footer} className="block w-full h-auto" alt="Footer" />
          </footer>
          </>
        }
        />
      </Routes>
      </AuthProvider>
    </div>
    );
}

export default App
