import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Section1 from './components/section1/Section1.jsx'
import Doctor from './components/doctor/Doctor.jsx' 
import About from './components/about/About.jsx'
import Pdashboard from './pages/patient/Pdashboard.jsx'
import Ddashboard from './pages/doctor/Ddashboard.jsx'
import { AuthProvider } from './AuthContext'
import Medicines from './components/medicines/medicine.jsx'
import PatientRegistrationForm from './components/patientReg.jsx'
import Login from './pages/login/Login.jsx'
import Signup from './pages/signup/Signup.jsx'
import Chemist from './pages/chemist/Chemist.jsx'
import Admin from './pages/admin/Admin.jsx'
import NotFoundPage from './components/notfoundpage.jsx'
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Section1 />} />
          <Route path="/doctors" element={<Doctor />} />
          <Route path="/ddashboard" element={<Ddashboard />} /> 
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<PatientRegistrationForm />} />
          <Route path="/patients" element={<Pdashboard />} />
          <Route path="/medicines" element={<Medicines />} />
          <Route path = "/admin" element ={<Admin/>} />
          <Route path = "/login" element ={<Login/>} />
          <Route path = "/doctor" element = {<Ddashboard />} />
          <Route path = "/login" element = {<Login />} />
          <Route path = "/signup" element = {<Signup />} />
          <Route path = "/chemist" element = {<Chemist />} />
          <Route path="*" element={<NotFoundPage />} /> {/* 404 fallback */}

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
